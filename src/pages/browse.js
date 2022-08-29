import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'
import QueryFactorBar from '../component/Browse/QueryFactorBar'
import { getBrowseSongs } from '../api/song'
import SongWatchList from '../component/SongWatchList/SongWatchList'
import { setLoading, clearLoading } from '../slice/loadSlice'

const Browse = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const [songListData, setSongListData] = useState([])

  useEffect(() => {
    getSongs('all')
  }, [])
  const getSongs = async (categoryId) => {
    dispatch(setLoading())
    const response = await getBrowseSongs(categoryId, 'latest')
    setSongListData(response.songs)
    dispatch(clearLoading())
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: 'background.default',
        height: '100%',
        maxWidth: {
          lg: 1000
        }
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={5} md={4} sx={{ padding: 2 }}>
          <QueryFactorBar reloadSongs={getSongs} />
        </Grid>
        <Grid item xs={12} sm={7} md={8} sx={{ padding: 2 }}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, padding: 2 }}>
            <SongWatchList songListData={songListData} mode='show' isLoading={isLoading} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Browse
