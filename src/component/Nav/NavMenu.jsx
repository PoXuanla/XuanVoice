import React from 'react'
import { MenuItem, Typography, Menu } from '@mui/material'
import { Link } from 'react-router-dom'

const NavMenu = (props) => {
  const { anchorMenuBtn, settings } = props
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  const handleCloseUserMenu = () => {
    props.handleCloseUserMenu()
  }
  //根據登入狀態決定顯示什麼item在Menu上
  const selectMenuItem = (item, data) => {
    if (!isLoggedIn && data.needLogin) return
    else if (!isLoggedIn && !data.needLogin) return item
    else if (isLoggedIn) {
      if (data.text === '登入') return
      return item
    }
  }
  // Item
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
    return selectMenuItem(item, data)
  })

  return (
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
  )
}
export default React.memo(NavMenu)
