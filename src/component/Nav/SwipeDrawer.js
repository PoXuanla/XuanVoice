import React from 'react'
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Divider,
  ListItem
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const SwipeDrawer = (props) => {
  const { pages, settings, showDrawer } = props
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  //處理尺寸小於 sm 的 menu
  const toggleDrawer = (bool) => (event) => {
    props.toggleDrawer(bool)
  }
  //根據登入狀態決定顯示什麼item在Drawer上
  const selectMenuItem = (item, data) => {
    if (!isLoggedIn && data.needLogin) return
    else if (!isLoggedIn && !data.needLogin) return item
    else if (isLoggedIn) {
      if (data.text === '登入') return
      return item
    }
  }
  //尺寸 < md 的 Menu (Drawer)
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
          return selectMenuItem(item, data)
        })}
      </List>
    </Box>
  )

  return (
    <SwipeableDrawer
      sx={{ display: { xs: 'block', md: 'none' } }}
      anchor={'right'}
      open={showDrawer}
      onOpen={toggleDrawer(true)}
      onClose={toggleDrawer(false)}
    >
      {list('right')}
    </SwipeableDrawer>
  )
}
export default SwipeDrawer
