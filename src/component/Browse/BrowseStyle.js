import styled from '@emotion/styled'
import { Box, Button, Skeleton } from '@mui/material'

//QueryFactorBar.js
export const QueryFactorBarStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  '& .boxContainer': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  '& .MuiTypography-h6': {
    fontWeight: 700,
    textAlign: 'left',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1)
  },
  '& .MuiDivider-root': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))
export const QueryFactorBtn = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: '4px 10px',
  borderRadius: '20px',

  '&.MuiButton-contained': {
    border: `1px solid ${theme.palette.primary.main}`
  }
}))
export const QueryFactorSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: '20px',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),

  '& .MuiButton-root': {
    marginRight: 0,
    marginBottom: 0,
    padding: '4px 10px',
    borderRadius: '20px',
    border: `1px solid ${theme.palette.primary.main}`
  }
}))

//SongList.js
export const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  padding: theme.spacing(2),
  textAlign: 'right'
}))
