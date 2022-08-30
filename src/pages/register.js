import { Box, Container, TextField, Typography, Button, Avatar, Alert, Input } from '@mui/material'
import { useRef, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import { LoadingButton } from '@mui/lab'
import { grey } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../slice/authSlice'
import UserImg from '../component/Register/UserImg'
import RegisterFields from '../component/Register/RegisterFields'

import { Wrapper, RegisterAlert } from '../component/Register/RegisterStyle'
import { AssignmentReturn } from '@material-ui/icons'

const Register = (e) => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const { isLoading } = useSelector((state) => state.load)

  const accountRef = useRef(null)
  const passwordRef = useRef(null)
  const nameRef = useRef(null)
  const introRef = useRef(null)
  const imgRef = useRef(null)
  const fieldsRef = useRef({ accountRef, passwordRef, nameRef, introRef })

  const [registerError, setRegisterError] = useState(null) //註冊錯誤訊息

  //註冊
  const submitHandler = (e) => {
    const { accountRef, passwordRef, nameRef, introRef } = fieldsRef.current
    e.preventDefault()
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

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 5 }}>
      <Wrapper component='form' onSubmit={submitHandler}>
        {/* Title */}
        <Typography variant='h6'>註冊</Typography>
        {/* 註冊欄位 */}
        <RegisterFields ref={fieldsRef} />
        {/* 圖片 */}
        <UserImg ref={imgRef} />
        {/* 註冊按鈕 */}
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
        <RegisterAlert variant='outlined' severity='error' registerError={registerError !== null}>
          {registerError}
        </RegisterAlert>
      </Wrapper>
    </Container>
  )
}
export default Register
