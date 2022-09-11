import React from 'react'
import { Container } from '@mui/material'
import MainCarousel from '../component/Main/MainCarousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import MainCardGrid from '../component/Main/MainCardGrid'
import AuditionModal from '../component/Main/AuditionModal'

const Main = () => {

  return (
    <Container sx={{ p: 2 }}>
      <MainCarousel />
      <MainCardGrid />
      <AuditionModal />
    </Container>
  )
}
export default Main
