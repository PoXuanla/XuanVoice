import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import { Box } from '@mui/material'
import data from '../data'

const MusicImg = (props) => {
  const showUI = props.showUI
  const { width = '', height = '', marginRight = '', filter = '', opacity = 1 } = props.css || {}
  const [totalSongNum, setTotalSongNum] = useState(null)

  const { songListData, currentSongIndex } = useSelector((state) => state.musicplayer)
  useEffect(() => {
    setTotalSongNum(data.length)
  }, [])

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
