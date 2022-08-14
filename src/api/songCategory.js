import request from './api'

export const getAllSongCategories = () => {
  return request('get', '/api/v1/songCategory')
}
