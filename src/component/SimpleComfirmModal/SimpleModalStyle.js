import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 300,
  width: '70%',
  backgroundColor: theme.palette.background.paper,
  outline: 'none',
  boxShadow: theme.shadows[1],
  borderRadius: 8,
  padding: theme.spacing(2)
}))
export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  paddingBottom: 0,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  marginBottom: theme.spacing(2)
}))
export const Content = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary
}))
export const Footer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'noFooter'
})(({ theme, noFooter }) => ({
  textAlign: 'right',
  display: noFooter ? 'none' : 'block'
}))
