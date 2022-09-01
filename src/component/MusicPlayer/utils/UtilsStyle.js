import { alpha, styled } from '@mui/material/styles'
import { Box, Slider } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

//PlayerProgressBar.js
// 播放底條
export const BottomProgressBar = styled(Box)(({ theme }) => ({
  display: 'block',
  position: 'relative',
  borderRadius: '10px',
  width: '100%',
  height: 4,
  backgroundColor: theme.palette.player.item.background,
  overflow: 'hidden',
  cursor: 'pointer'
}))
export const ProgressBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'progressPercentage'
})(({ theme, progressPercentage }) => ({
  position: 'absolute',
  width: progressPercentage,
  height: 4,
  cursor: 'pointer',
  backgroundColor: theme.palette.player.primary
}))
export const TimeBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: '6px',
  cursor: 'default',

}))
//PlayerFullBtn.js
export const FullBtnContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showUI'
})(({ theme, showUI }) => ({
  display: showUI ? 'block' : 'none',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  // border: `1px solid ${theme.palette.divider}`,
  padding: '15px',
  '& .MuiSvgIcon-root': {
    fontSize: '30px'
  }
}))

export const FullBtnWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}))
export const VoiceContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '& .closeVoiceBtn': {
    color: theme.palette.player.background
  },
  '& .openVoiceBtn': {
    color: theme.palette.player.primary
  }
}))
export const SlideContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showVolumeSlide'
})(({ theme, showVolumeSlide }) => ({
  display: showVolumeSlide ? 'block' : 'none',
  position: 'absolute',
  bottom: '90%',
  left: 15,
  height: 75,
  zIndex: 10,
  backgroundColor: blueGrey[100],
  padding: '6px',
  borderRadius: '5px',
  boxShadow: '2px 2px 0px 2px rgba(0,0,0, 0.2)'
}))
export const CustomSlider = styled(Slider)(({ theme }) => ({
  padding: 0,
  width: 3,
  color: 'player.primary',
  '& input[type="range"]': {
    WebkitAppearance: 'slider-vertical'
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    '&:focus,&:hover,&.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 7px ${alpha(theme.palette.player.primary, 0.2)}`
    },
    '&.Mui-active': {
      boxShadow: `0px 0px 0px 15px ${alpha(theme.palette.player.primary, 0.4)}`
    }
  },
  '&.MuiSlider-root': {
    padding: 0
  }
}))
