import { Box, Avatar, Typography, Button, Grid } from '@mui/material'
const SongList = (props) => {
  const editHandler = (songId) => (e) => {
    props.onEdit(songId)
  }
  const deleteHandler = (songId, songName) => (e) => {
    props.onDelete(songId, songName)
  }
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ padding: 2 }}>
      <Grid item xs={2}>
        <Avatar variant='rounded' src={`${props.image}?${Math.random()}`}></Avatar>
      </Grid>
      <Grid item xs={8}>
        <Typography sx={{ flex: 3, textAlign: 'center', color: 'text.primary' }}>
          {props.name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Box>
          <Button onClick={editHandler(props.songId)}>編輯</Button>
          <Button onClick={deleteHandler(props.songId, props.name)}>刪除</Button>
        </Box>
      </Grid>
    </Grid>
  )
}
export default SongList
