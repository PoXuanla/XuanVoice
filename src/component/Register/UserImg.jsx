import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Avatar, Alert } from '@mui/material'
import { grey } from '@mui/material/colors'
import { UserImage } from './RegisterStyle'


const UserImg = React.forwardRef((props, ref) => {
  const [userImagePreview, setUserImagePreview] = useState('') //圖片預覽 src
  const [userImageError, setUserImageError] = useState(null) //圖片錯誤訊息

  //判斷圖片大小是否 > 500kb
  const validImgSizeHandler = (e) => {
    if (ref.current.files[0]) {
      let file = ref.current.files[0]
      let fileLimit = 500000 //500kb
      if (file.size > fileLimit) {
        file = null
        setUserImageError('圖片需小於500kb')
        setUserImagePreview('')
      } else {
        setUserImageError(null)
        setPreviewImg(file)
      }
    }
  }
  //預覽圖片
  const setPreviewImg = (file) => {
    if (file) {
      setUserImagePreview(URL.createObjectURL(file))
    }
  }
  return (
    <UserImage userImagePreview={userImagePreview !== ''} userImageError={userImageError !== null}>
      {/* 照片預覽 */}
      <Avatar variant={'rounded'} alt='' src={userImagePreview} />
      {/* 圖片錯誤提示 */}
      <Alert variant='outlined' severity='error'>
        {userImageError}
      </Alert>
      {/* 上傳圖片按鈕 */}
      <label htmlFor='contained-button-file'>
        <input
          accept='image/*'
          id='contained-button-file'
          type='file'
          ref={ref}
          onChange={validImgSizeHandler}
        />
        <Button variant='outlined' component='span'>
          上傳大頭照
        </Button>
      </label>
    </UserImage>
  )
})
export default UserImg
