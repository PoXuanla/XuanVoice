import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Typography, IconButton, Link } from '@mui/material'
import { Delete, PlaylistPlay } from '@mui/icons-material'
import { getListSongs } from '../../../api/songList'
import { replaceSongListData, playSong } from '../../../slice/musicplayerSlice'
import { SongListWrapper } from './MySongListsStyle'
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
    dispatch(replaceSongListData(listSongs.songs))
    dispatch(playSong())
  }
  return (
    <SongListWrapper>
      <div>
        {/* SongList Name */}
        <Link component={RouterLink} underline='none' to={`/manage/songlists/${songList._id}`}>
          <Typography className='songName' variant='body1'>
            {songList.name}
          </Typography>
        </Link>
        {/* 共幾曲 */}
        <Typography className='sumOfSong' variant='caption'>{`${sumOfSong}曲`}</Typography>
      </div>
      {/* ToolBar */}
      <div>
        <IconButton onClick={playSongListHandler}>
          <PlaylistPlay sx={{ fontSize: 25 }} />
        </IconButton>
        <IconButton onClick={showDeleteMadalHandler}>
          <Delete sx={{ fontSize: 25 }} />
        </IconButton>
      </div>
    </SongListWrapper>
  )
}
export default SongList
