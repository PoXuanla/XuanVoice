import { useEffect, useState } from 'react'
import { IconButton, Menu, MenuItem, styled, alpha } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import { PropaneSharp } from '@mui/icons-material'
import { PersonPinSharp } from '@material-ui/icons'

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': { backgroundColor: theme.palette.action.selected },
  '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.2) }
}))

const menuOptions = [
  { name: '手動', orderBy: 'manual', sort: 'asc' },
  { name: '發布日期(最新)', orderBy: 'songCreatedTime', sort: 'asc' },
  { name: '發布日期(最舊)', orderBy: 'songCreatedTime', sort: 'desc' },
  { name: '建立日期(最新)', orderBy: 'createdTime', sort: 'asc' },
  { name: '建立日期(最舊)', orderBy: 'createdTime', sort: 'desc' }
]
const SortMenu = (props) => {
  const { menuMode } = props
  const [menuEl, setMenuEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const openMenu = Boolean(menuEl)

  useEffect(() => {
    if (menuMode !== null) {
      console.log(menuMode)
      const index = menuOptions.findIndex(
        (menu) => menu.orderBy === menuMode.orderBy && menu.sort === menuMode.sort
      )
      setSelectedIndex(index)
    }
  }, [menuMode])

  const handleMenuClick = (event) => {
    setMenuEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuEl(null)
  }
  const changeSortMode = (index) => () => {
    props.changeSortMode(index, menuOptions[index])
    handleMenuClose()
  }
  return (
    <>
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
        {menuOptions.map((option, index) => {
          return (
            <CustomMenuItem
              key={index}
              onClick={changeSortMode(index)}
              selected={index === selectedIndex}
            >
              {option.name}
            </CustomMenuItem>
          )
        })}
      </Menu>
    </>
  )
}
export default SortMenu
