import { useEffect, useState } from 'react'

import { Typography, Breadcrumbs, Link } from '@mui/material'
import { useLocation, Link as RouterLink } from 'react-router-dom'

const Location = [
  { location: '/manage', name: '音樂庫' },
  { location: '/manage/likes', name: '我的喜歡' },
  { location: '/manage/songlists', name: '我的歌單' },
  { location: '/manage/songlists/:id', name: '歌單' },
  { location: '/manage/song', name: '我的作品' },
  { location: '/manage/song/upload', name: '上傳' },
  { location: '/manage/song/:id/edit', name: '編輯歌曲' }
]
const BreadCrumbBar = (props) => {
  let breadCrumbString = useLocation().pathname.split('/').splice(1)
  const [processUrlArray, setprocessUrlArray] = useState([])

  useEffect(() => {
    console.log(replaceIdtoString())
    let UrlArray = replaceIdtoString()
    setprocessUrlArray(UrlArray)
  }, [useLocation().pathname])

  //先把id替換為':id'
  const replaceIdtoString = () => {
    let NewBreadCrumbString = ''
    for (let i = 0; i < breadCrumbString.length; i++) {
      if (breadCrumbString[i].length > 20) NewBreadCrumbString += '/:id'
      else {
        NewBreadCrumbString += `/${breadCrumbString[i]}`
      }
    }
    return NewBreadCrumbString.split('/').splice(1)
  }
  const getAllLocation = () => {
    return Location.map((item) => item.location)
  }
  //再來比對location的字串
  const BreadCrumbItem = processUrlArray.map((item, index) => {
    let Alllocation = getAllLocation()
    let newString = ''
    for (let i = 0; i <= index; i++) {
      newString += `/${processUrlArray[i]}`
    }
    if (Alllocation.includes(newString)) {
      const locationIndex = Alllocation.indexOf(newString)
      return index === processUrlArray.length - 1 ? (
        <Typography key={index} color='text.primary'>
          {Location[locationIndex].name}
        </Typography>
      ) : (
        <Link
          key={index}
          underline='hover'
          component={RouterLink}
          to={Location[locationIndex].location}
        >
          <Typography color='text.primary' variant='body1' sx={{ fontWeight: 700 }}>
            {Location[locationIndex].name}
          </Typography>
        </Link>
      )
    }
  })
  return (
    <Breadcrumbs aria-label='breadcrumb' sx={{ marginBottom: 2 }}>
      {BreadCrumbItem}
    </Breadcrumbs>
  )
}
export default BreadCrumbBar
