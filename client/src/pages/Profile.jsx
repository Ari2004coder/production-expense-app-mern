import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import axios from 'axios';
import Layout from '../components/layout/Layout';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      form.setFieldsValue({ name: storedUser.name, email: storedUser.email });
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Corrected API endpoint URL
      const res = await axios.post('/api/v1/user/update-user', { userId: user._id, name: values.name });
      if (res.data.success) {
        message.success(res.data.message);
        // Update local storage with new user data
        const updatedUser = { ...user, name: values.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        message.error(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className='w-full flex justify-center items-center'>
            <Spin size="large" />
          </div>
        )}
        <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ name: user?.name, email: user?.email }}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled /> {/* Email is disabled as per requirement */}
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Update Profile
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
