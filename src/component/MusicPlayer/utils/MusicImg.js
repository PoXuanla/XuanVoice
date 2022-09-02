import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'

const MusicImg = (props) => {
  const { songListData, currentSongIndex } = useSelector((state) => state.musicplayer)

  return (
    <Avatar
      variant={'rounded'}
      alt='The image'
      src={songListData.length !== 0 ? songListData[currentSongIndex].image : ''}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      }}
    />
  )
}
export default MusicImg
