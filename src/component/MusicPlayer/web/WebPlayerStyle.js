import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const WebPlayerContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showUI'
})(({ theme, showUI }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(1),
  display: 'block',
  padding: showUI ? '0px' : '12px',
  paddingTop: showUI ? 0 : '16px',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderTop: showUI ? theme.spacing(1) : theme.spacing(0),
  width: 330,
  borderRadius: 8,
  overflow: 'hidden'
}))
export const WebPlayerWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showUI'
})(({ theme, showUI }) => ({
  display: showUI ? 'block' : 'flex',
  position: showUI ? 'relative' : '',
  alignItems: showUI ? '' : 'center',
  overflow: 'hidden',
  boxShadow: showUI ? 'inset 0px -65px 78px 49px #000000;' : ''
}))
export const MusicImgStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showUI'
})(({ theme, showUI }) => ({
  width: showUI ? '100%' : 46,
  height: showUI ? 388 : 46,
  marginRight: showUI ? 0 : theme.spacing(1),
  filter: showUI ? 'blur(5px)' : '',
  opacity: showUI ? '.7' : '',
  transition: 'height .3s'
}))
export const MusicInfoStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showUI'
})(({ theme, showUI }) => ({
  display: showUI ? 'flex' : 'block',
  position: showUI ? 'absolute' : 'static',
  bottom: showUI ? 50 : null,
  padding: showUI ? '15px' : 0,
  width: showUI ? '100%' : 'calc(100% - 46px - 8px - 80px - 5px)',
  marginRight: showUI ? 0 : 5,
  color: theme.palette.text.primary
}))
export const PlayerProgressBarStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showUI'
})(({ theme, showUI }) => ({
  width: '100%',
  position: 'absolute',
  top: showUI ? null : 0,
  bottom: showUI ? 0 : null,
  left: 0,
  padding: showUI ? '15px' : 0,
  zIndex: 1,
  bgcolor: theme.palette.background.paper
}))
