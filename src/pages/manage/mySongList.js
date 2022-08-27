import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Skeleton } from '@mui/material'
import { getListSongs, replaceSortMode, updateSongInSongList } from '../../api/songList'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import SortMenu from '../../component/manage/mySongList/SortMenu'
import DragDropList from '../../component/manage/mySongList/DragDropList'
import SimpleComfirmModal from '../../component/SimpleComfirmModal'
const MySongList = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const songListId = useParams().songListId

  const [songs, setSongs] = useState([])
  const [listName, setListName] = useState('')
  const [menuMode, setMenuMode] = useState(null)
  const [showDelModal, setShowDelModal] = useState(false)
  const [deleteSong, setDeleteSong] = useState(null)
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
    setMenuMode({ orderBy: 'manual', sort: 'asc' })
  }
  const deleteSongHandler = async () => {
    try {
      let data = { action: 'delete', songId: deleteSong.songId }
      await updateSongInSongList(songListId, data)
      getListSong()
      setShowDelModal(false)
    } catch (e) {
      console.log('w')
    }
  }

  const openDelModal = (songData) => {
    setShowDelModal(true)
    setDeleteSong(songData)
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
          onDelete={openDelModal}
        />
      )}
      <SimpleComfirmModal
        show={showDelModal}
        title={'移除曲目'}
        confirmText='刪除'
        cancelText='取消'
        onConfirm={deleteSongHandler}
        onCancel={() => setShowDelModal(false)}
      >
        {deleteSong !== null ? `${deleteSong.name}` : ''}
      </SimpleComfirmModal>
    </>
  )
}
export default MySongList
