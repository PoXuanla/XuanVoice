import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  TextField,
  Button,
  CircularProgress
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ListCell from '../component/SongWatchList/ListCell'
import SongWatchList from '../component/SongWatchList/SongWatchList'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoading, setLoading } from '../slice/loadSlice'
import { LoadingButton } from '@mui/lab'
import { getUserInform } from '../api/user'
const UserInform = () => {
  const [userInform, setUserInform] = useState('')
  const [userSongs, setUserSongs] = useState([])
  const [userExist, setUserExist] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.load)
  const dispatch = useDispatch()
  const account = useParams().account

  useEffect(async () => {
    dispatch(setLoading())
    await getUserInform(account)
      .then((data) => {
        const userInform = data.inform
        const userSongs = data.inform.songs
        setUserInform(userInform)
        setUserSongs(userSongs)
        dispatch(clearLoading())
      })
      .catch(() => {
        dispatch(clearLoading())
      })
  }, [])
  return (
    <>
      {isLoading && (
        <Box
          sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {<CircularProgress />}
        </Box>
      )}
      {!isLoading && !userExist && (
        <Container maxWidth={'md'}>
          <Box sx={{ textAlign: 'center' }} mt={2}>
            <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
              Not Found This User (,,・ω・,,)
            </Typography>
          </Box>
        </Container>
      )}
      {!isLoading && userExist && (
        <Container maxWidth={'md'} sx={{ mt: 2 }}>
          <Grid
            container
            sx={{
              bgcolor: 'content',
              borderRadius: 3,
              boxShadow: 3
            }}
          >
            <Grid item xs={12} sm={3} sx={{ padding: 2 }}>
              <Avatar
                variant='rounded'
                src={userInform.image}
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
                  {userInform.name}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography variant='body1' sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {userInform.intro}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              bgcolor: 'content',
              borderRadius: 3,
              mt: 2,
              boxShadow: 3
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
              <SongWatchList songListData={userSongs} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}
export default UserInform
