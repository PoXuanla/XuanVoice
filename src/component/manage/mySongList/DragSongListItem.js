import { forwardRef } from 'react'
import { Delete, DragHandle } from '@mui/icons-material'
import { IconButton, Box, Divider } from '@mui/material'
import ListCell from '../../ListCell/ListCell'

const DragSongListItem = forwardRef((props, ref) => {
  const { songData = {}, provided = {} } = props
  // songData (Object) => 歌曲資料
  // provided (Object) => Draggable Object
  songData._id = songData.songId //ListCell 內的_id 代表是songId 而非歌單排序的id
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
        <Box sx={{ width: 'calc(100% - 40px)' }}>
          <ListCell songData={songData}>{ToolBar()}</ListCell>
        </Box>
      </Box>
      <Divider sx={{ mt: 1 }} />
    </Box>
  )
})
export default DragSongListItem
