import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, message } from 'antd';
import { LeftCircleTwoTone } from '@ant-design/icons';
import moment from 'moment';
import './less/edit_box.less'
import E from 'wangeditor'
import { AddArticleApi, ArticleSearchApi, UpdateArticleApi } from '../request/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// editor的使用
let editor = null
export default function Edit() {

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [form] = Form.useForm()
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(params.id);
  console.log(location.pathname);

  // 对话框点击了提交
  const handleOk = () => {
    form
      .validateFields()  //validate校验    Fields字段
      .then((values) => {
        form.resetFields(); //reset重置
        console.log('Received values of form: ', values);
        setIsModalOpen(false);
        let { title, subTitle } = values
        // 判断是否从列表页跳转过来的
        if (params.id) {
          // 更新文章信息 
          UpdateArticleApi({ title, subTitle, content, id: params.id }).then(res => {
            if (res.errCode === 0) {
              message.success('提交成功')
              setTimeout(() => {
                navigate('/listlist')
              }, 500)
            } else {
              message.error('登录超时，请退出后尝试')
            }
          })
        }
        else {
          // 不是进行更新文章则是判断其路径后面是否有id即可 然后进行添加文章的操作 
          AddArticleApi({ title, subTitle, content }).then(res => {
            if (res.errCode === 0) {
              message.success('提交成功')
              setTimeout(() => {
                navigate('/listlist')
              }, 500)
            } else {
              message.error('登录超时，请重新登录')
            }
          })
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleOnBack = () => {
    window.history.back()
  }

  useEffect(() => {
    editor = new E('#div1')
    editor.config.onchange = (newHtml) => {
      setContent(newHtml)
    }
    editor.create()
    // 获取相应的id编辑的内容信息
    // 判断id是否存在然后进行编辑
    if (params.id) {
      ArticleSearchApi({
        id: params.id
      }).then(res => {
        console.log(res);
        if (res.errCode === 0) {
          editor.txt.html(res.data.content)
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }
    return () => {
      // 模拟componentwillUnmount中
      editor.destroy()
    }
  }, [])


  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className='edit_box'>
        {params.id === undefined ? <span></span> : <LeftCircleTwoTone onClick={handleOnBack} style={{ width: "25px", heigh: '25px' }} display='inlineblock' />}
        <h2 style={{ display: 'inline-block', padding: '10px' }}>文章编辑</h2>
        <h4 style={{ display: 'inline-block' }}>{moment(new Date()).format('YYYY-MM-DD hh:ss:mm')}</h4>
        <Button onClick={() => setIsModalOpen(true)} type='primary' style={{ display: 'inline-block', float: 'right', top: '10px' }}>提交文章</Button>
      </div>
      <div id="div1" style={{ padding: '0 20px 20px', background: '#fff' }}></div>
      <Modal zIndex={99999} title="填写文章标题" okText="提交" cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
          form={form}
          initialValues={{ title, subTitle }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题!',
              },
            ]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item
            label="副标题"
            name="subTitle"

          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}
