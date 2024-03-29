import { Container, Typography, Box } from '@mui/material'
import styled from '@emotion/styled'

const PageNotFoundStyle = styled(Box)(({ theme }) => ({
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
const PageNotFound = () => {
  return (
    <>
      <Container maxWidth={'md'}>
        <PageNotFoundStyle>
          <Typography variant='h5'>Page Not Found.(,,・ω・,,)</Typography>
        </PageNotFoundStyle>
      </Container>
    </>
  )
}
export default PageNotFound
