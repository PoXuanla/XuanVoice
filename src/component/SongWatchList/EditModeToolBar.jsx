import React from 'react'
import { Box, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

const EditModeToolBar = (props) => {
  const { songId, songName } = props

  const editSongHandler = (songId) => () => {
    props.editSongHandler(songId)
  }
  const openDelSongModal = (songId, songName) => () => {
    props.openDelSongModal(songId, songName)
    }
    
  return (
    <Box
      sx={{
        height: 50,
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
      }}
    >
      <IconButton onClick={editSongHandler(songId)}>
        <Edit sx={{ fontSize: { xs: 25, sm: 25 } }}></Edit>
      </IconButton>
      <IconButton onClick={openDelSongModal(songId, songName)}>
        <Delete sx={{ fontSize: { xs: 25, sm: 25 } }}></Delete>
      </IconButton>
    </Box>
  )
}
export default React.memo(EditModeToolBar)
