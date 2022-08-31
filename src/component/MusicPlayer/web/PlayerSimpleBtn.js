import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { pink } from '@mui/material/colors'
import { playSong, pauseSong } from '../../../slice/musicplayerSlice'

const PlayerSimpleBtn = (props) => {
  const { player, showUI } = props
  const { isPlay } = useSelector((state) => state.musicplayer)
  const dispatch = useDispatch()

  const togglePlayHandler = () => {
    if (isPlay) {
      dispatch(pauseSong())
      player.pause()
    } else {
      dispatch(playSong())
      player.play()
    }
  }
  return (
    <Box
      sx={{
        display: showUI ? 'none' : 'flex',
        width: 70
      }}
    >
      <IconButton onClick={togglePlayHandler} fontSize='medium'>
        {!isPlay && <PlayCircleIcon fontSize='medium' sx={{ color: 'player.primary' }} />}
        {isPlay && <PauseCircleIcon fontSize='medium' sx={{ color: 'player.primary' }} />}
      </IconButton>
      <IconButton
        onClick={() => {
          props.showUIHandler()
        }}
        fontSize='medium'
      >
        <MenuIcon sx={{ color: 'player.primary' }} />
      </IconButton>
    </Box>
  )
}
export default PlayerSimpleBtn
