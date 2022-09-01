import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, Typography } from '@mui/material'
import { setSongCurrentTime, playSong } from '../../../slice/musicplayerSlice'
import { BottomProgressBar, ProgressBar, TimeBar } from './UtilsStyle'
const PlayerProgressBar = (props) => {
  //props
  const { player, color, showTime } = props
  //是否顯示 current Time & duration Time
  //useState
  const [durationToMin, setDurationToMin] = useState('') //convert Duration to 00:00 format
  const [currentTimeToMin, setCurrentTimeToMin] = useState(0) //convert currentTime to 00:00 format
  const [progressPercentage, setProgressPercentage] = useState('0%')
  const [flag, setFlag] = useState(false)
  //useRef
  const progressBarRef = useRef(null)
  //redux
  const { isPlay, songDuration, songCurrentTime } = useSelector((state) => state.musicplayer)
  const dispatch = useDispatch()

  //listenning currentTime when audio played
  useEffect(() => {
    let timer = null
    if (isPlay) {
      timer = setInterval(() => {
        dispatch(setSongCurrentTime(player.currentTime))
      }, 250)
    }
    return () => {
      clearInterval(timer)
    }
  }, [isPlay])
  //get music progress percentage
  useEffect(() => {
    let percentage = (Math.floor(songCurrentTime) / Math.floor(songDuration)) * 100
    if (percentage > 99) percentage = 100 //因為currentTime 跟 duration 會有誤差達不到100%，所以使用非常手段!
    setProgressPercentage(`${percentage}%`)
  }, [songCurrentTime])

  //convert duration to 00:00 format
  useEffect(() => {
    let time = convertTimeFormat(songDuration)
    setDurationToMin(time)
  }, [songDuration])

  //convert currentTime to 00:00 format
  useEffect(() => {
    let time = convertTimeFormat(songCurrentTime)
    setCurrentTimeToMin(time)
  }, [songCurrentTime])

  const convertTimeFormat = (seconds) => {
    let time = Math.floor(seconds)
    let min = Math.floor(time / 60)
    let sec = time - min * 60
    //個位數補零
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`
    return `${min} : ${sec}`
  }
  const progressMouseDown = (event) => {
    setFlag(true)
    let clientWidth = progressBarRef.current.clientWidth //元件總長
    let clickOffsetX = event.nativeEvent.offsetX //從元件起點到點擊位置的長度
    let newProgressPercentage = (clickOffsetX / clientWidth) * 100
    player.currentTime = songDuration * (newProgressPercentage / 100)
    dispatch(setSongCurrentTime(songDuration * (newProgressPercentage / 100)))
    setProgressPercentage(`${newProgressPercentage}%`)
  }
  const progressMouseMove = (event) => {
    if (flag) {
      let clientWidth = progressBarRef.current.clientWidth //元件總長
      let clickOffsetX = event.nativeEvent.offsetX //從元件起點到點擊位置的長度
      let newProgressPercentage = (clickOffsetX / clientWidth) * 100
      player.currentTime = songDuration * (newProgressPercentage / 100)
      dispatch(setSongCurrentTime(songDuration * (newProgressPercentage / 100)))
      setProgressPercentage(`${newProgressPercentage}%`)
    }
  }
  const progressMouseUp = (event) => {
    setFlag(false)
    dispatch(playSong())
    player.play()
  }

  return (
    <>
      {/* CurrentTime & DurationTime */}
      {showTime && (
        <TimeBar>
          <Typography variant='body2' fontSize={10}>
            {currentTimeToMin}
          </Typography>
          <Typography variant='body2' fontSize={10}>
            {durationToMin}
          </Typography>
        </TimeBar>
      )}

      {/* 播放底條 */}
      <BottomProgressBar
        ref={progressBarRef}
        onMouseDown={progressMouseDown}
        onMouseMove={progressMouseMove}
        onMouseUp={progressMouseUp}
      >
        {/* 播放進度條 */}
        <ProgressBar progressPercentage={progressPercentage} />

        {/* 播放圓形拖曳鈕 */}
        {/* <Box
          onMouseDown={dd}
          sx={{
            display: showUI ? "block" : "none",
            bgcolor: pink[500],
            left: progressPercentage,
            marginTop: "-6px",
            marginLeft: "-8px",
            position: "absolute",
            width: 16,
            height: 16,
            borderRadius: "50%",
          }}
        ></Box> */}
        {/* </Box> */}
      </BottomProgressBar>
    </>
  )
}
export default PlayerProgressBar
