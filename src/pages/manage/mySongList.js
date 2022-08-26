import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Avatar, Skeleton, Menu, MenuItem, IconButton } from '@mui/material'
import { getListSongs, replaceSortMode } from '../../api/songList'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import SortMenu from '../../component/manage/mySongList/SortMenu'
import DragDropList from '../../component/manage/mySongList/DragDropList'

const MySongList = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const songListId = useParams().songListId

  const [songs, setSongs] = useState([])
  const [listName, setListName] = useState('')
  const [menuMode, setMenuMode] = useState(null)

  // 取得 SongList 內的 Song
  useEffect(() => {
    getListSong()
  }, [])
  const getListSong = async () => {
    try {
      dispatch(setLoading())
      const data = await getListSongs(songListId)
      setMenuMode({ orderBy: data.mode.orderBy, sort: data.mode.sort })
      setSongs(data.songs)
      setListName(data.listName)
      dispatch(clearLoading())
    } catch (e) {
      console.log(e)
    }
  }
  const changeSortModeHandler = async (index, mode) => {
    const response = await replaceSortMode(songListId, mode)
    await getListSong(songListId)
    setMenuMode({ ...response.mode })
  }
  const changeModeToManualHandler = async () => {
    await replaceSortMode(songListId, { orderBy: 'manual', sort: 'asc' })
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb={2}>
        {/* ListName */}
        {
          <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary', width: '70%' }}>
            {isLoading ? <Skeleton animation='wave' height={35} /> : listName}
          </Typography>
        }
        {/* Sort Menu */}
        <SortMenu menuMode={menuMode} changeSortMode={changeSortModeHandler}></SortMenu>
      </Box>
      {/* Songs */}

      {isLoading ? (
        <Skeleton animation='wave' height={65} />
      ) : (
        <DragDropList
          songsData={songs}
          songListId={songListId}
          changeModeToManual={changeModeToManualHandler}
        />
      )}
    </>
  )
}
export default MySongList
