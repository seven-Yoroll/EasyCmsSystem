import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, message } from 'antd';
import { PieChartOutlined, EditFilled, ContainerOutlined } from '@ant-design/icons';
export default function Aside() {
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    useEffect(() => {
        let path = location.pathname
        let key = path.split('/')[1]
        setDefaultSelectedKeys(key)
    }, [location.pathname])

    const items = [
        getItem('查看文章列表list', 'listlist', <PieChartOutlined />),
        getItem('查看文章列表table', 'listtable', <PieChartOutlined />),
        getItem('文章编辑', 'edit', <EditFilled />),
        getItem('修改资料', 'means', <ContainerOutlined />),
    ];

    const onClick = (e) => {
        console.log(e);
        navigate(e.key)
        setDefaultSelectedKeys(e.key)
    };

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            selectedKeys={[defaultSelectedKeys]}
            mode="inline"
            items={items}
            theme='dark'
            className='aside'
        />
    )
}
