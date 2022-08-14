import React, { useEffect } from 'react'
import './App.css'
import Nav from './component/Nav/Nav'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Main from './pages/main'
import Browse from './pages/browse'
import Login from './pages/login'
import Register from './pages/register'
import { Box } from '@mui/material'
import Manage from './pages/manage/manage'
import Like from './pages/manage/like'
import MySong from './pages/manage/mySong'
import UploadMySong from './pages/manage/uploadMySong'
import UpdateMySong from './pages/manage/updateMySong'
import Song from './pages/song'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { validAccessToken } from './slice/authSlice'
import UserInform from './pages/userInform'
import PageNotFound from './pages/pageNotFind'
import MySongList from './pages/manage/mySongList'
const App = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const { mode } = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname.split('/')[1] === 'manage') {
      dispatch(validAccessToken())
    }
  }, [location.pathname])

  const theme = createTheme({
    palette: {
      mode: mode,
      modal: grey[900],
      content: 'rgba(255, 255, 255, 0.08)',
      boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh)', height: '100%' }}>
        <Nav />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Browse' element={<Browse />} />

          <Route path='/manage' element={<Manage />}>
            <Route path='' element={<Like />} />
            <Route path='likes' element={<Like />} />
            <Route path='songlist' element={<MySongList />} />

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
