import axios from 'axios'
import { useEffect, useState } from 'react'
import SongForm from '../../component/manage/mySong/SongForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { Modal, Typography, Box, Button } from '@mui/material'
import { getSongById, patchSongById } from '../../api/song'

const UpdateMySong = () => {
  const dispatch = useDispatch()
  const [song, setSong] = useState(null)
  const navigate = useNavigate()
  const songId = useParams().songid

  const submitHandler = async (formdata) => {
    dispatch(setLoading())
    await patchSongById(songId, formdata)
      .then(() => {
        dispatch(clearLoading())
        navigate('/manage/song', { replace: true })
      })
      .catch(() => {
        dispatch(clearLoading())
      })
  }
  useEffect(async () => {
    await getSongById(songId)
      .then((data) => {
        setSong(data.song)
      })
      .catch()
  }, [])
  return (
    <>
      <SongForm song={song} mode={'update'} onSubmit={submitHandler}></SongForm>
    </>
  )
}
export default UpdateMySong
