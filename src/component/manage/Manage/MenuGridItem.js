import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { MenuGridItemContainer } from './ManageStyle'

const MenuGridItem = (props) => {
  const selectMenuIndex = props.selectMenuIndex

  const changeSelectedIndexHandler = (index) => () => {
    props.changeSelectedIndex(index)
  }
  return (
    <MenuGridItemContainer>
      <Typography variant='h6' className='title'>
        音樂庫
      </Typography>
      <Box className='BtnList'>
        <Button
          variant={selectMenuIndex === 0 ? 'contained' : 'text'}
          size='small'
          component={RouterLink}
          to='/manage/likes'
          onClick={changeSelectedIndexHandler(0)}
        >
          我的喜歡
        </Button>
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
