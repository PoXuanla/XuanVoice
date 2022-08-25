import { Container, Typography,Box } from '@mui/material'

const PageNotFound = () => {
  return (
    <>
      <Container maxWidth={'md'}>
        <Box sx={{textAlign:'center'}} mt={2}>
          <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
            Page Not Found.(,,・ω・,,)
          </Typography>
        </Box>
      </Container>
    </>
  )
}
export default PageNotFound
