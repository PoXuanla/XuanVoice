import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validAccessToken } from '../slice/authSlice'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
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
  return <>main</>
}
export default Main
