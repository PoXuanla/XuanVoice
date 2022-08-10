import {
  Avatar,
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  TextField,
  Button
} from '@mui/material'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
const Song = () => {
  return (
    <>
      <Container maxWidth={'lg'} sx={{ mt: 2 }}>
        <Grid
          container
          sx={{
            bgcolor: 'content',
            borderRadius: 3,
            boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'
          }}
        >
          <Grid item xs={12} sm={3} sx={{ padding: 2 }}>
            <Avatar
              variant='rounded'
              src='https://imgur.dcard.tw/oSlbpi4h.jpg'
              sx={{ width: '100%', height: '100%' }}
            ></Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              padding: 2,
              display: 'flex',
              alignItems: 'left',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                歌曲名稱
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                歌曲分類
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ fontWeight: 600, color: 'text.primary' }}>
                喜歡 :1
              </Typography>

              <Box>
                <IconButton color='primary' aria-label='upload picture' component='span'>
                  <FavoriteBorderIcon sx={{ color: 'red' }} />
                </IconButton>
                <IconButton size='large'>
                  <PlayCircleIcon sx={{ color: 'red' }} fontSize='large' />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item xs={12} sm={3} sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                variant='rounded'
                src='https://imgur.dcard.tw/oSlbpi4h.jpg'
                sx={{ width: 70, height: 70, mr: 2 }}
              ></Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
                  作者帳號
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                  音樂人
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 2, mt: 2 }}></Divider>
            <Typography variant='body1' sx={{ color: 'text.primary' }}>
              發布時間
            </Typography>
            <Divider sx={{ mb: 2, mt: 2 }}></Divider>
          </Grid>
          <Grid item xs={12} sm={9} sx={{ padding: 2 }}>
            <Box>
              <Typography variant='h6' sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
                歌詞
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.primary' }}>
                喵喵喵
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, mt: 2 }}></Divider>
            <Box>
              <Typography variant='h6' sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
                歌曲介紹
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.primary' }}>
                喵喵喵!
              </Typography>
            </Box>
            <Divider sx={{ mb: 2, mt: 2 }}></Divider>
            <Box>
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default Song
