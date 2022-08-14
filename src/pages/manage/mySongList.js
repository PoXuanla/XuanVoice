import {
  Box,
  Typography,
  Button,
  Link,
  Modal,
  TextField,
  Divider,
  CircularProgress
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import SongList from '../../component/manage/mySongList/SongList'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { createSongList, getUserSongLists } from '../../api/songList'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { useSelect } from '@mui/base'

const MySongList = () => {
  const [showCreateSongList, setShowCreateSongList] = useState(false)
  const [userSongList, setUserSongList] = useState([])
  const listNameRef = useRef()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.load)
  useEffect(() => {
    getUserSongList()
  }, [])

  const modalClose = (event, reason) => {
    if (reason === 'backdropClick') {
      setShowCreateSongList(false)
    }
  }
  const createSongListHandler = async () => {
    const songListName = listNameRef.current.value
    const data = {
      name: songListName
    }
    await createSongList(data)
      .then((res) => {
        setShowCreateSongList(false)
        getUserSongList()
      })
      .catch((error) => {
        setShowCreateSongList(false)
      })
  }
  const getUserSongList = async () => {
    dispatch(setLoading())
    await getUserSongLists()
      .then((data) => {
        if (data.songList.length !== 0) setUserSongList(data.songList)
        dispatch(clearLoading())
      })
      .catch(() => {
        dispatch(clearLoading())
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
            setShowCreateSongList(true)
          }}
        >
          新增歌單
        </Button>
      </Box>
      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {userSongList.map((songList, index) => {
        let sumOfSong = songList.songs.length
        return (
          <div key={index}>
            <SongList key={index} songList={songList} sumOfSong={sumOfSong} />
            {index === userSongList.length - 1 ? '' : <Divider sx={{ mt: 1, mb: 1 }} />}
          </div>
        )
      })}

      <Modal
        open={showCreateSongList}
        onClose={modalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 300,
            width: '70%',
            bgcolor: 'background.paper',
            outline: 'none',
            boxShadow: 24,
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='body1'
            component='h2'
            mb={2}
            sx={{ fontWeight: 700 }}
          >
            新增歌單
          </Typography>
          <TextField
            id='filled-multiline-static'
            label='歌單名稱'
            inputRef={listNameRef}
            rows={4}
            sx={{ width: '100%', mb: 2 }}
          />
          <Box sx={{ textAlign: 'right' }}>
            <Button variant='contained' onClick={createSongListHandler}>
              建立
            </Button>
            <Button
              variant='outlined'
              sx={{ ml: 1 }}
              onClick={() => {
                setShowCreateSongList(false)
              }}
            >
              取消
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
export default MySongList
