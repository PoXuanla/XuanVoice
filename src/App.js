import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { ThemeProvider, createTheme, rgbToHex } from '@mui/material/styles'
import Nav from './component/Nav/Nav'
import IsLoggedIn from './component/IsLoggedIn'
import { validAccessToken } from './slice/authSlice'
import Main from './pages/main'
import Browse from './pages/browse'
import Login from './pages/login'
import Register from './pages/register'
import Manage from './pages/manage/manage'
import Like from './pages/manage/like'
import MySong from './pages/manage/mySong'
import UploadMySong from './pages/manage/uploadMySong'
import UpdateMySong from './pages/manage/updateMySong'
import Song from './pages/song'
import UserInform from './pages/userInform'
import PageNotFound from './pages/pageNotFound'
import MySongLists from './pages/manage/mySongLists'
import MySongList from './pages/manage/mySongList'
import { blue, blueGrey } from '@mui/material/colors'
import MusicPlayer from './component/MusicPlayer/MusicPlayer'
const App = () => {
  const { mode } = useSelector((state) => state.mode)
  const dispatch = useDispatch()

  //驗證JWT Token
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token === null) {
      localStorage.setItem('isLoggedIn', false)
      return
    }
    dispatch(validAccessToken())
  }, [])

  //Dark Mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'dark'
            ? {
                background: {
                  paper: blueGrey[900]
                },
                primary: { main: blueGrey[500] },
                secondary: { main: '#ffffff' },
                action: { selected: blueGrey[700], hover: blueGrey[500] },
                player: {
                  primary: blueGrey[200],
                  secondary: blueGrey[50],
                  background: blueGrey[800],
                  item: {
                    background: blueGrey[800]
                  }
                }
              }
            : {
                background: {
                  default: '#fafafa'
                },
                // primary: { main: blue[500], contrastText: '#000', },
                secondary: { main: blue[500] },
                action: { selected: blue[700], hover: blue[500] },
                player: {
                  primary: blue[700],
                  secondary: blue[300],
                  background: '#fafafa',
                  item: {
                    background: blueGrey[200]
                  }
                }
              })
        }
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          height: '100%',
          minHeight: 'calc(100vh)',
          pb: '100px'
        }}
      >
        <Nav />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Browse' element={<Browse />} />

          <Route
            path='/manage'
            element={
              <IsLoggedIn>
                <Manage />
              </IsLoggedIn>
            }
          >
            <Route path='' element={<Like />} />
            <Route path='likes' element={<Like />} />
            <Route path='songlists/:songListId' element={<MySongList />} />
            <Route path='songlists' element={<MySongLists />} />
            <Route path='song' element={<MySong />} />
            <Route path='song/upload' element={<UploadMySong />} />
            <Route path='song/:songid/edit' element={<UpdateMySong />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/song' element={<Song />} />
          <Route path='/userInform/:account' element={<UserInform />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <MusicPlayer />
      </Box>
    </ThemeProvider>
  )
}

export default App
