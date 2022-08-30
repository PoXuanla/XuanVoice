import React, { useEffect, useState } from 'react'
import { TitleStyle, UploadBtnStyle } from './SongFormStyle'
import { Button, Typography, Alert } from '@mui/material'

const SongMp3 = React.forwardRef((props, ref) => {
  const { mode, song } = props

  const [uploadMp3Error, setUploadMp3Error] = useState(null) //上傳時的 mp3 錯誤
  const [uploadMp3Name, setUploadMp3Name] = useState(null) //上傳 mp3 名稱

  useEffect(() => {
    if (song) {
      setUploadMp3Name(`${song.name}.mp3`)
    }
  }, [song])

  //mp3大小超過5000kb,顯示錯誤
  const validMp3SizeHandler = (e) => {
    if (ref.current.files[0]) {
      let file = ref.current.files[0]
      let fileLimit = 5000000 //5000 kb
      if (file.size > fileLimit) {
        setUploadMp3Error('檔案最大限制5000kb')
        setUploadMp3Name('')
        ref.current.value = ''
      } else {
        setUploadMp3Error(null)
        setUploadMp3Name(file.name)
      }
    }
  }
  return (
    <>
      <TitleStyle uploadMp3Name={uploadMp3Name}>
        <Typography variant='subtitle1' className='title'>MP3</Typography>
        <Typography variant='subtitle1' className='title-mp3'>{uploadMp3Name}</Typography>
      </TitleStyle>

      <UploadBtnStyle mode={mode} uploadMp3Error={uploadMp3Error}>
        <label htmlFor='uploadMp3'>
          <input
            type='file'
            ref={ref}
            accept='audio/mp3'
            id='uploadMp3'
            onChange={validMp3SizeHandler}
          />
          <Button variant='contained' component='span'>
            上傳MP3
          </Button>
        </label>
        <Alert variant='outlined' severity='error'>
          {uploadMp3Error}
        </Alert>
      </UploadBtnStyle>
    </>
  )
})
export default SongMp3
