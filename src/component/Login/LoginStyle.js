import styled from '@emotion/styled'
import { Typography, Box, Alert } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginTop: theme.spacing(5),
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  '& .title': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  '& .MuiTextField-root': {
    width: '85%',
    marginBottom: theme.spacing(2)
  }
}))
export const LoginAlert = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'loginError'
})(({ theme, loginError }) => ({
  width: '85%',
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiAlert-root': {
    display: loginError !== '' ? 'flex' : 'none'
  }
}))
export const MoveToRegister = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
  marginTop: theme.spacing(4),

  '& .MuiTypography-root': {
    paddingRight: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))
