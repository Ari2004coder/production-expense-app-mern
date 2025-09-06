import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsForExpense = ({value}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const monthWiseCalculation = () => {
            const monthlyData = [];
            for (let i = 0; i < 12; i++) {
                const monthlyAmount = value
                    .filter(item => moment(item.date).month() === i)
                    .reduce((acc, item) => acc + item.amount, 0);
                
                monthlyData.push({
                    name: moment().month(i).format('MMM'),
                    Expense: monthlyAmount,
                });
            }
            setData(monthlyData);
        };

        monthWiseCalculation();
    }, [value]);

   
  return (
    <>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
       
        <Bar dataKey="Expense" fill="red" activeBar={<Rectangle fill="#DC2626" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
    </>
  )
}

export default AnalyticsForExpense