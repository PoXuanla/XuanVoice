import styled from '@emotion/styled'
import { Typography, Box, Alert } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  '& .MuiTypography-h6': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  '& .MuiTextField-root': {
    width: '60%',
    marginBottom: theme.spacing(2)
  }
}))
export const RegisterAlert = styled(Alert, {
  shouldForwardProp: (prop) => prop !== 'registerError'
})(({ theme, registerError }) => ({
  display: registerError ? 'flex' : 'none',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}))
