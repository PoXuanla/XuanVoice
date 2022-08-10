import { AddCircle, PlayCircle } from '@mui/icons-material'
// import AddCircle from '@mui/icons-material/AddCircle'
// import PlayCircle from '@mui/icons-material/PlayCircle'
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
const ListCell = (props) => {
  const songData = props.songData
  const songIndex = props.songIndex
  return (
    <Box mb={1}>
      <Box
        pl={2}
        pr={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography color='text.primary' variant='h5' mr={1}>
            {songIndex}
          </Typography>
          <Avatar
            variant='rounded'
            sx={{
              width: 50,
              height: 50
            }}
            src={songData.image}
          ></Avatar>
          <Box
            ml={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography color='text.primary' variant='h6'>{songData.name}</Typography>
            <Typography color='text.primary' variant='subtitle2'>{songData.author}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            // width: '30%',
            height: 50,
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center'
          }}
        >
          <IconButton>
            <AddCircle></AddCircle>
          </IconButton>
          <IconButton>
            <PlayCircle></PlayCircle>
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
export default ListCell
