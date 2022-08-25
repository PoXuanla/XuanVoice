import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Avatar, Container, Grid, Typography, Box, Divider, Skeleton } from '@mui/material'
import SongWatchList from '../component/SongWatchList/SongWatchList'
import { clearLoading, setLoading } from '../slice/loadSlice'
import { getUserInform } from '../api/user'

const UserInform = () => {
  const { isLoading } = useSelector((state) => state.load)
  const dispatch = useDispatch()
  const account = useParams().account

  const [userInform, setUserInform] = useState('')
  const [userSongs, setUserSongs] = useState([])
  const [userExist, setUserExist] = useState(true)

  //取得使用者的資料
  useEffect(() => {
    getInform()
  }, [])

  const getInform = async () => {
    dispatch(setLoading())
    await getUserInform(account)
      .then((data) => {
        const { inform: userInform } = data
        const { songs: userSongs } = data.inform
        setUserInform(userInform)
        setUserSongs(userSongs)
        dispatch(clearLoading())
      })
      .catch(() => {
        setUserExist(false)
        dispatch(clearLoading())
      })
  }
  return (
    <>
      {!isLoading && !userExist && (
        <Container maxWidth={'md'}>
          <Box sx={{ textAlign: 'center' }} mt={2}>
            <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Not Found This User (,,・ω・,,)
            </Typography>
          </Box>
        </Container>
      )}
      {userExist && (
        <Container maxWidth={'md'} sx={{ mt: 2, pb: 2 }}>
          <Grid
            container
            sx={{
              bgcolor: 'content',
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: 'background.paper'
            }}
          >
            {/* Image */}
            <Grid item xs={12} sm={3} sx={{ padding: 2 }}>
              <Avatar
                variant='rounded'
                src={userInform.image}
                sx={{
                  width: { xs: '200px', sm: '120px' },
                  height: { xs: '200px', sm: '120px' },
                  margin: '0 auto'
                }}
              ></Avatar>
            </Grid>
            {/* Inform */}
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
              {!isLoading && (
                <Box>
                  <Typography variant='body2' sx={{ fontWeight: 300, color: 'text.secondary' }}>
                    暱稱
                  </Typography>
                  <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    {userInform.name}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant='body2' sx={{ fontWeight: 300, color: 'text.secondary' }}>
                    個人介紹
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {userInform.intro}
                  </Typography>
                </Box>
              )}
              {isLoading && <Skeleton animation='wave' height={'100%'} />}
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              borderRadius: 3,
              mt: 2,
              boxShadow: 3,
              bgcolor: 'background.paper'
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                padding: 2,
                borderRadius: 3
              }}
            >
              <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                音樂作品
              </Typography>
              <SongWatchList songListData={userSongs} mode='show' isLoading={isLoading} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}
export default UserInform
