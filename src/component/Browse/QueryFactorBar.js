import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { Typography, Box, Button, Divider, Skeleton } from '@mui/material'
import { getAllSongCategories } from '../../api/songCategory'
import { setLoading, clearLoading } from '../../slice/loadSlice'

const QueryFactorBarStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  '& .boxContainer': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  '& .MuiTypography-h6': {
    fontWeight: 700,
    textAlign: 'left',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1)
  },
  '& .MuiDivider-root': {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))
const QueryFactorBtn = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: '4px 10px',
  borderRadius: '20px',

  '&.MuiButton-contained': {
    border: `1px solid ${theme.palette.primary.main}`
  }
}))
const QueryFactorSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: '20px',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),

  '& .MuiButton-root': {
    marginRight: 0,
    marginBottom: 0,
    padding: '4px 10px',
    borderRadius: '20px',
    border: `1px solid ${theme.palette.primary.main}`
  }
}))
const QueryFactorBar = (props) => {
  const [isLoading,setLoading] = useState(false)
  const [songCategories, setSongCategories] = useState([])
  useEffect(async () => {
    setLoading(true)
    const response = await getAllSongCategories()
    const songCategory = response.SongCategory
    songCategory.splice(0, 0, { name: '全部', _id: 'all' })
    setSongCategories(songCategory)
    setLoading(false)
  }, [])
  const [selectedCtyIndex, setSelectedCtyIndex] = useState(0)
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0)

  const setSelectedCtyHandler = (index) => () => {
    setSelectedCtyIndex(index)
    props.reloadSongs(songCategories[index]._id)
  }
  const setSelectedOrderHandler = (index) => () => {
    setSelectedOrderIndex(index)
  }
  const SongCategoryBtn = songCategories.map((category, index) => {
    return (
      <QueryFactorBtn
        key={index}
        size='small'
        color='primary'
        variant={index === selectedCtyIndex ? 'contained' : 'outlined'}
        onClick={setSelectedCtyHandler(index)}
      >
        {category.name}
      </QueryFactorBtn>
    )
  })
  const QueryOrderBtn = ['最多喜歡', '最新'].map((x, index) => {
    return (
      <QueryFactorBtn
        key={index}
        size='small'
        variant={index === selectedOrderIndex ? 'contained' : 'outlined'}
        onClick={setSelectedOrderHandler(index)}
      >
        {x}
      </QueryFactorBtn>
    )
  })
  const SkeletonBtn = ['全部類型', '測資', '測資', '測資'].map((name, index) => (
    <QueryFactorSkeleton variant='rectangular' key={index}>
      <Button size='small'>12</Button>
    </QueryFactorSkeleton>
  ))
  return (
    <QueryFactorBarStyle>
      <Typography variant='h6'>類型</Typography>
      <Box className='boxContainer'>{isLoading ? SkeletonBtn : SongCategoryBtn}</Box>
      <Divider />
      <Typography variant='h6'>排序</Typography>
      <Box className='boxContainer'>{QueryOrderBtn}</Box>
    </QueryFactorBarStyle>
  )
}
export default QueryFactorBar
