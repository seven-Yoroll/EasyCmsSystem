import React, { useEffect, useState } from 'react'
import { Space, Table, Button } from 'antd';
import { ArticleApi } from '../request/api'
import '../pages/less/listtable.less'
import moment from 'moment/moment';

function Mytitle(props) {
  return (
    <div>
      <h4 ><a className='biaoti' href={"http://codesohigh.com:8765/article" + props.id}>{props.title}</a></h4>
      <h5 className='fubiaoti'>{props.subtitle}</h5>
    </div>
  )
}

export default function ListTable() {
  //文章数组列表 
  const [arr, setArr] = useState(
    [
      {
        key: '1',
        title: 'John Brown',
        data: 'New York No. 1 Lake Park',
      }
    ]
  )

  const [pagination, setPagination] = useState({
    current: 1,
    pagesize: 10,
    total: 0
  })

  const getArticleApi = (current, pagesize) => {
    ArticleApi({
        num:current,
        count:pagesize
    }).then(res => {
      // 看其响应的结果   console.log(res);
      console.log(res);
      if (res.errCode === 0) {
        // 响应数据里面的arr数据  console.log(res.data.arr);
        let { num, count, total } = res.data;
        setPagination({
          current: num,
          pagesize: count,
          total
        })
        // 深拷贝获取到的数组
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let Arr = []
        newArr.map(item => {
          let obj = {
            key: item.id,
            data: moment(item.data).format('YYYY-MM-DD hh:mm:ss'),
            mytitle: <Mytitle title={item.title} subtitle={item.subTitle} id={item.id} />
          }
          Arr.push(obj)
        })
        newArr = Arr
        // console.log(newArr);
        setArr(newArr);
      }
    })
  }
  // 模式的是componentDidMount 如何后面是个空数组不对任何实施监听的话
  useEffect(() => {
    getArticleApi(pagination.current, pagination.pagesize)
  }, [])

  const columns = [
    {
      dataIndex: 'mytitle',
      key: 'mytitle',
      width: "60%",
      render: (text) =>
      (
        <div>
          {text}
        </div>
      )
    },
    {
      dataIndex: 'data',
      key: 'data',
      align: 'right',
      render: (text) =>
      (
        <>
          <span>{text}</span>
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: "right",
      render: (text, record) => {

        return (
          <Space size="middle">
            {/* text.key就是id */}
            <Button type='primary' onClick={() => console.log(text.key)} >编辑</Button>
            <Button danger type='primary' onClick={() => console.log(text.key)} >删除</Button>
          </Space>
        )
      },
    },
  ];

  const handleTableChange = (arg) => {
    getArticleApi(arg.current, arg.pagesize)
  }

  return (
    <div className='list_table'>
      <Table
        showHeader={false}
        columns={columns}
        dataSource={arr}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </div>
  )
}
