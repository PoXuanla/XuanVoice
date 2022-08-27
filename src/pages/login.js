import { Box, Container, TextField, Typography, Alert, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
import React, { useEffect, useState } from 'react'
import { login, validAccessToken } from '../slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const { isLoading } = useSelector((state) => state.load)
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  //登入
  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(login({ account, password }))
      .unwrap()
      .then(() => {
        navigator('/')
      })
      .catch((err) => {
        setLoginError(err.message)
      })
  }
  const changeAccountHandler = (e) => {
    setAccount(e.target.value)
  }
  const changePasswordHandler = (e) => {
    setPassword(e.target.value)
  }
  return (
    <Container maxWidth='xs'>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10px',
          marginTop: '50px',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
          borderRadius: 2,
          bgcolor: 'background.paper'
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
          歡迎使用XuanVoice
        </Typography>
        <TextField
          id='account'
          label='帳號'
          required
          autoComplete='off'
          inputProps={{ minLength: 6 }}
          onChange={changeAccountHandler}
          sx={{
            width: '85%',
            marginBottom: '15px'
          }}
        />
        <TextField
          id='password'
          label='密碼'
          required
          type='password'
          autoComplete='off'
          inputProps={{ minLength: 6 }}
          onChange={changePasswordHandler}
          sx={{
            width: '85%'
          }}
        />
        <Box
          sx={{
            width: '85%',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Alert
            severity='error'
            sx={{
              display: loginError === '' ? 'none' : 'flex'
            }}
          >
            {loginError}
          </Alert>
        </Box>

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
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'right', marginTop: '35px', alignItems: 'center' }}
      >
        <Typography variant='body1' sx={{ paddingRight: '10px', color: 'text.secondary' }}>
          還沒註冊嘛?立即
        </Typography>
        <Button variant='contained' component={Link} to='/register'>
          註冊
        </Button>
      </Box>
    </Container>
  )
}
export default Login
