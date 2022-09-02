// api.js
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// baseURL是你API的主要Domain，之後發請求時只要填相對路徑就可以了
const getInstance = (contentType) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,
    headers: { 'Content-Type': contentType }
  })
  requestInterceptors(instance)
  responseInterceptors(instance)
  return instance
}

// 此處的instance為我們create的實體
const requestInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })
}
const responseInterceptors = (instance) => {
  instance.interceptors.response.use(
    function (response) {
      console.log(response.data)
      return response.data
      const data = response.data
      console.log(data)
      // Do something with response data
      if (data.message) {
        console.log(data.message)
      }
    },
    function (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.log(`axios interceptor ${error.response.data.message}`)
            // const navigate = useNavigate()
            // navigate('/login')
            // go to login page and show alert
            break
          case 500:
            console.log('程式發生問題')
            // go to 500 page
            break
          default:
            console.log(error.message)
        }
      }
      if (!window.navigator.onLine) {
        alert('網路出了點問題，請重新連線後重整網頁')
        return
      }
      return Promise.reject(error)
    }
  )
}

export default function (method, url, data = null, contentType = 'application/json') {
  method = method.toLowerCase()
  const instance = getInstance(contentType)
  switch (method) {
    case 'post':
      return instance.post(url, data)
    case 'get':
      return instance.get(url)
    case 'delete':
      return instance.delete(url)
    case 'put':
      return instance.put(url, data)
    case 'patch':
      return instance.patch(url, data)
    default:
      console.log(`未知的 method: ${method}`)
      return false
  }
}
