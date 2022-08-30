import request from './api'

export const getUserInform = (account) => {
  return request('get', `/api/v1/users/userInform/${account}`)
}
export const checkTokenValid = () => {
  return request('get', '/api/v1/users/tokenData')
}
