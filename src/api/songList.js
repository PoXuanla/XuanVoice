import request from './api'

export const createSongList = (data) => {
  return request('post', '/api/v1/songList', data)
}
export const getUserSongLists = () => {
  return request('get', '/api/v1/songList/userSongList')
}
