import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Alert, Button } from '@mui/material'
import { ImageWrapper } from './SongFormStyle'

const SongImage = React.forwardRef((props, ref) => {
  const song = props.song
  const [songImageError, setSongImageError] = useState(null) //圖片錯誤訊息
  const [songImagePreview, setSongImagePreview] = useState('') //圖片預覽 src

  useEffect(() => {
    if (song !== null) setSongImagePreview(song.image)
  }, [song])

  // 預覽圖片
  const setPreviewImg = (file) => {
    if (file) {
      setSongImagePreview(URL.createObjectURL(file))
    }
  }
  // 圖片大小 >=  500kb 顯示錯誤
  const validImgSizeHandler = (e) => {
    if (ref.current.files[0]) {
      let file = ref.current.files[0]
      let fileLimit = 500000 //500kb
      if (file.size > fileLimit) {
        file = null
        setSongImageError('圖片需小於500kb')
        setSongImagePreview('')
      } else {
        setSongImageError(null)
        setPreviewImg(file)
      }
    }
  }
  return (
    <ImageWrapper songImageError={songImageError}>
      {/* 圖片預覽 */}
      <Avatar
        variant='rounded'
        src={
          songImagePreview.includes('blob')
            ? songImagePreview
            : songImagePreview
        }
      ></Avatar>
      {/* 圖片錯誤提示 */}
      <Alert variant='outlined' severity='error'>
        {songImageError}
      </Alert>
      {/* 圖片 input、按鈕 */}
      <label htmlFor='contained-button-file'>
        <input
          accept='image/*'
          id='contained-button-file'
          type='file'
          ref={ref}
          onChange={validImgSizeHandler}
          style={{ display: 'none' }}
        />

        <Button variant='contained' component='span'>
          上傳圖片
        </Button>
      </label>
    </ImageWrapper>
  )
})
export default SongImage
