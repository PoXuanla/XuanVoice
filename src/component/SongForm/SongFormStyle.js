import styled from '@emotion/styled'
import { Box } from '@mui/material'

//SongImage
export const ImageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'songImageError'
})(({ theme, songImageError }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiAvatar-root': {
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing(1)
  },
  '& .MuiAlert-root': {
    display: songImageError === null ? 'none' : 'flex',
    marginBottom: theme.spacing(2)
  },
  '& .MuiButton-root': {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  }
}))

//SongMp3
export const TitleStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'uploadMp3Name'
})(({ theme, uploadMp3Name }) => ({
  '& .title': {
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2)
  },
  '& .title-mp3': {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    display: uploadMp3Name ? 'block' : 'none'
  }
}))

export const UploadBtnStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'mode' || prop !== 'uploadMp3Error'
})(({ theme, mode, uploadMp3Error }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  '& .MuiButton-root': {
    padding: theme.spacing(1),
    display: mode === 'update' ? 'none' : 'block'
  },
  '& .MuiAlert-root': {
    display: uploadMp3Error === null ? 'none' : 'flex'
  },
  '& input': {
    display: 'none'
  }
}))

//SongCategorySelect
export const CategorySelectStyle = styled(Box)(({ theme }) => ({
  '& .title': {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary
  }
}))
