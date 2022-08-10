import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../slice/authSlice'
import { toggleMode } from '../../slice/modeSlice'
import { createTheme } from '@mui/material'

const Nav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = createTheme()

  //useState
  const [anchorMenuBtn, setAnchorMenuBtn] = React.useState(null)
  const [showDrawer, setShowDrawer] = React.useState(false)

  //Selector
  const { mode } = useSelector((state) => state.mode)
  const userImg = useSelector((state) => {
    return state.auth.user.image || ''
  })
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)

  //處理尺寸小於 sm 的 menu
  const toggleDrawer = (bool) => (event) => {
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
      toggleDrawer(true)()
    }
  }
  const loginHandler = () => {
    navigate('/login')
    setAnchorMenuBtn(null)
    setShowDrawer(false)
  }
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
    setAnchorMenuBtn(null) //關閉 menu item
    setShowDrawer(false)
  }
  const clearAnchorMenuBtn = () => {
    setAnchorMenuBtn(null)
  }
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
  //尺寸 < sm 的 Menu (Drawer)
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
    >
      <List>
        {pages.map((text, index) => (
          <ListItem component={Link} to={index === 0 ? '/' : '/browse'} button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {settings.map((data, index) => {
          let item = (
            <ListItem
              button
              key={data.text}
              onClick={data.click}
              component={data.link !== null ? Link : null}
              to={data.link !== null ? data.link : ''}
            >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItem>
          )
          if (!isLoggedIn && data.needLogin) return
          else if (!isLoggedIn && !data.needLogin) return item
          else if (isLoggedIn) {
            if (data.text === '登入') return
            return item
          }
        })}
      </List>
    </Box>
  )
  //尺寸 >= sm 的 Menu
  const menu = settings.map((data, index) => {
    let item = (
      <MenuItem
        sx={{
          width: '100%'
        }}
        key={data.text}
        onClick={data.click}
        component={data.link !== null ? Link : null}
        to={data.link !== null ? data.link : null}
      >
        <Typography textAlign='center'>{data.text}</Typography>
      </MenuItem>
    )
    if (!isLoggedIn && data.needLogin) return
    else if (!isLoggedIn && !data.needLogin) return item
    else if (isLoggedIn) {
      if (data.text === '登入') return
      return item
    }
  })
  return (
    <AppBar position='static'>
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
            <Tooltip title='打開設定'>
              {/* 觸發 Menu 的按鈕 */}
              <IconButton onClick={openMenu} sx={{ p: 0 }} color='inherit'>
                <Avatar
                  alt='User'
                  src={
                    userImg
                      ? userImg
                      : 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'
                  }
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                />
                <MenuIcon sx={{ display: { xs: 'block', md: 'none' } }} />
              </IconButton>
            </Tooltip>
            {/* 尺寸小於 md 的 Menu */}
            <SwipeableDrawer
              sx={{ display: { xs: 'block', md: 'none' } }}
              anchor={'right'}
              open={showDrawer}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list('right')}
            </SwipeableDrawer>
            {/*  尺寸大於 md 的 Menu */}
            <Menu
              sx={{ mt: '45px', display: { xs: 'none', md: 'block' } }}
              id='menu-appbar'
              anchorEl={anchorMenuBtn}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorMenuBtn)}
              onClose={handleCloseUserMenu}
            >
              {menu}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Nav
