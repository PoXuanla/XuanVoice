import { Container, Typography, Box } from '@mui/material'
import styled from '@emotion/styled'

const UserNotFoundStyle = styled(Box)(({ theme }) => ({
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
const NotFoundUser = () => {
  return (
    <UserNotFoundStyle>
      <Typography variant='h5'>Not Found This User (,,・ω・,,)</Typography>
    </UserNotFoundStyle>
  )
}
export default NotFoundUser
