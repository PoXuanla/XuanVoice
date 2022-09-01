import { useEffect, useState } from 'react'
import { Typography, Box, Button, Divider } from '@mui/material'
import { getAllSongCategories } from '../../api/songCategory'
import { QueryFactorBarStyle, QueryFactorBtn, QueryFactorSkeleton } from './BrowseStyle'

const QueryFactorBar = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [songCategories, setSongCategories] = useState([])
  const [selectedCtyIndex, setSelectedCtyIndex] = useState(0)
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0)

  useEffect(async () => {
    setLoading(true)
    const response = await getAllSongCategories()
    const songCategory = response.SongCategory
    songCategory.splice(0, 0, { name: '全部', _id: 'all' })
    setSongCategories(songCategory)
    setLoading(false)
  }, [])

  const setSelectedCtyIdHandler = (index) => () => {
    setSelectedCtyIndex(index)
    props.setSelectedCtyId(songCategories[index]._id)
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
        onClick={setSelectedCtyIdHandler(index)}
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
