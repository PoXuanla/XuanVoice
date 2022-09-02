import React, { useState, useRef,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Typography, Alert, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
import { login } from '../slice/authSlice'
import { LoginAlert, Wrapper, MoveToRegister } from '../component/Login/LoginStyle'
import LoginFields from '../component/Login/LoginFields'

const Login = () => {
  const { isLoading } = useSelector((state) => state.load)
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const accountRef = useRef(null)
  const passwordRef = useRef(null)
  const fieldsRef = useRef({ accountRef, passwordRef })

  const [loginError, setLoginError] = useState('')

  //登入
  const submitHandler = (event) => {
    event.preventDefault()
    const { accountRef, passwordRef } = fieldsRef.current

    const account = accountRef.current.value
    const password = passwordRef.current.value

    dispatch(login({ account, password }))
      .unwrap()
      .then(() => {
        navigator('/')
      })
      .catch((err) => {
        setLoginError(err.message)
      })
  }
  //已登入就跳轉主頁
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') navigator('/')
  })
  return (
    <Container maxWidth='xs'>
      <Wrapper component='form' onSubmit={submitHandler}>
        {/* Title */}
        <Typography variant='h6' className='title'>
          歡迎使用XuanVoice
        </Typography>

        {/* 登入欄位 */}
        <LoginFields ref={fieldsRef} />

        {/* 錯誤提示 */}
        <LoginAlert loginError={loginError}>
          <Alert severity='error'>{loginError}</Alert>
        </LoginAlert>

        {/* 登入按鈕 */}
        <LoadingButton
          color='primary'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<LoginIcon />}
          variant='contained'
          type='submit'
        >
          登入
        </LoadingButton>
      </Wrapper>

      {/* 前往註冊 */}
      <MoveToRegister>
        <Typography variant='body1'>還沒註冊嘛?立即</Typography>
        <Button variant='contained' component={Link} to='/register'>
          註冊
        </Button>
      </MoveToRegister>
    </Container>
  )
}
export default Login
