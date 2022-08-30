import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import { DragHandle } from '@mui/icons-material'

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
      <Box
        pr={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* 顯示Rank(Index) */}
          {rank && (
            <Box
              sx={{
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography color='text.primary' variant='body1' mr={1}>
                {songIndex}
              </Typography>
            </Box>
          )}

          {/* 圖片 */}
          <Avatar
            variant='rounded'
            sx={{
              width: 50,
              height: 50,
              boxShadow: 3
            }}
            src={`${songData.image}?${Math.random()}`}
          ></Avatar>
          {/* 歌曲名稱、作者 */}
          <Box
            ml={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography variant='subtitle2' sx={{ fontWeight: 700, color: 'text.primary' }}>
              {songData.name}
            </Typography>
            <Typography variant='caption' sx={{ fontWeight: 400, color: 'text.secondary' }}>
              {songData.author.name}
            </Typography>
          </Box>
        </Box>
        {/* ToolBar */}
        {children}
      </Box>
      {divider && <Divider mt={1} mb={1} sx={{ mt: 1, mb: 1 }} />}
    </Box>
  )
}
export default ListCell
