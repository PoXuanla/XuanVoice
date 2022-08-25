import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {
  Avatar,
  Alert,
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllSongCategories } from '../../../api/songCategory'
const SongForm = (props) => {
  const { song = null, mode } = props
  // song (Object) => 歌曲資訊
  // mode (String) => 表單模式 ('create'、'update')
  
  const { isLoading } = useSelector((state) => state.load)

  const [songCategories, setSongCategories] = useState(null) //全部的歌曲分類
  const [songImageError, setSongImageError] = useState(null) //圖片錯誤訊息
  const [songImagePreview, setSongImagePreview] = useState('') //圖片預覽 src
  const [uploadMp3Name, setUploadMp3Name] = useState(null) //上傳 mp3 名稱
  const [uploadMp3Error, setUploadMp3Error] = useState(null) //上傳時的 mp3 錯誤
  const [selectSongCategory, setSelectSongCategory] = useState('') //已選擇的分類
  const [songName, setSongName] = useState('') //歌名
  const [intro, setIntro] = useState('') //簡介
  const [lyric, setLyric] = useState('') //歌詞
  const mp3Ref = useRef(null) //mp3
  const imgRef = useRef(null) //圖片

  //mode = update , 顯示歌曲訊息
  useEffect(() => {
    if (song) {
      if (song.image) setSongImagePreview(song.image)
      if (song.name) setSongName(song.name)
      if (song.intro) setIntro(song.intro)
      if (song.lyric) setLyric(song.lyric)

      setUploadMp3Name(`${song.name}.mp3`)
      setSelectSongCategory(song.songCategory._id)
    }
  }, [song])

  //取得全部的歌曲分類
  useEffect(async () => {
    await getAllSongCategories().then((response) => {
      setSongCategories(response.SongCategory)
    })
  }, [])

  // 預覽圖片
  const setPreviewImg = (file) => {
    if (file) {
      setSongImagePreview(URL.createObjectURL(file))
    }
  }
  // 圖片大小 >=  500kb 顯示錯誤
  const validImgSizeHandler = (e) => {
    if (imgRef.current.files[0]) {
      let file = imgRef.current.files[0]
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
  // 選擇歌曲分類
  const selectSongCategoryHandler = (event) => {
    setSelectSongCategory(event.target.value)
  }
  //mp3大小超過5000kb,顯示錯誤
  const validMp3SizeHandler = (e) => {
    if (mp3Ref.current.files[0]) {
      let file = mp3Ref.current.files[0]
      console.log(file)
      let fileLimit = 5000000 //5000 kb
      if (file.size > fileLimit) {
        console.log(file.size)
        setUploadMp3Error('檔案最大限制5000kb')
        setUploadMp3Name('')
        mp3Ref.current.value = ''
      } else {
        setUploadMp3Error('')
        setUploadMp3Name(file.name)
      }
    }
  }
  // 執行更新或新建
  const submitHandler = (e) => {
    e.preventDefault()
    //新建歌單時，必須 upload mp3
    if (mp3Ref.current.files[0] === undefined && mode === 'create') {
      setUploadMp3Error('要填入MP3唷 (つ´ω`)つ')
      return
    }
    var formData = new FormData()
    formData.append('name', songName)
    formData.append('songCategory', selectSongCategory)
    formData.append('intro', intro)
    formData.append('lyric', lyric)

    if (mp3Ref.current.files[0] !== undefined) formData.append('mp3', mp3Ref.current.files[0])
    if (imgRef.current.files[0] !== undefined) formData.append('img', imgRef.current.files[0])
    props.onSubmit(formData)
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 0,
              paddingBottom: '100%',
              position: 'relative',
              marginBottom: 2
            }}
          >
            {/* 圖片預覽 */}
            <Avatar
              variant='rounded'
              src={
                songImagePreview.includes('blob')
                  ? songImagePreview
                  : `${songImagePreview}?${Math.random()}`
              }
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            ></Avatar>
          </Box>
          {/* 圖片錯誤提示 */}
          <Alert
            variant='outlined'
            severity='error'
            sx={{ display: songImageError ? 'flex' : 'none', marginBottom: '15px' }}
          >
            {songImageError}
          </Alert>
          {/* 圖片 input、按鈕 */}
          <label htmlFor='contained-button-file'>
            <input
              accept='image/*'
              id='contained-button-file'
              type='file'
              ref={imgRef}
              onChange={validImgSizeHandler}
              style={{ display: 'none' }}
            />

            <Button
              variant='contained'
              component='span'
              sx={{
                marginBottom: '15px',
                padding: 1
              }}
            >
              上傳圖片
            </Button>
          </label>
        </Box>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Box sx={{ paddingLeft: 2 }} component='form' onSubmit={submitHandler}>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, marginBottom: 2, color: 'text.primary' }}
          >
            MP3
          </Typography>
          {/* MP3上傳後的檔名 */}
          <Typography
            variant='body1'
            sx={{
              marginBottom: 2,
              display: uploadMp3Name ? 'block' : 'none',
              color: 'text.primary'
            }}
          >
            {uploadMp3Name}
          </Typography>
          {/* 上傳Mp3 input、按鈕 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}
          >
            <label htmlFor='uploadMp3'>
              <input
                type='file'
                ref={mp3Ref}
                accept='audio/mp3'
                id='uploadMp3'
                onChange={validMp3SizeHandler}
                style={{ display: 'none' }}
              />
              <Button
                variant='contained'
                component='span'
                sx={{
                  padding: 1,
                  display: mode === 'update' ? 'none' : 'block'
                }}
              >
                上傳MP3
              </Button>
            </label>
            <Alert
              variant='outlined'
              severity='error'
              sx={{ display: uploadMp3Error ? 'flex' : 'none' }}
            >
              {uploadMp3Error}
            </Alert>
          </Box>

          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, marginBottom: 2, color: 'text.primary' }}
          >
            歌曲資訊
          </Typography>
          <TextField
            required
            id='outlined-required'
            label='歌名'
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            sx={{ width: '100%', marginBottom: 2 }}
          />
          <Grid container spacing={2}>
            {/* 歌曲介紹 */}
            <Grid item xs={12} sm={6}>
              <TextField
                id='filled-multiline-static'
                label='歌曲介紹'
                multiline
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                rows={4}
                sx={{ width: '100%' }}
              />
            </Grid>
            {/* 歌詞介紹 */}
            <Grid item xs={12} sm={6}>
              <TextField
                id='filled-multiline-static'
                label='歌詞介紹'
                multiline
                value={lyric}
                onChange={(e) => setLyric(e.target.value)}
                rows={4}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 700, marginBottom: 2, mt: 2, color: 'text.primary' }}
          >
            歌曲狀態
          </Typography>
          {/* 歌曲分類 */}
          {
            <FormControl required sx={{ width: '100%' }}>
              <InputLabel id='selectLabel'>分類</InputLabel>
              <Select
                labelId='selectLabel'
                id='simpleSelect'
                defaultValue=''
                value={selectSongCategory}
                label='分類'
                onChange={selectSongCategoryHandler}
              >
                {songCategories
                  ? songCategories.map((data, index) => {
                      return (
                        <MenuItem key={index} value={data._id}>
                          {data.name}
                        </MenuItem>
                      )
                    })
                  : null}
              </Select>
            </FormControl>
          }
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
