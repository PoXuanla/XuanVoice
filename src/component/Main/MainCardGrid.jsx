import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { getBrowseSongs } from '../../api/song'
import MainCard from './MainCard'

const MainCardGrid = () => {
  const [songListData, setSongListData] = useState([])

  useEffect(async () => {
    const response = await getBrowseSongs('all', 'latest', 1)
    const songs = response.songs.splice(0, 3)
    setSongListData(songs)
  }, [])
  const GridItem = songListData.map((data, index) => {
    return (
      <Grid key={index} item xs={12} sm={12} md={4} sx={{ p: 2 }}>
        <MainCard data={data} />
      </Grid>
    )
  })
  return (
    <Grid container sx={{ mt: 2 }}>
      {GridItem}
    </Grid>
  )
}
export default MainCardGrid
