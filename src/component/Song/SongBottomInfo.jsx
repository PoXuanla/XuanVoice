import { Avatar, Grid, Typography, Box, Divider } from '@mui/material'
import { UserInfo, SongInfoWrapper } from './SongStyle'

const SongBottomInfo = (props) => {
  const { songData } = props

  return (
    <Grid container>
      {/* UserIngo */}
      <Grid item xs={12} sm={5} md={3} sx={{ padding: 2 }}>
        <UserInfo>
          <Avatar
            className='userImg'
            variant='rounded'
            src={songData.author ? songData.author.image : ''}
          ></Avatar>
          <Box className='userInfo'>
            <Typography variant='h6'>{songData.author ? songData.author.name : ''}</Typography>
            <Typography variant='body1'>音樂人</Typography>
          </Box>
        </UserInfo>
      </Grid>
      {/* SongInfo */}
      <Grid item xs={12} sm={7} md={9} sx={{ padding: 2 }}>
        {/* 歌詞 */}
        <SongInfoWrapper>
          <Typography variant='h6'>歌詞</Typography>
          <Typography variant='body1'>{songData.lyric}</Typography>
        </SongInfoWrapper>

        <Divider sx={{ mb: 2, mt: 2 }}></Divider>

        {/* 歌曲介紹 */}
        <SongInfoWrapper>
          <Typography variant='h6'>歌曲介紹</Typography>
          <Typography variant='body1'>{songData.intro}</Typography>
        </SongInfoWrapper>

        <Divider sx={{ mb: 2, mt: 2 }}></Divider>
        {/* 留言 */}
        {/* <Box>
        <Typography variant='h6' sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
          留言
        </Typography>
        <Box
          sx={{
            padding: 2,
            bgcolor: 'content',
            borderRadius: 3,
            boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
            textAlign: 'right'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: 1
            }}
          >
            <Avatar
              variant='rounded'
              sx={{ width: 70, height: 70, mr: 2 }}
              src='https://imgur.dcard.tw/oSlbpi4h.jpg'
            ></Avatar>
            <TextField
              id='comment'
              multiline
              rows={2}
              placeholder='想說點什麼'
              sx={{ width: '100%' }}
            />
          </Box>
          <Button variant='contained'>留言</Button>
        </Box>
      </Box> */}
      </Grid>
    </Grid>
  )
}
export default SongBottomInfo
