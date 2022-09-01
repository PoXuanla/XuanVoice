import { useDispatch } from 'react-redux'
import { replaceSongListData, openPlayer } from '../../slice/musicplayerSlice'

import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  CardActions,
  IconButton,
  Divider
} from '@mui/material'
import { red } from '@mui/material/colors'

import PlayCircleIcon from '@mui/icons-material/PlayCircle'
const MainCard = ({ data }) => {
  const dispatch = useDispatch()

  const playMusic = () => {
    console.log(data)
    dispatch(replaceSongListData([data]))
    dispatch(openPlayer())
  }
  return (
    <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
      <CardHeader
        avatar={<Avatar src={data.author.image} sx={{ bgcolor: 'primary' }} aria-label='recipe' />}
        title={data.author.name}
        sx={{ cursor: 'default' }}
      />
      <CardMedia component='img' height='194' image={data.image} alt='Paella dish' />
      <CardContent>
        <Typography variant='body2' color='text.primary' >
          {data.name}
        </Typography>
        <Divider sx={{mt:2,mb:2}} />
        <Typography variant='body2' color='text.secondary'>
          {data.intro}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'right' }}>
        <IconButton onClick={playMusic}>
          <PlayCircleIcon sx={{ color: red[500], fontSize: 39 }} />
        </IconButton>
      </CardActions>
    </Card>
  )
}
export default MainCard
