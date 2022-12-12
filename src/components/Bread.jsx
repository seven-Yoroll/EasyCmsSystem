import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Breadcrumb, message } from 'antd';
export default function Bread() {
    const [breadname, setBreadname] = useState('')
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect(() => {
        switch (pathname) {
            case '/listlist':
                setBreadname('查看文章列表list')
                break;
            case '/listtable':
                setBreadname('查看文章列表table')
                break;
            case '/edit':
                setBreadname('文章编辑')
                break;
            case '/means':
                setBreadname('修改资料')
                break;
            default:
               setBreadname(pathname.includes('edit') ? ('文章编辑') : null)
                break;
        }
    }, [pathname])


    const Toapp = () => {
        message.success('跳转首页')
        setTimeout(() => {
            navigate('/')
        }, 500)
    }

    return (

        <Breadcrumb style={{height:"30px",lineheight:"30px"}}>
            <Breadcrumb.Item onClick={Toapp}>
                <span>首页</span>
            </Breadcrumb.Item>
            {pathname === '/App' ? <Breadcrumb.Item >
                <span></span>
            </Breadcrumb.Item>
                : <Breadcrumb.Item >                                                    
                    <span>{breadname}</span>
                </Breadcrumb.Item>
            }
        </Breadcrumb>

    )
}
