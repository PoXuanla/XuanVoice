import { forwardRef } from 'react'
import { Delete, DragHandle } from '@mui/icons-material'
import { IconButton, Box, Divider } from '@mui/material'
import ListCell from '../../ListCell/ListCell'

const DragSongListItem = forwardRef((props, ref) => {
  const { songData = {}, provided = {} } = props
  // songData (Object) => 歌曲資料
  // provided (Object) => Draggable Object

  const deleteHandler = () => {
    props.onDelete(songData)
  }
  const ToolBar = () => {
    return (
      <Box>
        <IconButton sx={{ mr: 1 }} onClick={deleteHandler}>
          <Delete sx={{ fontSize: { xs: 22, sm: 24 } }}></Delete>
        </IconButton>
      </Box>
    )
  }
  return (
    <Box mb={1} ref={ref} {...provided.draggableProps}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton {...provided.dragHandleProps}>
          <DragHandle sx={{ fontSize: { xs: 22, sm: 24 } }} />
        </IconButton>
        {/* ListCell */}
        <ListCell songData={songData}>{ToolBar()}</ListCell>
      </Box> 
      <Divider sx={{ mt: 1 }} />
    </Box>
  )
})
export default DragSongListItem
