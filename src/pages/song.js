import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { getSongById } from '../api/song'
import SongTopInfo from '../component/Song/SongTopInfo'
import SongBottomInfo from '../component/Song/SongBottomInfo'

const Song = () => {
  const songId = useParams().songId
  const [songData, setSongData] = useState({})

  //loading music data
  useEffect(() => {
    const getSongData = async () => {
      const response = await getSongById(songId)
      setSongData(response.song)
    }
    getSongData()
  }, [])

  return (
    <Container sx={{ mt: 2 }}>
      {/* 上層的Song資訊 */}
      <SongTopInfo songData={songData} />
      {/* 下層的Song資訊 */}
      <SongBottomInfo songData={songData} />
    </Container>
  )
}
export default Song
