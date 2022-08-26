import request from './api'

export const createSongList = (data) => {
  return request('post', '/api/v1/songList', data)
}
export const getUserSongLists = () => {
  return request('get', '/api/v1/songList/userSongList')
}
export const deleteSongListBySongId = (songId) => {
  return request('delete', `/api/v1/songList/${songId}`)
}
export const getListsAndCheckSongExistList = (songId) => {
  return request('get', `/api/v1/songList/userSongList/exist/${songId}`)
}
export const updateSongInSongList = (songListId, data) => {
  return request('patch', `/api/v1/songList/${songListId}`, data)
}
export const getListSongs = (songListId) => {
  return request('get', `/api/v1/songList/${songListId}`)
}
export const replaceSongOrder = (songListId, data) => {
  return request('put', `/api/v1/songList/${songListId}/songs`, data)
}
export const replaceSortMode = (songListId, data) => {
  return request('put', `/api/v1/songList/${songListId}/sortMode`, data)
}
