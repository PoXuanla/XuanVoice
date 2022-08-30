import { Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserSong } from '../../api/song'
import SongWatchList from '../../component/SongWatchList/SongWatchList'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { Wrapper } from '../../component/Manage/MySong/MySongStyle'

const MySong = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const [songListData, setSongListData] = useState([])

  useEffect(() => {
    fetchSong()
  }, [])

  const fetchSong = async () => {
    try {
      dispatch(setLoading())
      const response = await fetchUserSong()
      setSongListData(response.song)
      dispatch(clearLoading())
    } catch (e) {
      dispatch(clearLoading())
    }
  }
  return (
    <>
      <Wrapper>
        <Typography variant='h6' className='title'>
          歌曲列表
        </Typography>
        <Button variant='contained' color='error' component={Link} to='/manage/song/upload'>
          上傳歌曲
        </Button>
      </Wrapper>
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
