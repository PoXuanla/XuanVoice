import { Box, Typography, IconButton } from '@mui/material'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

const SongList = (props) => {
  const songList = props.songList
  const sumOfSong = props.sumOfSong
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant='body1' sx={{ fontWeight: 700 }}>
          {songList.name}
        </Typography>
        <Typography variant='caption'>{`${sumOfSong}曲`}</Typography>
      </Box>
      <Box>
        <IconButton color='primary'>
          <PlaylistPlayIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
export default SongList
