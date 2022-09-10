import React from 'react'
import { Box, IconButton } from '@mui/material'
import { AddCircle, PlayCircle } from '@mui/icons-material'

// 在 show 模式下的 Toolbar
const ShowModalToolbar = (props) => {
  const songId = props.songId

  const addToSongList = (songId) => () => {
    props.addToSongList(songId)
  }
  const playMusic = (songId) => () => {
    props.playMusic(songId)
  }
  // set toolbar
  return (
    <Box
      sx={{
        height: 50,
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
      }}
    >
      <IconButton onClick={addToSongList(songId)}>
        <AddCircle sx={{ fontSize: { xs: 25, sm: 25 } }}></AddCircle>
      </IconButton>
      <IconButton onClick={playMusic(songId)}>
        <PlayCircle sx={{ fontSize: { xs: 25, sm: 25 } }}></PlayCircle>
      </IconButton>
    </Box>
  )
}
export default React.memo(ShowModalToolbar)
