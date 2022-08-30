import { Grid, Avatar, Box, Typography, Skeleton, Divider } from '@mui/material'
import styled from '@emotion/styled'

const InformGrid = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-container': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: theme.shadows[1]
  }
}))
const ImgGridItem = styled(Grid)(({ theme }) => ({
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
const InformGridItem = styled(Grid)(({ theme }) => ({
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

const Inform = ({ userInform, isLoading }) => {
  return (
    <InformGrid container>
      {/* Image */}
      <ImgGridItem item xs={12} sm={3}>
        <Avatar variant='rounded' src={userInform.image}></Avatar>
      </ImgGridItem>
      {/* Inform */}
      <InformGridItem item xs={12} sm={9}>
        {!isLoading && (
          <Box>
            <Typography variant='body2' className='fieldName'>
              暱稱
            </Typography>
            <Typography variant='h5' className='text'>
              {userInform.name}
            </Typography>
            <Divider sx={{ mb: 1, mt: 1 }} />
            <Typography variant='body2' className='fieldName'>
              個人介紹
            </Typography>
            <Typography variant='body1' className='text'>
              {userInform.intro}
            </Typography>
          </Box>
        )}
        {isLoading && <Skeleton animation='wave' height={'100%'} />}
      </InformGridItem>
    </InformGrid>
  )
}
export default Inform
