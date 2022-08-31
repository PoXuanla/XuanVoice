import React, { useState } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import { Box, Container, Grid } from '@mui/material'
import MenuGridItem from '../../component/Manage/Manage/MenuGridItem'
import BreadCrumbBar from '../../component/Manage/Manage/BreadCrumbBar'
import { OutletBox } from '../../component/Manage/Manage/ManageStyle'

const Manage = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={3} padding={2}>
          {/* MenuList */}
          <MenuGridItem />
        </Grid>
        {/* 右邊Content */}
        <Grid item xs={12} sm={9} padding={2}>
          {/* 麵包屑導航 */}
          <BreadCrumbBar />
          {/* Outlet */}
          <OutletBox>
            <Outlet />
          </OutletBox>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Manage
