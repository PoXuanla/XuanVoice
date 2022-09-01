import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Grid } from '@mui/material'
import QueryFactorBar from '../component/Browse/QueryFactorBar'
import { getBrowseSongs } from '../api/song'
import { setLoading, clearLoading } from '../slice/loadSlice'
import SongList from '../component/Browse/SongList'

const Browse = () => {
  const dispatch = useDispatch()
  const [categoryId, setCategoryId] = useState('all')
  const setSelectedCtyId = (categoryId) => { 
    setCategoryId(categoryId)
  }
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={5} md={4} sx={{ padding: 2 }}>
          <QueryFactorBar setSelectedCtyId={setSelectedCtyId} />
        </Grid>

        <Grid item xs={12} sm={7} md={8} sx={{ padding: 2 }}>
          <SongList categoryId={ categoryId} />
        </Grid>
      </Grid>
    </Container>
  )
}
export default Browse
