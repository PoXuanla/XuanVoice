import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Avatar,
  Skeleton,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import { getListSongs } from '../../api/songList'
import { setLoading, clearLoading } from '../../slice/loadSlice'

const MySongList = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.load)
  const songlistid = useParams().songlistid

  const [songs, setSongs] = useState([])
  const [listName, setListName] = useState('')
  //menu
  const [menuEl, setMenuEl] = useState(null)
  const [menuCurrentIndex, setMenuCurrentIndex] = useState(0)
  const openMenu = Boolean(menuEl)

  // 取得 SongList 內的 Song
  useEffect(async () => {
    dispatch(setLoading())
    await getListSongs(songlistid).then((data) => {
      setSongs(data.songs)
      setListName(data.listName)
      dispatch(clearLoading())
    })
  }, [])

  const handleMenuClick = (event) => {
    setMenuEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuEl(null)
  }
  const menuOptions = [
    '手動',
    '發布日期(最新)',
    '發布日期(最舊)',
    '建立日期(最新)',
    '建立日期(最舊)'
  ]

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} mb={2}>
        {/* ListName */}
        {!isLoading && (
          <Typography variant='h6' sx={{ fontWeight: 700, color: 'text.primary' }}>
            {listName}
          </Typography>
        )}
        {isLoading && <Skeleton animation='wave' height={35} width={'70%'} />}
        {/* Sort Menu */}
        <IconButton
          id='basic-button'
          variant='contained'
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleMenuClick}
          sx={{ fontSize: { xs: 15, sm: 18 } }}
        >
          <SortIcon />
        </IconButton>

        <Menu
          id='basic-menu'
          anchorEl={menuEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {menuOptions.map((name, index) => {
            return (
              <MenuItem key={index} onClick={handleMenuClose} selected={index === menuCurrentIndex}>
                {name}
              </MenuItem>
            )
          })}
        </Menu>
      </Box>
      {/* Songs */}
      {!isLoading && (
        <Box sx={{ display: 'flex' }}>
          <Avatar
            variant='rounded'
            sx={{
              width: 50,
              height: 50
            }}
            src={songs.length !== 0 ? songs[0].image : ''}
          ></Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 2 }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {songs.length !== 0 ? songs[0].name : ''}
            </Typography>
            <Typography variant='caption' sx={{ fontWeight: 300, color: 'text.secondary' }}>
              {songs.length !== 0 ? songs[0].author.account : ''}
            </Typography>
          </Box>
        </Box>
      )}

      {isLoading && <Skeleton animation='wave' height={65} />}
    </>
  )
}
export default MySongList
