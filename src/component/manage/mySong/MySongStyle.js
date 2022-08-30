import styled from '@emotion/styled'
import { Box } from '@mui/material'

// mySong.js

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
  '& .title': {
    fontWeight: 700,
    color: theme.palette.text.primary
  }
}))
