import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  List,
  Typography,
  IconButton,
  GlobalStyles,
  Avatar,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton
} from '@mui/material'

import { pink, blueGrey } from '@mui/material/colors'
import MusicImg from '../../MusicPlayer/utils/MusicImg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { setCurrentSongIndex, playSong, setSongCurrentTime } from '../../../slice/musicplayerSlice'
const scrollbarStyle = (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': {
        width: '0.4em'
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: blueGrey[50],
        borderRadius: '5px'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: blueGrey[500],
        borderRadius: '5px',
        border: `1px solid ${blueGrey[500]}`
      }
    }}
  />
)

const DialogPlayList = (props) => {
  const { player } = props
  const { songListData, currentSongIndex } = useSelector((state) => state.musicplayer)
  const dispatch = useDispatch()
  const changeSongHandler = (index) => () => {
    player.src = songListData[currentSongIndex].mp3
    player.play()
    dispatch(setCurrentSongIndex(index))
    dispatch(playSong())
    // dispatch(setSongCurrentTime(0))
  }
  const toggleHeartHandler = (e) => {
    e.stopPropagation()
    console.log('ss')
  }
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
        transition: 'all .5s',
        boxShadow: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pt: 3
      }}
    >
      {scrollbarStyle}
      <List
        component='nav'
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',

          width: '90%',
          maxHeight: '90%',
          overflow: 'auto'
        }}
      >
        {songListData.map((data, index) => {
          return (
            <Box key={index} pr={2}>
              <ListItemButton
                selected={index === currentSongIndex}
                sx={{ borderRadius: 1, width: '100%' }}
                onClick={changeSongHandler(index)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={data.image}
                    sx={{
                      width: 50,
                      height: 50
                    }}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant='body1' style={{ color: 'text.primary' }}>
                      {data.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant='body2' style={{ color: 'text.primary' }}>
                      {data.author.name}
                    </Typography>
                  }
                />

                {/* <IconButton onClick={toggleHeartHandler}>
                  <FavoriteBorderIcon
                    sx={{
                      color: blueGrey[100]
                    }}
                  ></FavoriteBorderIcon>
                </IconButton> */}
              </ListItemButton>
              <Divider />
            </Box>
          )
        })}
      </List>
    </Box>
  )
}
export default DialogPlayList
