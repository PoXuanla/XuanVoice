import { useSelector } from 'react-redux'

import { Box, Typography, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { blueGrey, pink } from '@mui/material/colors'

const MusicInfo = (props) => {
 
  const showBtn = props.showBtn
  const { songListData, currentSongIndex } = useSelector((state) => state.musicplayer)
  return (
    <>
      {/* 作者歌名 */}
      <Box
        sx={{
          width: showBtn ? 'calc(100% - 70px)' : '100%'
        }}
      >
        <Typography noWrap variant='body1' color='text.primary'>
          {songListData.length === 0 ? '' : songListData[currentSongIndex].name}
        </Typography>

        <Typography variant='body2' color='text.primary'>
          {songListData.length === 0 ? '' : songListData[currentSongIndex].author.name}
        </Typography>
      </Box>
      {/* 更多功能、喜歡 */}
      <Box
        sx={{
          display: showBtn ? 'flex' : 'none',
          justifyContent: 'right',
          alignItems: 'center',
          width: 70
        }}
      >
        <IconButton
          sx={{
            width: 30,
            height: 30
          }}
        >
          <MoreHorizIcon color='text.primary'></MoreHorizIcon>
        </IconButton>
        <IconButton
          sx={{
            width: 30,
            height: 30
          }}
        >
          <FavoriteBorderIcon
            color='text.primary'
            sx={{ '&:hover': { color: pink[500] } }}
          ></FavoriteBorderIcon>
        </IconButton>
      </Box>
    </>
  )
}
export default MusicInfo
