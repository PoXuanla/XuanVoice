import { Box, Typography, Button, Avatar, Divider, CircularProgress, Modal } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SongList from '../../component/manage/mySong/SongList'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MySong = () => {
  const [songListData, setSongListData] = useState(null)
  const [showDelModal, setShowDelModal] = useState(false)
  const [delModalMsg, setDelModalMsg] = useState('')
  const [delSongId, setDelSongId] = useState('')
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(user).length !== 0) fetchSong()
  }, [user])

  const fetchSong = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/users/${user._id}/songs`
      )
      const data = response.data
      console.log(`fetch song : ${data.song}`)
      if (data.song.length !== 0) setSongListData(data.song)
      else setSongListData([])
    } catch (e) {
      console.log(e)
    }
  }

  const editSongHandler = (songId) => {
    navigate(`/manage/song/${songId}/edit`)
  }
  const openDelSongModal = (songId, songName) => {
    setShowDelModal(true)
    setDelModalMsg(songName)
    setDelSongId(songId)
  }
  const deleteSongHandler = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_URL}/api/v1/songs/${delSongId}`)
    //刷新songList
    fetchSong()
    setShowDelModal(false)
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
          歌曲列表
        </Typography>
        <Button variant='contained' color='error' component={Link} to='/manage/song/upload'>
          上傳歌曲
        </Button>
      </Box>
      {!songListData && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {songListData &&
        songListData.map((song, index) => {
          return (
            <div key={index}>
              <SongList
                key={index}
                name={song.name}
                image={song.image}
                songId={song._id}
                onDelete={openDelSongModal}
                onEdit={editSongHandler}
              ></SongList>
              <Divider />
            </div>
          )
        })}
      {/* 刪除 Modal */}
      <Modal
        open={showDelModal}
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
            variant='h6'
            component='h2'
            sx={{ color: 'text.primary' }}
          >
            是否刪除此歌曲?
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2, mb: 2, color: 'text.primary' }}>
            {delModalMsg}
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button onClick={deleteSongHandler}>刪除</Button>
            <Button
              onClick={() => {
                setShowDelModal(false)
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
export default MySong
