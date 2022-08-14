import { Box, Divider } from '@mui/material'
import { React } from 'react'
import ListCell from './ListCell'
const SongWatchList = (props) => {
  const songListData = props.songListData

  return (
    <>
      {songListData.map((songData, index) => {
        return (
          <Box key={index} mb={1}>
            <ListCell songData={songData} songIndex={index + 1} />
            {index !== songListData.length - 1 ? <Divider pt={1} /> : null}
          </Box>
        )
      })}
    </>
  )
}
export default SongWatchList
