import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import SongForm from '../../component/manage/MySong/SongForm'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { getSongById, patchSongById } from '../../api/song'

const UpdateMySong = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const songId = useParams().songid

  const [song, setSong] = useState(null)

  useEffect(() => {
    setSongInForm()
  }, [])

  const setSongInForm = async () => {
    try {
      const response = await getSongById(songId)
      setSong(response.song)
    } catch (e) {}
  }
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
  return (
    <>
      <SongForm song={song} mode={'update'} onSubmit={submitHandler}></SongForm>
    </>
  )
}
export default UpdateMySong
