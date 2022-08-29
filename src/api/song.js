import request from './api'

export const fetchUserSong = () => {
  return request('get', '/api/v1/users/songs')
}
export const deleteSong = (songId) => {
  return request('delete', `/api/v1/songs/${songId}`)
}
export const getSongById = (songId) => {
  return request('get', `/api/v1/songs/${songId}`)
}
export const createSong = (formData) => {
  return request('post', `/api/v1/songs/`, formData, 'multipart/form-data;')
}
export const patchSongById = (songId, formData) => {
  return request('patch', `/api/v1/songs/${songId}`, formData, 'multipart/form-data;')
}
export const getBrowseSongs = (categoryId, orderStr) => {
  return request('get', `/api/v1/songs/category/${categoryId}/order/${orderStr}`)
}
