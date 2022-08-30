import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'
import QueryFactorBar from '../component/Browse/QueryFactorBar'
import { getBrowseSongs } from '../api/song'
import { setLoading, clearLoading } from '../slice/loadSlice'
import SongList from '../component/Browse/SongList'

const Browse = () => {
  const dispatch = useDispatch()
  const [songListData, setSongListData] = useState([])

  //取得全部歌曲
  useEffect(() => {
    getSongs('all')
  }, [])

  //function:取得歌曲
  //categoryId = 'all' : 取得全部歌曲
  const getSongs = async (categoryId) => {
    dispatch(setLoading())
    const response = await getBrowseSongs(categoryId, 'latest')
    setSongListData(response.songs)
    dispatch(clearLoading())
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={5} md={4} sx={{ padding: 2 }}>
          <QueryFactorBar reloadSongs={getSongs} />
        </Grid>

        <Grid item xs={12} sm={7} md={8} sx={{ padding: 2 }}>
          <SongList songListData={songListData} />
        </Grid>
      </Grid>
    </Container>
  )
}
export default Browse
