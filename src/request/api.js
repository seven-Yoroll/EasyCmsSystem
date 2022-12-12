import requests from './request'

// 注册
export const RegisterApi = (params) => requests.post('/register', params)

// 登录
export const LoginApi = (params) => requests.post('/login', params)


// 文章列表数据
// 注意传回的数据的样式需要进行解构
export const ArticleApi = (params) => requests.get('/article', {params})


// 添加文章
export const AddArticleApi = (params) => requests.post('/article/add', params)


// 编辑文章
export const ArticleSearchApi = (params) => requests.get(`/article/${params.id}`)


// 更新文章
export const UpdateArticleApi = (params) => requests.put('/article/update', params)

// 删除文章
export const RemoveArticleApi = (params) => requests.post('article/remove', params)


// 修改用户资料
export const UpdateInfoApi = (params) => requests.put('/info', params)


// 获取用户信息 
export  const  UserInfoApi = () => requests.get('/info',)