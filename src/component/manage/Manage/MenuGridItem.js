import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MenuGridItemContainer } from './ManageStyle'

const MenuGridItem = (props) => {
  const locationString = useLocation().pathname.split('/').splice(1)

  const [selectMenuIndex, setSelectMenuIndex] = useState(0)

  const changeSelectedIndexHandler = (index) => (event) => {
    setSelectMenuIndex(index)
  }

  //Change Menu Selected when Url Pathname Change
  useEffect(() => {
    if (locationString[1] === undefined) setSelectMenuIndex(0)
    if (locationString[1] === 'likes') setSelectMenuIndex(0)
    if (locationString[1] === 'songlist') setSelectMenuIndex(1)
    if (locationString[1] === 'song') setSelectMenuIndex(2)
  }, [useLocation().pathname])
  return (
    <MenuGridItemContainer>
      <Typography variant='h6' className='title'>
        音樂庫
      </Typography>
      <Box className='BtnList'>
        {/* <Button
          variant={selectMenuIndex === 0 ? 'contained' : 'text'}
          size='small'
          component={RouterLink}
          to='/manage/likes'
          onClick={changeSelectedIndexHandler(0)}
        >
          我的喜歡
        </Button> */}
        <Button
          variant={selectMenuIndex === 1 ? 'contained' : 'text'}
          size='small'
          component={RouterLink}
          to='/manage/songlists'
          onClick={changeSelectedIndexHandler(1)}
        >
          我的歌單
        </Button>
        <Button
          variant={selectMenuIndex === 2 ? 'contained' : 'text'}
          size='small'
          component={RouterLink}
          to='/manage/song'
          onClick={changeSelectedIndexHandler(2)}
        >
          我的作品
        </Button>
      </Box>
    </MenuGridItemContainer>
  )
}
export default MenuGridItem
