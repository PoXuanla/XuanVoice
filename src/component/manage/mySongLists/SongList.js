import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography, IconButton, Link } from '@mui/material'
import { Delete, PlaylistPlay } from '@mui/icons-material'
import { getListSongs } from '../../../api/songList'
import { replaceSongListData,playSong } from '../../../slice/musicplayerSlice'
const SongList = (props) => {
  const { songList, sumOfSong = 0 } = props
  //songList  (Object) => 歌單資訊
  //sumOfSong (Number) => 歌單中共幾曲
  const dispatch = useDispatch()

  const showDeleteMadalHandler = () => {
    props.showDeleteModal(songList._id, songList.name)
  }
  const playSongListHandler = async () => { 
    const listSongs = await getListSongs(songList._id)
    console.log(listSongs)
    dispatch(replaceSongListData(listSongs.songs))
    dispatch(playSong())
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        {/* SongList Name */}
        <Link component={RouterLink} underline='none' to={`/manage/songlists/${songList._id}`}>
          <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
            {songList.name}
          </Typography>
        </Link>
        {/* 共幾曲 */}
        <Typography
          variant='caption'
          sx={{ color: 'text.secondary' }}
        >{`${sumOfSong}曲`}</Typography>
      </Box>
      {/* ToolBar */}
      <Box>
        <IconButton onClick={playSongListHandler}>
          <PlaylistPlay sx={{ fontSize: { xs: 17, sm: 20 } }} />
        </IconButton>
        <IconButton onClick={showDeleteMadalHandler}>
          <Delete sx={{ fontSize: { xs: 15, sm: 18 } }} />
        </IconButton>
      </Box>
    </Box>
  )
}
export default SongList
