import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Typography, Button, TextField, Divider, Skeleton } from '@mui/material'
import SongList from '../../component/manage/mySongLists/SongList'
import { createSongList, getUserSongLists, deleteSongListBySongId } from '../../api/songList'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import SimpleComfirmModal from '../../component/SimpleComfirmModal'

const MySongLists = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const listNameRef = useRef()
  //useState
  const [userSongList, setUserSongList] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteSongListId, setDeleteSongListId] = useState('')
  const [deleteSongListName, setDeleteSongListName] = useState('')

  useEffect(() => {
    getUserSongList()
  }, [])
  const getUserSongList = async () => {
    dispatch(setLoading())
    await getUserSongLists()
      .then((data) => {
        if (data.songList.length !== 0) setUserSongList(data.songList)
        else setUserSongList([])
        dispatch(clearLoading())
      })
      .catch(() => {
        dispatch(clearLoading())
      })
  }
  const showDeleteModalHandler = (listId, listName) => {
    setDeleteSongListId(listId)
    setDeleteSongListName(listName)
    setShowDeleteModal(true)
  }
  const modalClose = (action) => (event, reason) => {
    // if (reason === 'backdropClick') {
    //   setShowCreateSongList(false)
    // }
    if (action === 'create') {
      setShowCreateModal(false)
    } else if (action === 'delete') {
      setShowDeleteModal(false)
    }
  }
  const createSongListHandler = async () => {
    const songListName = listNameRef.current.value
    const data = {
      name: songListName
    }
    await createSongList(data)
      .then((res) => {
        setShowCreateModal(false)
        getUserSongList()
      })
      .catch((error) => {
        setShowCreateModal(false)
      })
  }
  const deleteSongListHandler = async () => {
    await deleteSongListBySongId(deleteSongListId)
      .then(() => {
        console.log('delete ~')
        setShowDeleteModal(false)
        getUserSongList()
      })
      .catch(() => {
        setShowDeleteModal(false)
      })
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={2}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
          歌單列表
        </Typography>
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            setShowCreateModal(true)
          }}
        >
          新增歌單
        </Button>
      </Box>
      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <Skeleton animation='wave' height={50} />
          <Skeleton animation='wave' height={50} />
        </Box>
      )}
      {!isLoading &&
        userSongList.map((songList, index) => {
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
        })}
      {/* 新建歌單 */}
      <SimpleComfirmModal
        show={showCreateModal}
        close={modalClose}
        title={'新增歌單'}
        confirmText={'建立'}
        cancelText={'取消'}
        onConfirm={createSongListHandler}
        onCancel={modalClose('create')}
      >
        {
          <TextField
            id='filled-multiline-static'
            label='歌單名稱'
            inputRef={listNameRef}
            rows={4}
            sx={{ width: '100%', mb: 2 }}
          ></TextField>
        }
      </SimpleComfirmModal>
      {/* 刪除歌單 */}
      <SimpleComfirmModal
        show={showDeleteModal}
        close={modalClose}
        title={'刪除歌單'}
        confirmText={'刪除'}
        cancelText={'取消'}
        onConfirm={deleteSongListHandler}
        onCancel={modalClose('delete')}
      >
        {`是否刪除歌單 : ${deleteSongListName}`}
      </SimpleComfirmModal>
    </>
  )
}
export default MySongLists
