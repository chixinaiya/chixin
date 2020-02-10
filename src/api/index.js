import axios from 'axios'
import auth from '@/utils/auth'

//对axios进行配置
axios.defaults.baseURL='http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
export default axios