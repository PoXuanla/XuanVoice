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
import {
  blue,
  blueGrey,
  deepPurple,
  green,
  grey,
  orange,
  pink,
  red,
  teal
} from '@mui/material/colors'
const App = () => {
  const { mode } = useSelector((state) => state.mode)
  const dispatch = useDispatch()

  //驗證JWT Token
  useEffect(() => {
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
                primary: { main: blueGrey['A700'] },
                secondary: { main: '#ffffff' },
                action: { selected: blueGrey[700], hover: blueGrey[500] }
              }
            : {
                background: {
                  default: '#fafafa'
                },
                secondary: { main: blue[500] },
                action: { selected: blue[700], hover: blue[500] }
              })
        }
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', height: '100%', minHeight: 'calc(100vh)' }}>
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

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
