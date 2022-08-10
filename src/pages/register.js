import { Box, Container, TextField, Typography, Button, Avatar, Alert, Input } from '@mui/material'
import { useRef, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import { LoadingButton } from '@mui/lab'
import { grey } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../slice/authSlice'

const Register = (e) => {
  const accountRef = useRef(null)
  const passwordRef = useRef(null)
  const nameRef = useRef(null)
  const introRef = useRef(null)
  const imgRef = useRef(null)
  const [userImageError, setUserImageError] = useState(null) //圖片錯誤訊息
  const [userImagePreview, setUserImagePreview] = useState('') //圖片預覽 src
  const [registerError, setRegisterError] = useState(null) //圖片錯誤訊息

  const dispatch = useDispatch()
  const navigator = useNavigate()

  const { isLoading } = useSelector((state) => state.load)

  const submitHandler = (e) => {
    e.preventDefault()
    setUserImagePreview('')
    var formData = new FormData()
    formData.append('account', accountRef.current.value)
    formData.append('password', passwordRef.current.value)
    formData.append('name', nameRef.current.value)
    if (introRef.current.value !== '') formData.append('intro', introRef.current.value)
    if (imgRef.current.files[0] !== undefined) formData.append('image', imgRef.current.files[0])

    dispatch(register(formData))
      .unwrap()
      .then(() => {
        navigator('/', { replace: true })
      })
      .catch((err) => {
        setRegisterError(err.message)
      })
  }
  const fileHandler = (e) => {
    if (imgRef.current.files[0]) {
      let file = imgRef.current.files[0]
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
  const setPreviewImg = (file) => {
    if (file) {
      setUserImagePreview(URL.createObjectURL(file))
    }
  }
  return (
    <Container maxWidth='xs' sx={{ paddingTop: '50px', paddingBottom: '20px' }}>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10px',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
          bgcolor: 'content'
        }}
        onSubmit={submitHandler}
      >
        <Typography
          variant='h6'
          sx={{
            marginTop: '15px',
            marginBottom: '15px',
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          註冊
        </Typography>
        <TextField
          id='account'
          label='帳號'
          size='small'
          required
          autoComplete='off'
          inputProps={{ minLength: 6 }}
          inputRef={accountRef}
          sx={{
            width: '60%',
            marginBottom: '15px'
          }}
        />
        <TextField
          id='password'
          label='密碼'
          required
          size='small'
          autoComplete='off'
          inputRef={passwordRef}
          inputProps={{ minLength: 6 }}
          sx={{
            width: '60%',
            marginBottom: '15px'
          }}
        />
        <TextField
          id='name'
          label='暱稱'
          required
          size='small'
          type='password'
          autoComplete='off'
          inputRef={nameRef}
          inputProps={{ minLength: 2 }}
          sx={{
            width: '60%',
            marginBottom: '15px'
          }}
        />
        <TextField
          id='intro'
          label='自我介紹'
          multiline
          inputRef={introRef}
          sx={{
            width: '60%',
            marginBottom: '15px'
          }}
        />
        {/* 照片預覽 */}
        <Avatar
          variant={'rounded'}
          alt=''
          src={userImagePreview}
          sx={{
            width: 150,
            height: 150,
            background: grey[200],
            marginBottom: '15px',
            display: userImagePreview ? 'block' : 'none'
          }}
        />
        {/* 圖片錯誤提示 */}
        <Alert
          variant='outlined'
          severity='error'
          sx={{ display: userImageError ? 'flex' : 'none', marginBottom: '15px' }}
        >
          {userImageError}
        </Alert>
        {/* 上傳圖片按鈕 */}
        <label htmlFor='contained-button-file'>
          <input
            accept='image/*'
            id='contained-button-file'
            type='file'
            ref={imgRef}
            onChange={fileHandler}
            style={{ display: 'none' }}
          />
          <Button
            variant='outlined'
            component='span'
            sx={{
              marginBottom: '15px'
            }}
          >
            上傳大頭照
          </Button>
        </label>
        <LoadingButton
          color='primary'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<LoginIcon />}
          variant='contained'
          type='submit'
        >
          註冊
        </LoadingButton>
        {/* 註冊錯誤提示 */}
        <Alert
          variant='outlined'
          severity='error'
          sx={{ display: registerError ? 'flex' : 'none', marginTop: '15px', marginBottom: '15px' }}
        >
          {registerError}
        </Alert>
      </Box>
    </Container>
  )
}
export default Register
