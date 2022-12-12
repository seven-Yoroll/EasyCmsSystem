import React from 'react'
import './less/login.less'
import login from '../assets/login.png'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../request/api'
export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password,
    }).then(res => {
      if (res.errCode === 0) {
        message.success("登录成功")
        // 存储数据
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('avatar', res.data.avatar)
        // 实现跳转
        setTimeout(() => {
          navigate('/')
        }, 1500)
      }
      else if (res.errCode === 1) {
        message.error("用户名或密码错误")
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
          <Form.Item>
            <Link to='/register'> 还没注册?点击注册</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size='large'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
