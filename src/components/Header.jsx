/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.png'
import { Button, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import defaultavatar from '../assets/defaultavatar.png'
export default function Header() {

    const navigate = useNavigate()
    const [defaultav, setDefaultav] = useState(defaultavatar)
    const [defaultusername, setUsername] = useState('游客')
    // 模拟的是componentDidMout
    useEffect(() => {
        let username = localStorage.getItem('username')
        let avatar = localStorage.getItem('avatar')
        if (username) {
            setUsername(username)
        }
        if (avatar) {
            setDefaultav("http://47.93.114.103:6688/" + avatar)
        }
    }, [localStorage.getItem('avatar')])

    // 退出登录
    const Logout = () => {
        localStorage.clear()  //主要是清除localStorage中的token
        message.success('退出成功，正返回登录页面')
        setTimeout(() => {
            navigate('/login')
        }, 2000)
    }

    // 跳转到修改资料页面
    const  ToMeans = () => {
            message.success('正在跳转')
            setTimeout(()=>{
                navigate('/means')
            },800)
    }
    const items = [
        {
            label: <Button onClick={ToMeans} type='link'>修改资料</Button>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <Button onClick={Logout} type='link'>退出登录</Button>,
            key: '1',
        },
    ];

    return (
        <header>
            <img src={login} alt="" className='logo' />
            <div className="right">
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                        <Space>
                            <img src={defaultav} alt="" className='avatar' />
                            <span>{defaultusername}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
