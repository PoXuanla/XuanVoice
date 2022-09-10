import { useDispatch } from 'react-redux'
import { Avatar, Grid, Typography, Box, IconButton } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { TopGridContainer, TopInfoGridItem, TopToolContainer, TopInfoContainer } from './SongStyle'
import { replaceSongListData, openPlayer } from '../../slice/musicplayerSlice'

const SongTopInfo= (props) => {
  const { songData } = props
  const dispatch = useDispatch()

  const playMusicHandler = () => {
    const { name, image, author, mp3 } = songData
    dispatch(openPlayer())
    dispatch(replaceSongListData([{ name, image, author, mp3 }]))
  }

  return (
    <TopGridContainer container>
      {/* 圖片 */}
      <Grid item xs={12} sm={3} sx={{ padding: 2 }}>
        <Avatar
          variant='rounded'
          src={songData.image}
          sx={{ width: '100%', height: '100%' }}
        ></Avatar>
      </Grid>

      <TopInfoGridItem item xs={12} sm={9}>
        {/* 音樂資訊 */}
        <TopInfoContainer>
          <Typography variant='h5'>{songData.name}</Typography>
          <Typography variant='body1'>
            {songData.songCategory ? songData.songCategory.name : ''}
          </Typography>
        </TopInfoContainer>
        {/* ToolBar */}
        <TopToolContainer>
          <Box>
            <IconButton size='large' onClick={playMusicHandler}>
              <PlayCircleIcon sx={{ color: 'red' }} fontSize='large' />
            </IconButton>
          </Box>
        </TopToolContainer>
      </TopInfoGridItem>
    </TopGridContainer>
  )
}
export default SongTopInfo
