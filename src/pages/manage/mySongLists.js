import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Divider, Skeleton } from '@mui/material'
import SongList from '../../component/Manage/MySongLists/SongList'
import { getUserSongLists, deleteSongListBySongId } from '../../api/songList'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import SimpleComfirmModal from '../../component/SimpleComfirmModal/SimpleComfirmModal'
import TitleBar from '../../component/Manage/MySongLists/TitleBar'

const MySongLists = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)

  const [userSongList, setUserSongList] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteSongListId, setDeleteSongListId] = useState('')
  const [deleteSongListName, setDeleteSongListName] = useState('')

  useEffect(() => {
    getUserSongList()
  }, [])

  const getUserSongList = async () => {
    try {
      dispatch(setLoading())
      const response = await getUserSongLists()
      if (response.songList.length !== 0) setUserSongList(response.songList)
      else setUserSongList([])
      dispatch(clearLoading())
    } catch (e) {
      dispatch(clearLoading())
    }
  }
  const showDeleteModalHandler = (listId, listName) => {
    setDeleteSongListId(listId)
    setDeleteSongListName(listName)
    setShowDeleteModal(true)
  }
  //關閉刪除Modal
  const modalClose = (event, reason) => {
    // if (reason === 'backdropClick') {
    //   setShowCreateSongList(false)
    // }
    setShowDeleteModal(false)
  }
  const deleteSongListHandler = async () => {
    try {
      await deleteSongListBySongId(deleteSongListId)
      getUserSongList()
      setShowDeleteModal(false)
    } catch (e) {
      setShowDeleteModal(false)
    }
  }
  // User 的歌單
  const UserSongLists = userSongList.map((songList, index) => {
    let sumOfSong = songList.songs.length
    return (
      <div key={index}>
        <SongList
          key={index}
          songList={songList}
          sumOfSong={sumOfSong}
          showDeleteModal={showDeleteModalHandler}
        />
        {index === userSongList.length - 1 ? '' : <Divider sx={{ mt: 1, mb: 1 }} />}
      </div>
    )
  })
  return (
    <>
      <TitleBar getUserSongList={getUserSongList} />

      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <Skeleton animation='wave' height={50} />
          <Skeleton animation='wave' height={50} />
        </Box>
      )}
      {!isLoading && UserSongLists}

      {/* 刪除歌單 */}
      <SimpleComfirmModal
        show={showDeleteModal}
        close={modalClose}
        title={'刪除歌單'}
        confirmText={'刪除'}
        cancelText={'取消'}
        onConfirm={deleteSongListHandler}
        onCancel={modalClose}
      >
        {`是否刪除歌單 : ${deleteSongListName}`}
      </SimpleComfirmModal>
    </>
  )
}
export default MySongLists
