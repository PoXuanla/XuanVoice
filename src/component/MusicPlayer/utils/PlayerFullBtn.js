import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, ClickAwayListener } from '@mui/material'

import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import LoopIcon from '@mui/icons-material/Loop'

import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import data from '../data'
import {
  prevSong,
  nextSong,
  playSong,
  pauseSong,
  changePlayMode,
  adjustVolume
} from '../../../slice/musicplayerSlice'
import {
  FullBtnContainer,
  FullBtnWrapper,
  VoiceContainer,
  SlideContainer,
  CustomSlider
} from './UtilsStyle'

const PlayerFullBtn = (props) => {
  const player = props.player
  const { showUI } = props
  const [showVolumeSlide, setShowVolumeSlide] = useState(false)
  const [totalSongNum, setTotalSongNum] = useState(null)
  const { isPlay, currentSongIndex, songListData, playMode, playModeIndex, volume } = useSelector(
    (state) => state.musicplayer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    setTotalSongNum(songListData.length)
  }, [songListData])

  const togglePlayHandler = () => {
    if (isPlay) {
      dispatch(pauseSong())
      player.pause()
    } else {
      dispatch(playSong())
      player.play()
    }
  }
  const toggleVolumeSlideHandler = () => {
    setShowVolumeSlide((show) => !show)
  }
  const closeVolumeSlideHandler = () => {
    setShowVolumeSlide(false)
    console.log('click')
  }
  const adjustVolumeHandler = (e, value) => {
    player.volume = value
    dispatch(adjustVolume(value))
  }
  const prevSongHandler = () => {
    player.src = songListData[currentSongIndex - 1].mp3
    player.play()
    dispatch(prevSong())
    dispatch(playSong())
  }
  const nextSongHandler = () => {
    player.src = songListData[currentSongIndex + 1].mp3
    player.play()
    dispatch(nextSong())
    dispatch(playSong())
  }
  const changePlayModeHandler = () => {
    dispatch(changePlayMode())
    // if (playMode === 'normal') setPlayMode('loop')
    //else setPlayMode('normal')
  }
  return (
    <FullBtnContainer showUI={showUI}>
      <FullBtnWrapper>
        {/* 聲音 */}
        <VoiceContainer>
          {/* 聲音按鈕 */}
          <IconButton size='medium' onClick={toggleVolumeSlideHandler}>
            {volume === 0 ? (
              <VolumeOffIcon className='closeVoiceBtn' />
            ) : (
              <VolumeDownIcon className='openVoiceBtn' />
            )}
          </IconButton>
          {/* 聲音調整滑鈕 */}
          {showVolumeSlide && (
            <ClickAwayListener onClickAway={closeVolumeSlideHandler}>
              <SlideContainer showVolumeSlide={showVolumeSlide}>
                <CustomSlider
                  max={1}
                  min={0}
                  step={0.05}
                  orientation='vertical'
                  value={volume}
                  aria-label='Temperature'
                  onChange={adjustVolumeHandler}
                />
              </SlideContainer>
            </ClickAwayListener>
          )}
        </VoiceContainer>
        {/* 前一首歌曲 */}
        <IconButton size='medium' onClick={prevSongHandler} disabled={currentSongIndex === 0}>
          <SkipPreviousIcon
            sx={{
              color: currentSongIndex === 0 ? 'player.item.background' : 'player.primary'
            }}
          />
        </IconButton>
        {/* 播放/暫停 */}
        <IconButton size='medium' onClick={togglePlayHandler}>
          {!isPlay && (
            <PlayCircleIcon
              sx={{
                color: 'player.primary'
              }}
            />
          )}
          {isPlay && (
            <PauseCircleIcon
              sx={{
                color: 'player.primary'
              }}
            />
          )}
        </IconButton>
        <IconButton
          size='medium'
          onClick={nextSongHandler}
          disabled={currentSongIndex === totalSongNum - 1}
        >
          <SkipNextIcon
            sx={{
              color:
                currentSongIndex === totalSongNum - 1 ? 'player.item.background' : 'player.primary'
            }}
          />
        </IconButton>
        <IconButton size='medium' onClick={changePlayModeHandler}>
          {playMode[playModeIndex] === 'normal' ? (
            <LoopIcon
              fontSize='medium'
              sx={{
                fontSize: '30px',
                color: 'player.item.background'
              }}
            ></LoopIcon>
          ) : (
            <LoopIcon
              fontSize='medium'
              sx={{
                fontSize: '30px',

                color: 'player.primary'
              }}
            ></LoopIcon>
          )}
        </IconButton>
      </FullBtnWrapper>
    </FullBtnContainer>
  )
}
export default PlayerFullBtn
