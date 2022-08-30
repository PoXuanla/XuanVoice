import styled from '@emotion/styled'
import { Box } from '@mui/material'

// TitleBar.js
export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom:theme.spacing(1),
  '& .title': {
    fontWeight: 700,
    color: theme.palette.text.primary
  }
}))
//SongList.js
export const SongListWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .songName': { fontWeight: 700, color: theme.palette.text.primary },
  '& .sumOfSong': { fontWeight: 700, color: theme.palette.text.secondary }
}))
