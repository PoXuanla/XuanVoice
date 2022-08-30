import React, { useState } from 'react'
import { Box, Button, Tooltip, AppBar, Toolbar, IconButton, Container, Avatar } from '@mui/material'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../slice/authSlice'
import { toggleMode } from '../../slice/modeSlice'
import { createTheme } from '@mui/material'
import SwipeDrawer from './SwipeDrawer'
import NavMenu from './NavMenu'
import UserImgBtn from './UserImgBtn'

const Nav = () => {
  const user = useSelector((state) => state.auth.user)
  const { mode } = useSelector((state) => state.mode)
  const userImg = useSelector((state) => {
    return state.auth.user.image || ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = createTheme()

  const [anchorMenuBtn, setAnchorMenuBtn] = useState(null)
  const [showDrawer, setShowDrawer] = useState(false)

  //處理尺寸小於 sm 的 menu
  const toggleDrawer = (bool) => {
    setShowDrawer(bool)
  }
  //處理尺寸 >= sm 的 menu
  const handleOpenUserMenu = (event) => {
    setAnchorMenuBtn(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorMenuBtn(null)
  }
  const openMenu = (event) => {
    if (document.body.offsetWidth >= theme.breakpoints.values.md) {
      handleOpenUserMenu(event)
    } else {
      toggleDrawer(true)
    }
  }
  //登入
  const loginHandler = () => {
    navigate('/login')
    setAnchorMenuBtn(null)
    setShowDrawer(false)
  }
  //登出
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
    setAnchorMenuBtn(null) //關閉 menu item
    setShowDrawer(false)
  }
  const clearAnchorMenuBtn = () => {
    setAnchorMenuBtn(null)
  }
  //切換 Dark Mode
  const toggleModeHandler = () => {
    dispatch(toggleMode())
    setAnchorMenuBtn(null)
  }
  const pages = ['發現', '排行榜']
  const settings = [
    {
      text: '個人頁面',
      needLogin: true,
      click: clearAnchorMenuBtn,
      link: `/userInform/${Object.getOwnPropertyNames(user).length !== 0 ? user.account : ''}`
    },
    { text: '我的音樂庫', needLogin: true, click: clearAnchorMenuBtn, link: '/manage/likes' },
    { text: '管理歌曲', needLogin: true, click: clearAnchorMenuBtn, link: '/manage/song' },
    {
      text: mode === 'light' ? '深色模式' : '淺色模式',
      needLogin: false,
      click: toggleModeHandler,
      link: null
    },
    { text: '登入', needLogin: false, click: loginHandler, link: null },
    { text: '登出', needLogin: true, click: logoutHandler, link: null }
  ]

  return (
    <AppBar position='static' elevation={0}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', flexGrow: 2 }}>
            <Button
              component={Link}
              to='/'
              variant='text'
              size='large'
              sx={{ color: '#fff', fontSize: '22px' }}
            >
              XuanVoice
            </Button>
            {/* width > 900 在 XuanVoice 右側會出現page的連結 */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  component={Link}
                  to={index === 0 ? '/' : '/browse'}
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block', textAlign: 'center' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>

          <Box>
            {/* 觸發 Menu 的按鈕 */}
            <UserImgBtn openMenu={openMenu} userImg={userImg} />
            {/* 尺寸小於 md 的 Menu */}
            <SwipeDrawer
              pages={pages}
              settings={settings}
              toggleDrawer={toggleDrawer}
              showDrawer={showDrawer}
            />
            {/*  尺寸大於 md 的 Menu */}
            <NavMenu
              settings={settings}
              anchorMenuBtn={anchorMenuBtn}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Nav
