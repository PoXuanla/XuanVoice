import { Avatar, Box, Typography, Skeleton, Divider } from '@mui/material'
import { InformGrid, ImgGridItem, InformGridItem } from './UserInformStyle'

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
