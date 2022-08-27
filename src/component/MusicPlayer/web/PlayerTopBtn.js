import { Box, IconButton } from '@mui/material'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { blueGrey } from '@mui/material/colors'

const PlayerTopBtn = (props) => {
  const { display, position, top, left } = props.css || {}
  return (
    <Box
      sx={{
        display: display || 'block',
        width: '100%',
        position: position || '',
        top: top !== undefined ? top : null,
        left: left !== undefined ? left : null,
        padding: '15px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          onClick={() => {
            props.openDialog()
          }}
          fontSize='medium'
        >
          <FitScreenIcon sx={{ color: '#fff' }}></FitScreenIcon>
        </IconButton>
        <IconButton onClick={() => props.showUIHandler()} fontSize='medium'>
          <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
export default PlayerTopBtn
