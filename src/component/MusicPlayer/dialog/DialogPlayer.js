import { Box } from '@mui/material'
import { blueGrey, pink } from '@mui/material/colors'
import MusicImg from '../../MusicPlayer/utils/MusicImg'
import MusicInfo from '../../MusicPlayer/utils/MusicInfo'
import PlayerProgressBar from '../../MusicPlayer/utils/PlayerProgressBar'
import PlayerFullBtn from '../../MusicPlayer/utils/PlayerFullBtn'
import useWindowSize from './useWindowSize'

const DialogPlayer = (props) => {
  const showPlayList = props.showPlayList
  const player = props.player
  const [screenWidth] = useWindowSize()
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        flex: 1,
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 1
      }}
    >
      <Box
        sx={{
          width: !showPlayList ? '400px' : '80%',
          boxShadow: !showPlayList ? 3 : 0,
          borderRadius: 1,
          padding: 3,
          background: !showPlayList ? 'player.background' : 'inherit'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '25px'
          }}
        >
          <MusicImg
            css={{
              width: 200,
              height: 200
            }}
          ></MusicImg>
        </Box>

        <MusicInfo
          showBtn='true'
          color='text.primary'
          css={{
            display: 'flex'
          }}
        ></MusicInfo>
        <PlayerProgressBar color='text.primary' showTime='true' player={player}></PlayerProgressBar>
        <PlayerFullBtn player={player}></PlayerFullBtn>
      </Box>
    </Box>
  )
}
export default DialogPlayer
