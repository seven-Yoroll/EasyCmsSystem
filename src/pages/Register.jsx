import React from 'react'
import './less/login.less'
import login from '../assets/login.png'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RegisterApi } from '../request/api'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    RegisterApi(
      {
        username: values.username,
        password: values.password
      }
    ).then(res => {
      if (res.errCode === 0) {
        message.success(res.message);
        // 跳转到登录页
        setTimeout(() =>{
          navigate('/login')
        },1500)
      }
      else if (res.errCode === 1) {
        message.error(res.message)
      }
    })
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img src={login} alt="" />
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
          </Form.Item>

          <Form.Item>
            <Link to='/login'> 已经注册,前往登录</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
