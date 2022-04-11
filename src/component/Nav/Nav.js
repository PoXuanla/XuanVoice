import React from 'react'
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
import PersonIcon from '@mui/icons-material/Person'
const Nav = () => {
  console.log(process.env.REACT_APP_URL)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [state, setState] = React.useState(false)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const userImg = useSelector((state) => { return state.auth.user.image || '' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggleDrawer = (aa) => (event) => {
    setState(aa)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const openMenu = (event) => {
    handleOpenUserMenu(event)
    toggleDrawer(true)()
  }
  const loginHandler = () => {
    navigate('/login')
    setAnchorElUser(null)
  }
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
    setAnchorElUser(null) //關閉 menu item
  }
  const pages = ['發現', '排行榜']
  const settings = [
    { text: '個人頁面', needLogin: true, click: null },
    { text: '管理歌曲', needLogin: true, click: null },
    { text: '深色模式', needLogin: false, click: null },
    { text: '登入', needLogin: false, click: loginHandler },
    { text: '登出', needLogin: true, click: logoutHandler }
  ]
  //側邊Menu
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
            <ListItem button key={data.text} onClick={data.click}>
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
  //user Menu
  const menu = settings.map((data, index) => {
    let item = (
      <MenuItem key={data.text} onClick={data.click}>
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
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>

          <Box>
            <Tooltip title='打開設定'>
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
            {/* 側邊Menu */}
            <SwipeableDrawer
              sx={{ display: { xs: 'block', md: 'none' } }}
              anchor={'right'}
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list('right')}
            </SwipeableDrawer>
            {/* User Menu */}
            <Menu
              sx={{ mt: '45px', display: { xs: 'none', md: 'block' } }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
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
