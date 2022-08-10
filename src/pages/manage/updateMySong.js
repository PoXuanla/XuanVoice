import axios from 'axios'
import { useEffect, useState } from 'react'
import SongForm from '../../component/manage/mySong/SongForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { Modal, Typography, Box, Button } from '@mui/material'
const UpdateMySong = () => {
  const dispatch = useDispatch()
  const [song, setSong] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const navigate = useNavigate()
  const songId = useParams().songid

  const submitHandler = async (formdata) => {
    dispatch(setLoading())
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_URL}/api/v1/songs/${songId}`,
        formdata,
        {
          headers: {
            'Content-Type': `multipart/form-data;`
          }
        }
      )
      dispatch(clearLoading())
      setShowModal(true)
      setModalMsg('更新成功')
    } catch (e) {
      setShowModal(false)
      setModalMsg('更新失敗')
    }
  }
  useEffect(() => {
    const fetchSongById = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/v1/songs/${songId}`)
        console.log(res)
        const song = res.data.song
        setSong(song)
      } catch (e) {
        console.log(e)
      }
    }
    fetchSongById()
  }, [])
  return (
    <>
      <SongForm song={song} mode={'update'} onSubmit={submitHandler}></SongForm>
      {/* submit 訊息 */}
      <Modal
        open={showModal}
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
            bgcolor: 'modal',
            outline: 'none',
            boxShadow: 24,
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography id='modal-title' variant='h6' component='h2' sx={{ color: 'text.primary' }}>
            更新訊息
          </Typography>
          <Typography id='modal-description' sx={{ mt: 2, mb: 2, color: 'text.primary' }}>
            {modalMsg}
          </Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Button
              onClick={() => {
                setShowModal(false)
                navigate('/manage/song')
              }}
            >
              確定
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
export default UpdateMySong
