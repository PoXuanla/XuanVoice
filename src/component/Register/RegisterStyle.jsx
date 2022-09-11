import styled from '@emotion/styled'
import { Typography, Box, Alert } from '@mui/material'
import { grey } from '@mui/material/colors'

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

export const UserImage = styled('div', {
  shouldForwardProp: (prop) => prop !== 'userImagePreview' && prop !== 'userImageError'
})(({ theme, userImagePreview, userImageError }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiAvatar-root': {
    width: 150,
    height: 150,
    backgroundColor: grey[200],
    marginBottom: theme.spacing(2),
    display: userImagePreview ? 'block' : 'none'
  },
  '& input': {
    display: 'none'
  },
  '& .MuiButton-root': {
    marginBottom: theme.spacing(2)
  },
  '& .MuiAlert-root': {
    display: userImageError ? 'flex' : 'none',
    marginBottom: theme.spacing(2)
  }
}))