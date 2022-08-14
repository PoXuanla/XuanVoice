import { Box, Typography, Button, Avatar, Divider, CircularProgress, Modal } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchUserSong, deleteSong } from '../../api/song'
import Song from '../../component/manage/mySong/Song'

const MySong = () => {
  const [songListData, setSongListData] = useState([])
  const [showDelModal, setShowDelModal] = useState(false)
  const [delModalMsg, setDelModalMsg] = useState('')
  const [delSongId, setDelSongId] = useState('')
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    fetchSong()
  }, [])

  const fetchSong = async () => {
    await fetchUserSong()
      .then((data) => {
        setSongListData(data.song)
      })
      .catch()
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
    await deleteSong(delSongId)
      .then(() => {
        fetchSong()
        setShowDelModal(false)
      })
      .catch(() => {
        setShowDelModal(false)
      })
  }
  const modalClose = (event, reason) => {
    if (reason === 'backdropClick') {
      setShowDelModal(false)
    }
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
              <Song
                key={index}
                name={song.name}
                image={song.image}
                songId={song._id}
                onDelete={openDelSongModal}
                onEdit={editSongHandler}
              ></Song>
              {songListData.length - 1 === index ? '' : <Divider />}
            </div>
          )
        })}
      {/* 刪除 Modal */}
      <Modal
        open={showDelModal}
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
            <Button variant='contained' onClick={deleteSongHandler}>
              刪除
            </Button>
            <Button
              onClick={() => {
                setShowDelModal(false)
              }}
              variant='outlined'
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
