import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const AnalyticsForReport = ({ value }) => {
  const [dataforcat, setDataforcat] = useState([]);
  const [totalincome, setTotalincome] = useState(0);
  const [totalexpense, setTotalexpense] = useState(0);
  const [catwiseData, setcatWiseData] = useState([]);
  const [incomeCatwiseData, setIncomeCatwiseData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [trendType, setTrendType] = useState('daily'); // daily, weekly, monthly

  const COLORS1 = ['#00C49F', '#FF8042'];
  const COLORS2 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#546E7A'];

  useEffect(() => {
    const calculationForcatData = () => {
      const totalamount = value.reduce((acc, item) => acc + item.amount, 0);
      const income = value.filter(item => item.type === 'Income').reduce((acc, item) => acc + item.amount, 0);
      const expense = value.filter(item => item.type === 'Expense').reduce((acc, item) => acc + item.amount, 0);
      setTotalincome(income);
      setTotalexpense(expense);

      if (totalamount > 0) {
        const obj = [
          {
            type: "Income",
            value: Math.round((income / totalamount) * 100),
          },
          {
            type: "Expense",
            value: Math.round(((expense / totalamount)) * 100),
          }
        ];
        setDataforcat(obj);
      }

      if (expense > 0) {
        const expenseData = value.filter(item => item.type === 'Expense');
        const dataCatwise = expenseData.reduce((acc, item) => {
          const category = item.category;
          if (!acc[category]) {
            acc[category] = { name: category, value: 0 };
          }
          acc[category].value += item.amount;
          return acc;
        }, {});
        const catArray = Object.values(dataCatwise).map(item => ({
          ...item,
          value: Math.round((item.value / expense) * 100)
        }));
        setcatWiseData(catArray);
      }

      const incomeData = value.filter(item => item.type === 'Income');
      const dataIncomeCatwise = incomeData.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = { name: category, value: 0 };
        }
        acc[category].value += item.amount;
        return acc;
      }, {});
      const incomeCatArray = Object.values(dataIncomeCatwise);
      setIncomeCatwiseData(incomeCatArray);

      // Trend data calculation
      let trendData = {};
      if (trendType === 'daily') {
        trendData = value.reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = { date, income: 0, expense: 0 };
          }
          acc[date][item.type.toLowerCase()] += item.amount;
          return acc;
        }, {});
      } else if (trendType === 'weekly') {
        trendData = value.reduce((acc, item) => {
          const date = new Date(item.date);
          const year = date.getFullYear();
          const week = Math.ceil((((date - new Date(year, 0, 1)) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
          const weekLabel = `Week ${week}, ${year}`;
          if (!acc[weekLabel]) {
            acc[weekLabel] = { date: weekLabel, income: 0, expense: 0 };
          }
          acc[weekLabel][item.type.toLowerCase()] += item.amount;
          return acc;
        }, {});
      } else if (trendType === 'monthly') {
        trendData = value.reduce((acc, item) => {
          const date = new Date(item.date);
          const monthLabel = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
          if (!acc[monthLabel]) {
            acc[monthLabel] = { date: monthLabel, income: 0, expense: 0 };
          }
          acc[monthLabel][item.type.toLowerCase()] += item.amount;
          return acc;
        }, {});
      }

      setLineChartData(Object.values(trendData));
    };

    calculationForcatData();
  }, [value, trendType]);

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-gray-100'>
        <div className='w-full bg-white rounded-xl shadow-lg p-6 h-96 transform hover:scale-105 transition-all duration-300 ease-in-out'>
          <h2 className='text-center font-bold text-3xl mb-4'>Income vs Expense</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={dataforcat} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={80} innerRadius={50} fill="#8884d8">
                {dataforcat.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType='circle' iconSize={10} layout='horizontal' verticalAlign='bottom' align='center' />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='w-full bg-white rounded-xl shadow-lg p-6 h-96 transform hover:scale-105 transition-all duration-300 ease-in-out'>
          <h2 className='text-center font-bold text-3xl mb-4'>Catagory Wise Expense (in %)</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={catwiseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {catwiseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType='circle' iconSize={10} layout='horizontal' verticalAlign='bottom' align='center' />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='w-full bg-white rounded-xl shadow-lg p-6 h-96 transform hover:scale-105 transition-all duration-300 ease-in-out'>
          <h2 className='text-center font-bold text-3xl mb-4'>Category Wise Income</h2>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={incomeCatwiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='w-full lg:col-span-2 bg-white rounded-xl shadow-lg p-6 h-auto transform hover:scale-105 transition-all duration-300 ease-in-out'>
          <h2 className='text-center font-bold text-3xl mb-4'>Income & Expense Trend</h2>
          <div className="flex justify-center mb-4">
            <button onClick={() => setTrendType('daily')} className={`px-4 py-2 rounded-l-lg ${trendType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Daily</button>
            <button onClick={() => setTrendType('weekly')} className={`px-4 py-2 ${trendType === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Weekly</button>
            <button onClick={() => setTrendType('monthly')} className={`px-4 py-2 rounded-r-lg ${trendType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Monthly</button>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" />
              <Line type="monotone" dataKey="expense" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default AnalyticsForReport