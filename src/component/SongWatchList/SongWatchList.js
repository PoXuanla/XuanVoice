import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Divider, IconButton, Skeleton, Typography } from '@mui/material'
import { AddCircle, PlayCircle, Edit, Delete } from '@mui/icons-material'
import UserSongListModal from '../UserSongListModal'
import ListCell from '../ListCell/ListCell'
import SimpleComfirmModal from '../SimpleComfirmModal/SimpleComfirmModal'
import { replaceSongListData } from '../../slice/musicplayerSlice'
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

  const addToSongList = (songId) => () => {
    setAddToSongListSongId(songId)
    setShowSongList(true)
  }
  const closeSongListHandler = () => {
    setShowSongList(false)
  }
  const editSongHandler = (songId) => () => {
    let location = editLocation.replace('{songId}', songId)
    navigate(location)
  }
  const openDelSongModal = (songId, songName) => () => {
    setShowDelModal(true)
    setDelSongName(songName)
    setDelSongId(songId)
  }
  const modalClose = (event, reason) => {
    if (reason === 'backdropClick') {
      setShowDelModal(false)
    }
    setShowDelModal(false)
  }
  const deleteSongHandler = async () => {
    try {
      await deleteSong(delSongId)
      fetchSong()
      setShowDelModal(false)
    } catch (e) {
      setShowDelModal(false)
    }
  }
  const playMusic = (songId) => () => {
    const song = songListData.find((data) => data._id === songId)
    const { name, image, author, mp3 } = song
    dispatch(replaceSongListData([{ name, image, author, mp3 }]))
  }
  //工具欄-一般顯示模式
  const showModeToolBar = (songId) => (
    <Box
      sx={{
        height: 50,
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
      }}
    >
      <IconButton onClick={addToSongList(songId)}>
        <AddCircle sx={{ fontSize: { xs: 15, sm: 18 } }}></AddCircle>
      </IconButton>
      <IconButton onClick={playMusic(songId)}>
        <PlayCircle sx={{ fontSize: { xs: 15, sm: 18 } }}></PlayCircle>
      </IconButton>
    </Box>
  )
  //工具欄-編輯模式
  const editModeToolBar = (songId, songName) => (
    <Box
      sx={{
        height: 50,
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
      }}
    >
      <IconButton onClick={editSongHandler(songId)}>
        <Edit sx={{ fontSize: { xs: 15, sm: 18 } }}></Edit>
      </IconButton>
      <IconButton onClick={openDelSongModal(songId, songName)}>
        <Delete sx={{ fontSize: { xs: 15, sm: 18 } }}></Delete>
      </IconButton>
    </Box>
  )
  return (
    <>
      {isLoading && (
        <>
          <Skeleton animation='wave' height={50} />
        </>
      )}
      {/* Render ListCell */}
      {!isLoading &&
        songListData.map((songData, index) => {
          return (
            <Box key={index}>
              <ListCell
                songData={songData}
                songIndex={index + 1}
                rank={rank}
                divider={index !== songListData.length - 1 ? true : false}
              >
                {mode === 'show' && showModeToolBar(songData._id)}
                {mode === 'edit' && editModeToolBar(songData._id, songData.name)}
              </ListCell>
            </Box>
          )
        })}
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
    </>
  )
}
export default SongWatchList
