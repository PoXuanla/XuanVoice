import { Grid, Typography } from '@mui/material'
import SongWatchList from '../SongWatchList/SongWatchList'
import { SongCollectionGrid } from './UserInformStyle'

const SongCollection = ({ userSongs, isLoading }) => {
  return (
    <SongCollectionGrid container>
      <Grid item xs={12} sm={12}>
        <Typography variant='h6'>音樂作品</Typography>
        <SongWatchList songListData={userSongs} mode='show' isLoading={isLoading} />
      </Grid>
    </SongCollectionGrid>
  )
}
export default SongCollection
