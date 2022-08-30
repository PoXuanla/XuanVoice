import { useEffect, useState } from 'react'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { getAllSongCategories } from '../../api/songCategory'

const SongCategorySelect = (props) => {
  const selectSongCategory = props.selectSongCategory
  const [songCategories, setSongCategories] = useState(null) //全部的歌曲分類

  //取得全部的歌曲分類
  useEffect(async () => {
    try {
      const response = await getAllSongCategories()
      setSongCategories(response.SongCategory)
    } catch (e) {}
  }, [])

    const selectSongCategoryHandler = (event) => {
      console.log(event.target.value)
    props.selectSongCategoryHandler(event.target.value)
  }
  return (
    <FormControl required sx={{ width: '100%' }}>
      <InputLabel id='selectLabel'>分類</InputLabel>
      <Select
        labelId='selectLabel'
        id='simpleSelect'
        defaultValue=''
        value={selectSongCategory}
        label='分類'
        onChange={selectSongCategoryHandler}
      >
        {songCategories
          ? songCategories.map((data, index) => {
              return (
                <MenuItem key={index} value={data._id}>
                  {data.name}
                </MenuItem>
              )
            })
          : null}
      </Select>
    </FormControl>
  )
}
export default SongCategorySelect
