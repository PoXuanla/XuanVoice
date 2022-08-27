import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Slider, Box } from '@mui/material'

import { blueGrey, pink } from '@mui/material/colors'
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
import { alpha, styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)(({ theme }) => ({
  padding: 0,
  width: 3,
  color: 'player.primary',
  '& input[type="range"]': {
    WebkitAppearance: 'slider-vertical'
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    '&:focus,&:hover,&.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 7px ${alpha(theme.palette.player.primary, 0.2)}`
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 15px ${alpha(theme.palette.player.primary, 0.4)}`
    },
    '&.MuiSlider-root': {
      padding: 0
    }
  }
}))

const PlayerFullBtn = (props) => {
  const player = props.player
  const { display, bgcolor } = props.css || {}
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
    <Box
      sx={{
        display: display || 'block',
        width: '100%',
        bgcolor: 'background.paper',
        padding: '15px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', transition: 'all .5s' }}>
        {/* 聲音 */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* 聲音按鈕 */}
          <IconButton size='large' onClick={toggleVolumeSlideHandler}>
            {volume === 0 ? (
              <VolumeOffIcon
                sx={{
                  fontSize: '25px',
                  color: 'player.background'
                }}
              />
            ) : (
              <VolumeDownIcon
                sx={{
                  fontSize: '25px',
                  color: 'player.primary'
                }}
              />
            )}
          </IconButton>
          {/* 聲音調整滑鈕 */}
          <Box
            sx={{
              display: showVolumeSlide ? 'block' : 'none',
              position: 'absolute',
              bottom: '90%',
              left: 15,
              height: 75,
              zIndex: 10,
              bgcolor: blueGrey[100],
              padding: '6px',
              borderRadius: '5px',
              boxShadow: '2px 2px 0px 2px rgba(0,0,0, 0.2)'
            }}
          >
            <CustomSlider
              max={1}
              min={0}
              step={0.05}
              orientation='vertical'
              value={volume}
              aria-label='Temperature'
              onChange={adjustVolumeHandler}
            />
            {/* <Slider
              // id="costInflation"
              // name="costInflation"
              sx={{
                color: 'player.secondary',
                padding: 0,
                width: 3,
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical'
                },
                '& .MuiSlider-thumb': {
                  height: 12,
                  width: 12,
                  backgroundColor: '#fff',
                  '&:focus,&:hover,&.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 7px ${alpha(theme.palette.success.main, 0.16)}`
                  },
                  '&.Mui-active': {
                    boxShadow: '0px 0px 0px 15px rgba(233, 30, 99, 0.4)'
                  }
                },
                '&.MuiSlider-root': {
                  padding: 0
                }
              }}
              max={1}
              min={0}
              step={0.05}
              orientation='vertical'
              value={volume}
              aria-label='Temperature'
              onChange={adjustVolumeHandler}
            /> */}
          </Box>
        </Box>
        {/* 前一首歌曲 */}
        <IconButton size='medium' onClick={prevSongHandler} disabled={currentSongIndex === 0}>
          <SkipPreviousIcon
            sx={{
              fontSize: '30px',
              color: currentSongIndex === 0 ? 'player.item.background' : 'player.primary'
            }}
          />
        </IconButton>
        {/* 播放/暫停 */}
        <IconButton size='medium' onClick={togglePlayHandler}>
          {!isPlay && (
            <PlayCircleIcon
              sx={{
                fontSize: '30px',
                color: 'player.primary'
              }}
            />
          )}
          {isPlay && (
            <PauseCircleIcon
              sx={{
                fontSize: '30px',
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
            fontSize='medium'
            sx={{
              fontSize: '30px',
              color: currentSongIndex === totalSongNum - 1 ? 'player.item.background' : 'player.primary'
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
      </Box>
    </Box>
  )
}
export default PlayerFullBtn
