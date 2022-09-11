import { Box, Grid } from '@mui/material'
import styled from '@emotion/styled'

//inform.js
export const InformGrid = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-container': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: theme.shadows[1]
  }
}))
export const ImgGridItem = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-item': {
    padding: theme.spacing(2)
  },
  '& .MuiAvatar-root': {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 200,
      height: 200
    },
    [theme.breakpoints.up('sm')]: {
      width: 120,
      height: 120
    }
  }
}))
export const InformGridItem = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-item': {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2)
  },
  '& .fieldName': {
    fontWeight: 300,
    color: theme.palette.text.secondary
  },
  '& .text': {
    fontWeight: 700,
    color: theme.palette.text.primary,
    mb: 1
  }
}))

//NotFoundUser.js
export const UserNotFoundStyle = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[1],
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  '& .MuiTypography-root': {
    fontWeight: 700,
    color: theme.palette.text.primary
  }
}))

//SongCollection.js
export const SongCollectionGrid = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-container': {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: theme.shadows[1]
  },
  '& .MuiGrid-item': {
    padding: theme.spacing(2),
    borderRadius: 6
  },
  '& .MuiTypography-root': {
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1)
  }
}))
