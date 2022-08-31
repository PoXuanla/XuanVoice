import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import PlayerTopBtn from './PlayerTopBtn'
import PlayerSimpleBtn from './PlayerSimpleBtn'
import MusicImg from '../utils/MusicImg'
import MusicInfo from '../utils/MusicInfo'
import PlayerFullBtn from '../utils/PlayerFullBtn'
import PlayerProgressBar from '../utils/PlayerProgressBar'
import {
  WebPlayerContainer,
  WebPlayerWrapper,
  MusicImgStyle,
  MusicInfoStyle,
  PlayerProgressBarStyle
} from './WebPlayerStyle'
const WebPlayer = (props) => {
  const player = props.player
  const { mode } = useSelector((state) => state.mode)

  const [showUI, setShowUI] = useState(false) //UI是否展開
  const dispatch = useDispatch()
  const { songListData } = useSelector((state) => state.musicplayer)

  useEffect(() => {
    // dispatch(replaceSongListData(data))
  }, [])

  useEffect(() => {
    if (songListData.length === 0) return
    player.src = songListData[0].mp3
    player.play()
  }, [songListData])

  const showUIHandler = () => {
    setShowUI((show) => !show)
  }
  const openDialogHandler = () => {
    props.openDialog()
  }
  return (
    <WebPlayerContainer showUI={showUI}>

      <WebPlayerWrapper showUI={showUI}>

        {/* 音樂時間軸 */}
        <PlayerProgressBarStyle showUI={showUI}>
          <PlayerProgressBar showTime={showUI} player={player} color='text.primary' />
        </PlayerProgressBarStyle>

        {/* 歌曲圖片 */}
        <MusicImgStyle showUI={showUI}>
          <MusicImg />
        </MusicImgStyle>

        {/* 歌名、作者、喜歡、加入歌單 */}
        <MusicInfoStyle showUI={showUI}>
          <MusicInfo showBtn={showUI} />
        </MusicInfoStyle>

        {/* 沒 show 時的播放、show 按鈕 */}
        <PlayerSimpleBtn showUI={showUI} player={player} showUIHandler={showUIHandler} />
      
        {/* show 時最上層的按鈕 */}
        <PlayerTopBtn
          showUI={showUI}
          showUIHandler={showUIHandler}
          openDialog={openDialogHandler}
        />
      </WebPlayerWrapper>
      
      {/* show 時最底下的音樂控制按鈕*/}
      <PlayerFullBtn showUI={showUI} player={player} />
    </WebPlayerContainer>
  )
}
export default WebPlayer
