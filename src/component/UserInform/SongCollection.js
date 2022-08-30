import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'
import SongWatchList from '../SongWatchList/SongWatchList'

const SongCollectionGrid = styled(Grid)(({ theme }) => ({
  '&.MuiGrid-container': {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: theme.shadows[1]
  },
  '& .MuiGrid-item': {
    padding: theme.spacing(2),
    borderRadius: 6
  },
  '& .MuiTypography-root': {
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1)
  }
}))
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
