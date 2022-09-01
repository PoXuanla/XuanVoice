import { IconButton, Avatar, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const UserImgBtn = (props) => {
  const { userImg } = props
  const openMenu = (event) => {
    props.openMenu(event)
  }
  return (
    <Tooltip title='打開設定'>
      <IconButton onClick={openMenu} color='inherit'>
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
  )
}
export default UserImgBtn
