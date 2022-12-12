import React, { useState } from 'react'
import { Button, Form, Input, message, Upload } from 'antd';
import { UpdateInfoApi, UserInfoApi } from '../request/api'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { useEffect } from 'react';
import './less/means.less'

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // 这里上传到的图片因为其后端设置的是少于200KB
  const isLt2M = file.size / 1024 / 1024 / 1024 < 200;
  if (!isLt2M) {
    message.error('Image must smaller than 200KB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function Means() {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // 表单提交事件
  const onFinish = (values) => {
    console.log(sessionStorage.username);
    console.log(values.username);
    // 这里的逻辑是没错的但是问题在于其返回的数据 可能是用户过多。
    if (values.username !== sessionStorage.getItem('username') && values.username && values.password.trim() !== '') {
      UpdateInfoApi({
        username: values.username,
        password: values.password
      }).then(res => {
        console.log(res);
        if (res.errCode === 0) {
          message.success(res.message)
        }
        else {
          message.error(res.message)
        }
      })
    }
  };

  // 组件挂载完毕后请求用户的数据。
  useEffect(() => {
    UserInfoApi().then(res => {
      sessionStorage.setItem('username', res.data.username)
    })
  }, [])

   

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        // 上传成功之后。
        localStorage.setItem('avatar', info.file.response.data.filePath)
        // 当图片上传后实现其完全加载
        // 第一种方法
        window.location.reload()
        // 第二种直接在Header中实施监听
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="Means">
      <Form
        className='Means_form'
        onFinish={onFinish}
        autoComplete="off"
        name="basic"
      >
        <Form.Item
          label="修改用户名"
          name="username"
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ float: 'right' }} >
            提交
          </Button>
        </Form.Item>
      </Form>
      <div style={{ height: "50px" }}>点击下方修改头像</div>
      <Upload
        // 这里不需要再进行使用和后端进行接口的引用因为这里属性name后面是avata
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api//upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{
          "cms-token": localStorage.getItem('cms-token')
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
