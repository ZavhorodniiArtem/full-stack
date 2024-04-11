'use client';

import { Button, Form, Input } from 'antd';

export interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const onFinish = (values: LoginValues) => {
    console.log('values', values);
  };

  return (
    <>
      <h3 style={{ margin: '24px 0' }}>Login</h3>

      <Form
        name='login'
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        style={{ width: '400px' }}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, type: 'email' },
            { required: true, message: 'Please input your email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
