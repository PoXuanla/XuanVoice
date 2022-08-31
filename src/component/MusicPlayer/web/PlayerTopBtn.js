import { Box, IconButton } from '@mui/material'
import FitScreenIcon from '@mui/icons-material/FitScreen'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { blueGrey } from '@mui/material/colors'

const PlayerTopBtn = (props) => {
  const { showUI } = props
  return (
    <Box
      sx={{
        display: showUI ? 'block' : 'none',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
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
