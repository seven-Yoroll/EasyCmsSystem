import React, { useEffect, useState } from 'react'
import { Button, List, message, Pagination, Skeleton } from 'antd';
import { ArticleApi, RemoveArticleApi } from '../request/api'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function Listlist() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [datedelete, setDatedelete] = useState(0)
  const navigate = useNavigate()

  const getArticleApi = (num) => {
    ArticleApi({
      // num这里请求的是点击之后的页数的数据.
      num,
      // 这里的条数是自己设定的.条数
      count: pagesize
    }).then(res => {
      console.log(res.data);
      let { arr, total, num, count } = res.data
      setList(arr)
      setCurrent(num)
      setPagesize(count)
      setTotal(total)
    })
  }


  useEffect(() => {
    getArticleApi(current)
  }, [datedelete])


  // 删除当前选择的文章
  const handleRemove = (id) => {
    RemoveArticleApi({
      id
    }).then(res => {
      if (res.errCode === 0) {
        message.success('删除成功')
        //  第1种 重新请求一边即可  第2种定义一个新数据进行状态的检测模拟componentUpdataMount
          setDatedelete( datedelete + 1)
      }
    })
  }

  // 分页请求得到的文章列表
  const handleOnChange = (pages) => {
    getArticleApi(pages)
  }
  return (
    <div className='list_table'>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<Button type='primary' onClick={() => navigate('/edit/' + item.id)}>编辑</Button>
              , <Button danger type='primary' onClick={() => handleRemove(item.id)}>删除</Button>]}
          >
            <Skeleton loading={false}>
              <List.Item.Meta
                title={<a>{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format('YY-MM-DD hh:mm:ss')}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination style={{ float: "right", padding: "20px" }} onChange={handleOnChange} total={total} />
    </div>
  )
}
