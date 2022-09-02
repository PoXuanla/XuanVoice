import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validAccessToken } from '../slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import MainCarousel from '../component/Main/MainCarousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import MainCardGrid from '../component/Main/MainCardGrid'
import AuditionModal from '../component/Main/AuditionModal'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  // carousel
  // last three

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken')
  //   if (accessToken) {
  //     dispatch(validAccessToken({ accessToken }))
  //       .unwrap()
  //       .then(() => {
  //         console.log('success')
  //         navigate('/')
  //       })
  //       .catch(() => {
  //         console.log('faled')
  //         navigate('/login')
  //       })
  //   } else {
  //     console.log('failed')
  //     navigate('/login')
  //   }
  // }, [])
  return (
    <Container sx={{ p: 2 }}>
      <MainCarousel />
      <MainCardGrid />
      <AuditionModal />
    </Container>
  )
}
export default Main
