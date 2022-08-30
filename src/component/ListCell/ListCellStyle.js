import styled from '@emotion/styled'
import { Box, Avatar } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(2)
}))
export const SongItemStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
 
}))
export const RankStyle = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1)
  }
}))
export const CellAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  boxShadow: theme.shadows[1]
}))
export const SongInfoStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
  '& .text-songname': {
    marginBottom: 0,
    fontWeight: 700,
    color: theme.palette.text.primary
  },
  '& .text-author': {
    marginBottom: 0,
    fontWeight: 400,
    color: theme.palette.text.secondary
  }
}))
