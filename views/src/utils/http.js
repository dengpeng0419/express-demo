import axios from "axios/index";
import data from "./data";

axios.defaults.timeout = 30000;
axios.defaults.baseURL = 'http://localhost:3000';

//http request拦截器
// axios.interceptors.request.use(
//     config => {
//         config.data = JSON.stringify(config.data);
//         config.headers = {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

//http response拦截器
axios.interceptors.response.use(
    response => {
        // if(response.data.errCode === -1){
        //
        // }
        return response
    },
    error => {
        return Promise.reject(error.response)
    }
)

//get请求
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

//post请求
export function post(options) {
    if(!options.error) {
        options.error = () => {};
    }
    
    axios({
        url: options.url,
        method: 'post',
        data: options.data,
        //如果请求中要用到 token 则在 header中
        headers: {
            //token 存储方式因人而异
            'x-access-token': sessionStorage.getItem('tk'),
        },
            // transformRequest:[function (fData, headers) {
        //     headers['Content-Type']='application/json'
        //     return JSON.stringify(fData)
        // }],
    }).then(res => {
        let body = res.data
        console.log(body);
        //这里可以做一层粗粒度的拦截（仅做参考）
        if(res.status==200 && body){
            if(body.resultCode === -5) {
                this.$router.push({
                    name: 'Login'
                })
                return;
            }
    
            options.success(body);
            // if(body.code==500){
            //     this.$message({message:body.msg + '，请联系管理员！',type:'warning'})
            // }
        }
    }).catch(err => {
        options.error(err)
    })
}
