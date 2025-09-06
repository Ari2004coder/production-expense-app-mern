import React, { useEffect, useState } from 'react';
import Analytiics from '../components/analyticsForHome/Analytiics'
import Layout from '../components/layout/Layout';
import { Form, Modal, Input, Select, Button, message, Flex, Spin, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import Card from '../components/analyticsForHome/Card';
import AnalyticsForReport from '../components/AnalyticsForReport/AnalyticsForReport';
const { RangePicker } = DatePicker

const Report = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const categoryData = {
    Income: ['Salary', 'Buisness Income', 'Tips', 'Gifts', 'other'],
    Expense: ['Food', 'Entertainment', 'Bills', 'Transportation', 'Shopping', 'Financial', 'Other'],
  };
  const { Option } = Select;
  const [form] = Form.useForm();
  const [type, setType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [frequency, setFrequency] = useState('30');;
  const [selectedDate, setSelectedDate] = useState([]);
  const [typeofTrans, setTypeofTrans] = useState('all');
  const [transcationDetalsForcard, setTranscationDetalsForcard] = useState([])
  // form handaling
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setloading(true);
      await axios.post('/api/v1/transactions/add-transaction', { ...values, userid: user._id });
      getallTransction();
      getDetalisforCard();
      setloading(false);

      setShowModal(false);
      messageApi.success('Transaction Added Successfully');
    } catch (error) {
      setloading(false);
      messageApi.error('Failed to add transaction.');
    }
  };

  // get all transaction
  const getallTransction = async () => {
    try {
      setloading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/api/v1/transactions/get-transaction', { userid: user._id, frequency, selectedDate, typeofTrans });
      console.log(res.data);
      setTransactionDetails(res.data);
      setloading(false);
    } catch (error) {
      message.error('face some issues');
    }
  };
  useEffect(() => {
    getallTransction();
  }, [frequency, selectedDate, typeofTrans]);
  //get details for card
  const getDetalisforCard = async () => {
    try {

      setloading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/api/v1/transactions/get-transactionmonth', { userid: user._id, date: new Date().getMonth() });
      console.log(new Date().getMonth());

      console.log(res.data);
      setTranscationDetalsForcard(res.data);
      setloading(false);
    } catch (error) {
      message.error('face some issues');
    }
  }
  useEffect(() => {
    getDetalisforCard();
  }, [])



  const handleCustompicker = (values) => {
    if (values === null) {

      setFrequency('7')

    } else {
      setSelectedDate(values)
    }
  }

  const handleTypeChange = (value) => {
    setType(value);
    // CRITICAL: Reset the 'category' field when the type changes.
    // This prevents submitting an invalid category (e.g., 'Salary' for an 'Expense' type).
    form.setFieldsValue({
      category: undefined,
    });
  };


  //handle delete
  const handleDeleteTrans = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/transactions/delete/${id}`);
      message.success("Transaction Deleted successfully")
      getallTransction();
      getDetalisforCard()
    } catch (error) {
      message.error('Item not deleted due to some internal issue')
      console.log(error);

    }
  }



  return (
    <>
      {contextHolder}
      <Layout>
        {loading && (
          <div className='h-screen w-full flex justify-center items-center'>


            <Spin size="large" />

          </div>
        )}

        <div className="filter flex flex-col md:flex-row items-center justify-between shadow-xl px-3 py-5 m-2 rounded-2xl border-t-1 border-gray-400 border-x-1 gap-4">
          <div className="rangefilter flex gap-3">
            <div className='flex gap-2 flex-wrap'>
              <h6 className='font-semibold'>Select Frequency</h6>
              <Select value={frequency} onChange={(values) => setFrequency(values)}>
                <Option value='7'>Last 1 Weeks</Option>
                <Option value='30'>Last 1 Months</Option>
                <Option value='365' >Last 1 Year</Option>
                <Option value='custom'>Custom</Option>

              </Select>
              {frequency == 'custom' && <RangePicker value={selectedDate} className='border-gray-700' onChange={handleCustompicker} />}
            </div>

          </div>
          <div>
            <button onClick={() => setShowModal(true)} className="bg-blue-600 px-2 py-3 text-white font-semibold rounded-sm hover:bg-blue-700 cursor-pointer">
              +Add Expense
            </button>
          </div>
        </div>
        <div className='analytics w-full flex justify-around p-4 gap-4 mb-10 mt-5 flex-wrap md:flex-nowrap'>
          <Card title="Total Income" value={transactionDetails} />
          <Card title="Total Expense" value={transactionDetails} />
          <Card title="Net Amount" value={transactionDetails} />
        </div>
        <div className="content">
          <Modal title="Add Transaction" open={showModal} onCancel={() => setShowModal(false)} footer={false}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Amount" name="amount">
                <Input type="Text" />
              </Form.Item>
              <Form.Item name="type" label="Type">
                <Select placeholder="Select a type" onChange={handleTypeChange}>
                  <Option value="Income">Income</Option>
                  <Option value="Expense">Expense</Option>
                </Select>
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select
                  placeholder="Select a category"
                  // The category dropdown is disabled until a type is selected
                  disabled={!type}
                >
                  {/* Dynamically render options based on the selected type.
              We use `categoryData[type]` to get the correct array of options.
              The `|| []` is a fallback to prevent errors if `type` is not yet set.
            */}
                  {(categoryData[type] || []).map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Date" name="date">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="Refrence" name="refrence">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input type="text" />
              </Form.Item>
              <div>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Modal>

          <div>
            <AnalyticsForReport value={transactionDetails} />

          </div>
        </div>
      </Layout>
    </>
  );
};

export default Report;