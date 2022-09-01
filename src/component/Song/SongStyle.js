import styled from '@emotion/styled'
import { Box, Grid } from '@mui/material'

export const TopGridContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 3,
  boxShadow: theme.shadows[1]
}))
export const TopInfoGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'left',
  flexDirection: 'column',
  justifyContent: 'space-between'
}))
export const TopToolContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center'
}))
export const TopInfoContainer = styled(Box)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1)
  }
}))
export const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .userImg': {
    width: 70,
    height: 70,
    marginRight: theme.spacing(2)
  },
  '& .userInfo': {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTypography-root': {
      fontWeight: 700,
      color: theme.palette.text.primary
    }
  }
}))
export const SongInfoWrapper = styled(Box)(({ theme }) => ({
  '& .MuiTypography-h6': {
    color: theme.palette.text.primary,
    fontWeight: 700,
    marginBottom: theme.spacing(2)
  },
  '& .MuiTypography-body1': { color: theme.palette.text.primary }
}))
