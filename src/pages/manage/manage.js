import {
  Box,
  Container,
  Grid,
  Item,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Breadcrumbs,
  Link
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { borderRadius } from '@mui/system'
import { Outlet, Route, Routes, useLocation, Link as RouterLink } from 'react-router-dom'
import Like from './like'

const Manage = () => {
  const [selectMenuIndex, setSelectMenuIndex] = useState(0)
  const breakCrumbString = useLocation().pathname.split('/').splice(1) //用於 BreakCrumb
  const TCBreakCrumbString = []


  //Convert to Tranditional Chinese
  for (let i = 0; i < breakCrumbString.length; i++) {
    if (breakCrumbString[i] === 'manage') TCBreakCrumbString.push('音樂庫')
    if (breakCrumbString[i] === 'likes') TCBreakCrumbString.push('我的喜歡')
    if (breakCrumbString[i] === 'song') TCBreakCrumbString.push('我的作品')
    if (breakCrumbString[i] === 'songlist') TCBreakCrumbString.push('我的歌單')
    if (breakCrumbString[i] === 'upload') TCBreakCrumbString.push('上傳')
    if (breakCrumbString[i] === 'edit') TCBreakCrumbString.push('編輯歌曲')
  }
  if (breakCrumbString.length == 1) TCBreakCrumbString.push('我的喜歡')

  //Change Menu Selected when Url Pathname Change
  useEffect(() => {
    if (breakCrumbString[1] === undefined) setSelectMenuIndex(0)
    if (breakCrumbString[1] === 'likes') setSelectMenuIndex(0)
    if (breakCrumbString[1] === 'songlist') setSelectMenuIndex(1)
    if (breakCrumbString[1] === 'song') setSelectMenuIndex(2)
  }, [useLocation().pathname])

  const BreakCrumbData = TCBreakCrumbString.map((data, index) => {
    if (index === TCBreakCrumbString.length - 1) {
      return (
        <Typography key={index} color='text.primary'>
          {data}
        </Typography>
      )
    }
    if (index === 1) {
      let link = `/${breakCrumbString[0]}/${breakCrumbString[1]}`
      return (
        <Link key={index} underline='hover' color='inherit' component={RouterLink} to={link}>
          <Typography key={index} color='text.primary' variant='body1' sx={{ fontWeight: 700 }}>
            {data}
          </Typography>
        </Link>
      )
    }
    return (
      <Link
        key={index}
        underline='hover'
        color='inherit'
        component={RouterLink}
        to={`/${breakCrumbString[index]}`}
      >
        <Typography key={index} color='text.primary' variant='body1' sx={{ fontWeight: 700 }}>
          {data}
        </Typography>
      </Link>
    )
  })

  const CurrentMenuHandler = (index) => (event) => {
    setSelectMenuIndex(index)
  }
  return (
    <Container
      maxWidth={false}
      sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 68.5px)', height: '100%' }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            padding: 2
          }}
        >
          <Box
            sx={{
              padding: 2,
              boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
              borderRadius: 2,
              bgcolor: 'action.hover'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              音樂庫
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant={selectMenuIndex === 0 ? 'contained' : 'text'}
                size='small'
                component={RouterLink}
                to='/manage/likes'
                onClick={CurrentMenuHandler(0)}
              >
                我的喜歡
              </Button>
              <Button
                variant={selectMenuIndex === 1 ? 'contained' : 'text'}
                size='small'
                component={RouterLink}
                to='/manage/songlist'
                onClick={CurrentMenuHandler(1)}
              >
                我的歌單
              </Button>
              <Button
                variant={selectMenuIndex === 2 ? 'contained' : 'text'}
                size='small'
                component={RouterLink}
                to='/manage/song'
                onClick={CurrentMenuHandler(2)}
              >
                我的作品
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            padding: 2
          }}
        >
          <Breadcrumbs aria-label='breadcrumb' sx={{ marginBottom: 2 }}>
            {BreakCrumbData}
          </Breadcrumbs>
          <Box
            sx={{
              boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
              padding: 2,
              borderRadius: 2,
              bgcolor: 'action.hover'
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Manage
