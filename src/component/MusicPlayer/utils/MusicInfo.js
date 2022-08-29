import { useSelector } from 'react-redux'

import { Box, Typography, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { blueGrey, pink } from '@mui/material/colors'

const MusicInfo = (props) => {
  const {
    display = 'block',
    position = 'static',
    width = '100%',
    bottom = 0,
    padding = 0,
    marginRight = 0,
    color = props.color || '#000'
  } = props.css || {}
  const showBtn = props.showBtn
  const { songListData, currentSongIndex } = useSelector((state) => state.musicplayer)
  return (
    <Box
      sx={{
        display: display || 'block',
        position: position || 'static',
        bottom: bottom !== undefined ? bottom : null,
        padding: padding || 0,
        width: width || '100%',
        textOverflow: 'ellipsis',
        marginRight: marginRight || 0,
        // transition: 'all .5s'
      }}
    >
      {/* 作者歌名 */}
      <Box
        sx={{
          width: showBtn ? 'calc(100% - 70px)' : '100%'
        }}
      >
        <Typography noWrap variant='body1' color={color}>
          {songListData.length === 0 ? '' : songListData[currentSongIndex].name}
        </Typography>

        <Typography variant='body2' color={color}>
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
          <MoreHorizIcon sx={{ color }}></MoreHorizIcon>
        </IconButton>
        <IconButton
          sx={{
            width: 30,
            height: 30
          }}
        >
          <FavoriteBorderIcon sx={{ color, '&:hover': { color: pink[500] } }}></FavoriteBorderIcon>
        </IconButton>
      </Box>
    </Box>
  )
}
export default MusicInfo
