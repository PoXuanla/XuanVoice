import {
  Avatar,
  Alert,
  Grid,
  Button,
  Box,
  Divider,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { setLoading, clearLoading } from '../../slice/loadSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SongForm from '../../component/manage/mySong/SongForm'
import { createSong } from '../../api/song'
import { getAllSongCategories } from '../../api/songCategory'

const UploadMySong = () => {
  const [songCategory, setSongCategory] = useState(null)
  const [selectSongCategory, setSelectSongCategory] = useState('')
  const [songImageError, setSongImageError] = useState(null) //圖片錯誤訊息
  const [songImagePreview, setSongImagePreview] = useState('') //圖片預覽 src
  const [uploadMp3Name, setUploadMp3Name] = useState(null)
  const [uploadMp3Error, setUploadMp3Error] = useState(null)
  const songNameRef = useRef(null)
  const introRef = useRef(null)
  const lyricRef = useRef(null)
  const mp3Ref = useRef(null)
  const imgRef = useRef(null)
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const navigate = useNavigate()
  useEffect(async () => {
    await getAllSongCategories().then((data) => {
      setSongCategory(data.SongCategory)
    })
  }, [])
  const mp3ChangeHandler = (e) => {
    if (mp3Ref.current.files[0]) {
      let file = mp3Ref.current.files[0]
      console.log(file)
      let fileLimit = 5000000 //5000 kb
      if (file.size > fileLimit) {
        console.log(file.size)
        setUploadMp3Error('檔案最大限制5000kb')
        setUploadMp3Name('')
        file = null
      } else {
        setUploadMp3Error('')
        setUploadMp3Name(file.name)
      }
    }
  }
  const setPreviewImg = (file) => {
    if (file) {
      setSongImagePreview(URL.createObjectURL(file))
    }
  }
  const fileHandler = (e) => {
    if (imgRef.current.files[0]) {
      let file = imgRef.current.files[0]
      console.log(file)
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
  const songCategoryHandler = (event) => {
    console.log(event.target.value)
    setSelectSongCategory(event.target.value)
  }
  const submitHandler = async (formData) => {
    dispatch(setLoading())
    await createSong(formData).then(() => {
      dispatch(clearLoading())
      navigate('/manage/song', { replace: true })
    })
    // const accessToken = localStorage.getItem('accessToken')
    // try {
    //   const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/songs`, formData, {
    //     headers: {
    //       'Content-Type': `multipart/form-data;`,
    //       Authorization: `Bearer ${accessToken}`
    //     } // find user and return all fields except password
    //   })
    //   console.log(response.data)
    //   // dispatch(clearLoading())
    //   // navigate('/manage/song')
    // } catch (e) {
    //   console.log(e)
    // }
  }
  return (
    <SongForm mode={'create'} onSubmit={submitHandler}></SongForm>

    // <Grid container>
    //   <Grid item xs={12} sm={3}>
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         justifyContent: 'center',
    //         alignItems: 'center'
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           width: '100%',
    //           height: 0,
    //           paddingBottom: '100%',
    //           position: 'relative',
    //           marginBottom: 2
    //         }}
    //       >
    //         <Avatar
    //           variant='rounded'
    //           src={songImagePreview}
    //           sx={{
    //             width: '100%',
    //             height: '100%',
    //             position: 'absolute',
    //             top: 0,
    //             left: 0
    //           }}
    //         ></Avatar>
    //       </Box>
    //       {/* 圖片錯誤提示 */}
    //       <Alert
    //         variant='outlined'
    //         severity='error'
    //         sx={{ display: songImageError ? 'flex' : 'none', marginBottom: '15px' }}
    //       >
    //         {songImageError}
    //       </Alert>
    //       <label htmlFor='contained-button-file'>
    //         <input
    //           accept='image/*'
    //           id='contained-button-file'
    //           type='file'
    //           ref={imgRef}
    //           onChange={fileHandler}
    //           style={{ display: 'none' }}
    //         />

    //         <Button
    //           variant='outlined'
    //           component='span'
    //           sx={{
    //             marginBottom: '15px',
    //             padding: 1
    //           }}
    //         >
    //           上傳圖片
    //         </Button>
    //       </label>
    //     </Box>
    //   </Grid>
    //   <Grid item xs={12} sm={9}>
    //     <Box sx={{ paddingLeft: 2 }} component='form' onSubmit={submitHandler}>
    //       <Typography variant='h6' sx={{ fontWeight: 700, marginBottom: 2 }}>
    //         MP3
    //       </Typography>
    //       <Typography
    //         variant='h6'
    //         sx={{ marginBottom: 2, display: uploadMp3Name ? 'block' : 'none' }}
    //       >
    //         {uploadMp3Name}
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'space-between',
    //           marginBottom: '15px'
    //         }}
    //       >
    //         <label htmlFor='uploadMp3'>
    //           <input
    //             type='file'
    //             ref={mp3Ref}
    //             accept='audio/mp3'
    //             id='uploadMp3'
    //             onChange={mp3ChangeHandler}
    //             style={{ display: 'none' }}
    //           />
    //           <Button
    //             variant='outlined'
    //             component='span'
    //             sx={{
    //               padding: 1
    //             }}
    //           >
    //             上傳MP3
    //           </Button>
    //         </label>
    //         <Alert
    //           variant='outlined'
    //           severity='error'
    //           sx={{ display: uploadMp3Error ? 'flex' : 'none' }}
    //         >
    //           {uploadMp3Error}
    //         </Alert>
    //       </Box>

    //       <Typography variant='h6' sx={{ fontWeight: 700, marginBottom: 2 }}>
    //         歌曲資訊
    //       </Typography>
    //       <TextField
    //         required
    //         id='outlined-required'
    //         label='歌名'
    //         inputRef={songNameRef}
    //         sx={{ width: '100%', marginBottom: 2 }}
    //       />
    //       <Grid container spacing={2}>
    //         <Grid item xs={12} sm={6}>
    //           <TextField
    //             id='filled-multiline-static'
    //             label='歌曲介紹'
    //             multiline
    //             inputRef={introRef}
    //             rows={4}
    //             sx={{ width: '100%' }}
    //           />
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //           <TextField
    //             id='filled-multiline-static'
    //             label='歌詞介紹'
    //             multiline
    //             inputRef={lyricRef}
    //             rows={4}
    //             sx={{ width: '100%' }}
    //           />
    //         </Grid>
    //       </Grid>
    //       <Typography variant='h6' sx={{ fontWeight: 700, marginBottom: 2 }}>
    //         歌曲狀態
    //       </Typography>
    //       {
    //         <FormControl required sx={{ width: '100%' }}>
    //           <InputLabel id='selectLabel'>分類</InputLabel>
    //           <Select
    //             labelId='selectLabel'
    //             id='simpleSelect'
    //             value={selectSongCategory}
    //             label='分類'
    //             onChange={songCategoryHandler}
    //           >
    //             {songCategory
    //               ? songCategory.map((data, index) => {
    //                   console.log(data)
    //                   return (
    //                     <MenuItem key={index} value={data._id}>
    //                       {data.name}
    //                     </MenuItem>
    //                   )
    //                 })
    //               : null}
    //           </Select>
    //         </FormControl>
    //       }
    //       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
    //         <LoadingButton
    //           color='primary'
    //           loading={isLoading}
    //           loadingPosition='start'
    //           startIcon={<AddCircleIcon />}
    //           variant='contained'
    //           type='submit'
    //         >
    //           建立
    //         </LoadingButton>
    //       </Box>
    //     </Box>
    //   </Grid>
    // </Grid>
  )
}
export default UploadMySong
