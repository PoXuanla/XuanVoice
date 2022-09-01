import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import { DragHandle } from '@mui/icons-material'
import { Wrapper, RankStyle, CellAvatar, SongInfoStyle, SongItemStyle } from './ListCellStyle'
const ListCell = (props) => {
  const { songData = {}, songIndex, rank = null, divider = false } = props
  const children = props.children
  // songData  (Object)  => 歌曲資料 { name, image, author:{name, account} }
  // songIndex (Number)  => 歌曲索引
  // rank      (Boolean) => 歌曲前方顯示數字
  // isLoading (Boolean) => 正在載入中
  // divider   (Boolean) => 分隔線
  return (
    <Box sx={{ width: '100%' }}>
      <Wrapper>
        <SongItemStyle>
          {/* 顯示Rank(Index) */}
          {rank && (
            <RankStyle>
              <Typography variant='body1'>{songIndex}</Typography>
            </RankStyle>
          )}
          {/* 圖片 */}
          <CellAvatar variant='rounded' src={`${songData.image}}`}></CellAvatar>
          {/* 歌曲名稱、作者 */}
          <SongInfoStyle>
            <Typography variant='subtitle2' className='text-songname'>
              {songData.name}
            </Typography>
            <Typography variant='caption' className='text-author'>
              {songData.author.name}
            </Typography>
          </SongInfoStyle>
        </SongItemStyle>
        {/* ToolBar */}
        {children}
      </Wrapper>
      {divider && <Divider mt={1} mb={1} sx={{ mt: 1, mb: 1 }} />}
    </Box>
  )
}
export default ListCell
