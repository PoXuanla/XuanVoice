import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Box, Typography, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllSongCategories } from '../../api/songCategory'
import SongCategorySelect from './SongCategorySelect'
import SongImage from './SongImage'
import SongMp3 from './SongMp3'
import SongInfo from './SongInfo'

const SongForm = (props) => {
  const { song = null, mode } = props
  // song (Object) => 歌曲資訊
  // mode (String) => 表單模式 ('create'、'update')

  const { isLoading } = useSelector((state) => state.load)

  const [selectSongCategory, setSelectSongCategory] = useState('') //已選擇的分類

  const mp3Ref = useRef(null) //mp3
  const imgRef = useRef(null) //圖片
  const nameRef = useRef(null) //歌名
  const introRef = useRef(null) //簡介
  const lyricRef = useRef(null) //歌詞
  const fieldsRef = useRef({ nameRef, introRef, lyricRef })
  
  useEffect(() => {
    if (song) {
      setSelectSongCategory(song.songCategory._id)
    }
  }, [song])

  // 選擇歌曲分類
  const selectSongCategoryHandler = (value) => {
    setSelectSongCategory(value)
  }
  // 執行更新或新建
  const submitHandler = (e) => {
    e.preventDefault()
    const { nameRef, introRef, lyricRef } = fieldsRef.current
    //新建歌單時，必須 upload mp3
    if (mp3Ref.current.files[0] === undefined && mode === 'create') {
      setUploadMp3Error('要填入MP3唷 (つ´ω`)つ')
      return
    }
    var formData = new FormData()
    formData.append('name', nameRef.current.value)
    formData.append('songCategory', selectSongCategory)
    formData.append('intro', introRef.current.value)
    formData.append('lyric', lyricRef.current.value)

    if (mp3Ref.current.files[0] !== undefined) formData.append('mp3', mp3Ref.current.files[0])
    if (imgRef.current.files[0] !== undefined) formData.append('img', imgRef.current.files[0])
    props.onSubmit(formData)
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        {/* 圖片 */}
        <SongImage ref={imgRef} song={song} />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Box sx={{ paddingLeft: 2 }} component='form' onSubmit={submitHandler}>
          {/* Mp3 */}
          <SongMp3 mode={mode} song={song} ref={mp3Ref} />
          {/* 歌曲資訊 */}
          <SongInfo ref={fieldsRef} song={song} />
          {/* 歌曲分類 */}
          <SongCategorySelect
            selectSongCategory={selectSongCategory}
            selectSongCategoryHandler={selectSongCategoryHandler}
          />
          {/* submit 按鈕 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <LoadingButton
              color='primary'
              loading={isLoading}
              loadingPosition='start'
              startIcon={mode === 'update' ? <EditIcon /> : <AddCircleIcon />}
              variant='contained'
              type='submit'
            >
              {mode === 'update' ? '更新' : '建立'}
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default SongForm
