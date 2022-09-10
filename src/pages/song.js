import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Avatar, Container, Grid, Typography, Box, IconButton, Divider } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { replaceSongListData, openPlayer } from '../slice/musicplayerSlice'
import {
  TopGridContainer,
  TopInfoGridItem,
  TopToolContainer,
  TopInfoContainer,
  UserInfo,
  SongInfoWrapper
} from '../component/Song/SongStyle'
import { getSongById } from '../api/song'

const Song = () => {
  const dispatch = useDispatch()
  const songId = useParams().songId
  const [songData, setSongData] = useState({})

  //loading music data
  useEffect(async () => {
    const getSongData = async () => {
      const response = await getSongById(songId)
      setSongData(response.song)
    }
    getSongData()
  }, [])

  const playMusicHandler = () => {
    const { name, image, author, mp3 } = songData
    dispatch(openPlayer())
    dispatch(replaceSongListData([{ name, image, author, mp3 }]))
  }

  return (
    <Container sx={{ mt: 2 }}>
      <TopGridContainer container>
        <Grid item xs={12} sm={3} sx={{ padding: 2 }}>
          <Avatar
            variant='rounded'
            src={songData.image}
            sx={{ width: '100%', height: '100%' }}
          ></Avatar>
        </Grid>
        <TopInfoGridItem item xs={12} sm={9}>
          <TopInfoContainer>
            <Typography variant='h5'>{songData.name}</Typography>
            <Typography variant='body1'>
              {songData.songCategory ? songData.songCategory.name : ''}
            </Typography>
          </TopInfoContainer>
          <TopToolContainer>
            <Box>
              <IconButton size='large' onClick={playMusicHandler}>
                <PlayCircleIcon sx={{ color: 'red' }} fontSize='large' />
              </IconButton>
            </Box>
          </TopToolContainer>
        </TopInfoGridItem>
      </TopGridContainer>
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
          <Divider sx={{ mb: 2, mt: 2 }}></Divider>
          {/* <Typography variant='body1' sx={{ color: 'text.primary' }}>
            發布時間 {songData.createdAt}
          </Typography> */}
          {/* <Divider sx={{ mb: 2, mt: 2 }}></Divider> */}
        </Grid>
        {/* SongInfo */}
        <Grid item xs={12} sm={7} md={9} sx={{ padding: 2 }}>
          <SongInfoWrapper>
            <Typography variant='h6'>歌詞</Typography>
            <Typography variant='body1'>{songData.lyric}</Typography>
          </SongInfoWrapper>

          <Divider sx={{ mb: 2, mt: 2 }}></Divider>

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
    </Container>
  )
}
export default Song
