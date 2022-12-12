import axios from "axios";
//创建一个单列
const requests = axios.create(
    //配置项
    {
        baseURL: '/api',
        timeout: 5000
    }
)
//添加请求拦截器
requests.interceptors.request.use(config => {
    let token = localStorage.getItem("cms-token")
    if(token){
        config.headers ={
            "cms-token":token
        }
    }
    return config;
}, function (error) {
    //对请求错误做些什么
    return Promise.reject(error);
});

//添加响应拦截器
requests.interceptors.response.use(response => {
    //对响应的数据做点什么
    return response.data;
}, function (error) {
    //对响应错误做点什么
    return Promise.reject(error)
})

export default requests