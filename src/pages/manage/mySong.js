import { Box, Typography, Button, Avatar, Divider, CircularProgress, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserSong } from '../../api/song'
import SongWatchList from '../../component/SongWatchList/SongWatchList'
import { setLoading, clearLoading } from '../../slice/loadSlice'

const MySong = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const [songListData, setSongListData] = useState([])

  useEffect(() => {
    fetchSong()
  }, [])

  const fetchSong = async () => {
    dispatch(setLoading())
    await fetchUserSong()
      .then((data) => {
        setSongListData(data.song)
        dispatch(clearLoading())
      })

      .catch(() => {
        dispatch(clearLoading())
      })
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
          歌曲列表
        </Typography>
        <Button variant='contained' color='error' component={Link} to='/manage/song/upload'>
          上傳歌曲
        </Button>
      </Box>

      {
        <SongWatchList
          songListData={songListData}
          isLoading={isLoading}
          mode='edit'
          editLocation='/manage/song/{songId}/edit'
        ></SongWatchList>
      }
    </>
  )
}
export default MySong
