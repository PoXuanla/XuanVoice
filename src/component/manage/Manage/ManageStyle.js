import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
export const MenuGridItemContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  '& .title': {
    fontWeight: 700,
    textAlign: 'left',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1)
  },
  '& .BtnList': {
    display: 'flex',
    flexDirection: 'column'
  },
  '& .MuiButton-root': {
    color: theme.palette.text.primary
  }
}))

export const OutletBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper
}))
