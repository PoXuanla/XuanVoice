import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Skeleton, Typography } from '@mui/material'
import UserSongListModal from '../UserSongListModal'
import ListCell from '../ListCell/ListCell'
import SimpleComfirmModal from '../SimpleComfirmModal/SimpleComfirmModal'
import { replaceSongListData, openPlayer } from '../../slice/musicplayerSlice'
import ShowModeToolBar from './ShowModeToolBar'
import EditModeToolBar from './EditModeToolBar'

const SongWatchList = (props) => {
  const { songListData, mode = 'show', editLocation, rank = false, isLoading = false } = props
 
  // songListData (Array)   => 歌曲資料 [{ name, image, author, mp3 }]
  // mode         (String)  => 歌曲列表的使用模式('edit'、'show')
  // rank         (Boolean) => 歌曲前方顯示數字
  // editLocation (String)  => 編輯網址
  // isLoading    (Boolean) => 正在載入中

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [addToSongListSongId, setAddToSongListSongId] = useState('')
  const [showSongList, setShowSongList] = useState(false)
  const [delSongName, setDelSongName] = useState('')
  const [delSongId, setDelSongId] = useState('')
  const [showDelModal, setShowDelModal] = useState(false)
  const [showLoggedInModal, setShowLoggedInModal] = useState(false)

  //ShowMode ButtonHandler
  const addToSongList = useCallback((songId) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false
    if (!isLoggedIn) {
      setShowLoggedInModal(true)
      return
    }
    setAddToSongListSongId(songId)
    setShowSongList(true)
  }, [])
  const playMusic = useCallback(
    (songId) => {
      const song = songListData.find((data) => data._id === songId)
      const { name, image, author, mp3 } = song
      dispatch(openPlayer())
      dispatch(replaceSongListData([{ name, image, author, mp3 }]))
    },
    [songListData]
  )
  //EditMode ButtonHandler
  const openDelSongModal = useCallback((songId, songName) => {
    setShowDelModal(true)
    setDelSongName(songName)
    setDelSongId(songId)
  }, [])
  const editSongHandler = useCallback((songId) => {
    let location = editLocation.replace('{songId}', songId)
    navigate(location)
  }, [])

  //Modal Handler
  const closeSongListHandler = useCallback(() => {
    setShowSongList(false)
  }, [])
  const modalClose = useCallback((event, reason) => {
    if (reason === 'backdropClick') {
      setShowDelModal(false)
    }
    setShowDelModal(false)
  }, [])
  const deleteSongHandler = useCallback(async () => {
    try {
      await deleteSong(delSongId)
      fetchSong()
      setShowDelModal(false)
    } catch (e) {
      setShowDelModal(false)
    }
  }, [delSongId])
  const goToLoggin = useCallback(() => {
    navigate('/login')
  }, [])

  // component
  const SongList = songListData.map((songData, index) => {
    return (
      <Box key={index}>
        <ListCell
          songData={songData}
          songIndex={index + 1}
          rank={rank}
          divider={index !== songListData.length - 1 ? true : false}
        >
          {mode === 'show' && (
            <ShowModeToolBar
              songId={songData._id}
              playMusic={playMusic}
              addToSongList={addToSongList}
            />
          )}
          {mode === 'edit' && (
            <EditModeToolBar
              songId={songData._id}
              songName={songData.name}
              editSongHandler={editSongHandler}
              openDelSongModal={openDelSongModal}
            />
          )}
        </ListCell>
      </Box>
    )
  })

  return (
    <>
      {isLoading && (
        <>
          <Skeleton animation='wave' height={50} />
        </>
      )}
      {/* Render ListCell */}
      {!isLoading && SongList}
      {/* no any songData */}
      {songListData.length === 0 && !isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography color='text.primary' variant='body1'>
            沒有任何資料
          </Typography>
        </Box>
      )}
      {/* 加入歌單 Modal */}
      {mode === 'show' && (
        <UserSongListModal
          songId={addToSongListSongId}
          show={showSongList}
          onCancel={closeSongListHandler}
        ></UserSongListModal>
      )}
      {/* 刪除 Modal */}
      {mode === 'edit' && (
        <SimpleComfirmModal
          show={showDelModal}
          close={modalClose}
          title={'刪除歌曲'}
          confirmText={'刪除'}
          cancelText={'取消'}
          onConfirm={deleteSongHandler}
          onCancel={modalClose}
        >{`是否刪除 : ${delSongName}`}</SimpleComfirmModal>
      )}
      {/* 未登入 Modal */}
      {
        <SimpleComfirmModal
          show={showLoggedInModal}
          title={'登入'}
          confirmText={'前往'}
          cancelText={'取消'}
          onConfirm={goToLoggin}
          onCancel={modalClose}
        >
          {<>尚未登入，前往登入以使用功能</>}
        </SimpleComfirmModal>
      }
    </>
  )
}
export default React.memo(SongWatchList)
