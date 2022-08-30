import { useEffect } from 'react'

import { Typography, Breadcrumbs, Link } from '@mui/material'
import { useLocation, Link as RouterLink } from 'react-router-dom'

const BreadCrumbBar = (props) => {
  const TCBreadCrumbString = [] //繁體中文的麵包穴字串
  const breadCrumbString = useLocation().pathname.split('/').splice(1) //用於 BreakCrumb

  //Convert to Tranditional Chinese
  for (let i = 0; i < breadCrumbString.length; i++) {
    if (breadCrumbString[i] === 'manage') TCBreadCrumbString.push('音樂庫')
    if (breadCrumbString[i] === 'likes') TCBreadCrumbString.push('我的喜歡')
    if (breadCrumbString[i] === 'song') TCBreadCrumbString.push('我的作品')
    if (breadCrumbString[i] === 'songlists') TCBreadCrumbString.push('我的歌單')
    if (breadCrumbString[i] === 'upload') TCBreadCrumbString.push('上傳')
    if (breadCrumbString[i] === 'edit') TCBreadCrumbString.push('編輯歌曲')
  }
  if (breadCrumbString.length == 1) TCBreadCrumbString.push('我的喜歡')

  //Change Menu Selected when Url Pathname Change
  useEffect(() => {
    if (breadCrumbString[1] === undefined) props.changeSelectedIndex(0)
    if (breadCrumbString[1] === 'likes') props.changeSelectedIndex(0)
    if (breadCrumbString[1] === 'songlists') props.changeSelectedIndex(1)
    if (breadCrumbString[1] === 'song') props.changeSelectedIndex(2)
  }, [useLocation().pathname])

  const BreadCrumbData = TCBreadCrumbString.map((data, index) => {
    if (index === TCBreadCrumbString.length - 1) {
      return (
        <Typography key={index} color='text.primary'>
          {data}
        </Typography>
      )
    }
    if (index === 1) {
      let link = `/${breadCrumbString[0]}` + `/${breadCrumbString[1]}`
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
        to={`/${breadCrumbString[index]}`}
      >
        <Typography key={index} color='text.primary' variant='body1' sx={{ fontWeight: 700 }}>
          {data}
        </Typography>
      </Link>
    )
  })
  return (
    <Breadcrumbs aria-label='breadcrumb' sx={{ marginBottom: 2 }}>
      {BreadCrumbData}
    </Breadcrumbs>
  )
}
export default BreadCrumbBar
