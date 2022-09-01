import { useSelector, useDispatch } from 'react-redux'
import SongWatchList from '../SongWatchList/SongWatchList'
import { Wrapper } from './BrowseStyle'
import { useEffect, useState, useRef } from 'react'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { getBrowseSongs } from '../../api/song'
import { Button, Skeleton, Box } from '@mui/material'
import { PlagiarismTwoTone, PrintTwoTone } from '@mui/icons-material'
import useObserver from '../../hooks/useObserver'
import { replaceSongListData, openPlayer } from '../../slice/musicplayerSlice'

const SongList = ({ categoryId }) => {
  const dispatch = useDispatch()
  const nodeRef = useRef(null)

  const { isLoading } = useSelector((state) => state.load)

  const [songListData, setSongListData] = useState([])
  const [pageOfSongs, setPageOfSongs] = useState(1)
  const [morePageLoading, setMorePageLoading] = useState(false)
  const [hasNextSong, setHasNextSong] = useState(false)

  const intersected = useObserver(nodeRef)

  useEffect(() => {
    if (intersected) showMorePage()
  }, [intersected])

  useEffect(() => {
    initSongs(categoryId)
    setPageOfSongs(1)
    setHasNextSong(false)
  }, [categoryId])

  const initSongs = async (categoryId) => {
    try {
      dispatch(setLoading())
      const response = await getBrowseSongs(categoryId, 'latest', 1)
      setPageOfSongs((index) => index + 1)
      setSongListData(response.songs)
      setHasNextSong(response.hasNext)
      dispatch(clearLoading())
    } catch (e) {}
  }
  const showMorePage = async () => {
    try {
      setMorePageLoading(true)
      const response = await getBrowseSongs(categoryId, 'latest', pageOfSongs)
      const songs = response.songs
      setPageOfSongs((index) => index + 1)
      setSongListData((data) => [...data, ...songs])
      setMorePageLoading(false)
      setHasNextSong(response.hasNext)
    } catch (e) {}
  }
  const playAllMusic = () => {
    dispatch(replaceSongListData(songListData))
    dispatch(openPlayer())
  }
  return (
    <Wrapper>
      <Button variant='contained' color='error' onClick={playAllMusic} sx={{ mr: 0, mb: 2 }}>
        播放全部
      </Button>
      <SongWatchList songListData={songListData} mode='show' isLoading={isLoading} />
      {!morePageLoading ? (
        isLoading ? null : (
          <Button
            variant='contained'
            sx={{ mt: 2, display: hasNextSong && pageOfSongs === 2 ? 'inlineBlock' : 'none' }}
            onClick={showMorePage}
          >
            查看更多..
          </Button>
        )
      ) : (
        <Skeleton sx={{ width: '100%', height: 100 }} />
      )}
      <div
        ref={nodeRef}
        id='Watch'
        style={{
          height: 15,
          display: pageOfSongs >= 3 && !morePageLoading && hasNextSong ? 'block' : 'none'
        }}
      ></div>
    </Wrapper>
  )
}
export default SongList
