import { Dialog, Box } from '@mui/material'
import { blueGrey, pink } from '@mui/material/colors'
import DialogPlayList from './DialogPlayList'
import DialogPlayer from './DialogPlayer'
import DialogHeader from './DialogHeader'
import { useEffect, useState } from 'react'
import useWindowSize from './useWindowSize'

const DialogMusicPlayer = (props) => {
  const openDialog = props.openDialog
  const player = props.player
  const [showPlayList, setShowPlayList] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(true)
  const [screenWidth] = useWindowSize()

  const closeDialogHandler = () => {
    props.closeDialog()
  }
  const toggleShowPlayListHandler = () => {
    if (screenWidth < 900) return
    setShowPlayList((state) => !state)
  }
  useEffect(() => {
    if (screenWidth < 900) {
      setShowMusicPlayer(false)
      setShowPlayList(true)
      return
    }
    setShowMusicPlayer(true)
  }, [screenWidth])
  return (
    <Dialog fullScreen open={openDialog}>
      {/* header */}
      <DialogHeader
        closeDialog={closeDialogHandler}
        showPlayList={showPlayList}
        toggleShowPlayList={toggleShowPlayListHandler}
      />
      {/* content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 74px)',
          bgcolor: 'background.default',
          padding: '15px 10px',
          transition: 'all .5s'
        }}
      >
        {/* 播放列表 */}
        {showPlayList && <DialogPlayList player={player} />}

        {/* 音樂播放器 */}
        {showMusicPlayer && <DialogPlayer showPlayList={showPlayList} player={player} />}
      </Box>
    </Dialog>
  )
}

export default DialogMusicPlayer
