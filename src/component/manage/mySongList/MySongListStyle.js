import styled from '@emotion/styled'
import { Box } from '@mui/material'

// mySongList.js
export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  mb: theme.spacing(1),
  '& .title': {
    fontWeight: 700,
    color: theme.palette.text.primary
  }
}))
