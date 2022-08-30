import { useEffect, useState } from 'react'

import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
  Divider
} from '@mui/material'
import SimpleComfirmModal from './SimpleComfirmModal/SimpleComfirmModal'
import { getListsAndCheckSongExistList, updateSongInSongList } from '../api/songList'

const UserSongListModal = (props) => {
  const { show = false, songId } = props
  //show   (Boolean) => 是否顯示
  //songId (String)  => 歌曲ID

  const [checked, setChecked] = useState([])
  const [userSongList, setUserSongList] = useState([])

  useEffect(async () => {
    try {
      if (show) {
        const response = await getListsAndCheckSongExistList(songId)
        const newChecked = []
        for (let i = 0; i < response.songLists.length; i++) {
          if (response.songLists[i].hasThisSong) {
            newChecked.push(i)
          }
        }
        setUserSongList(response.songLists)
        setChecked(newChecked)
      }
    } catch (e) {}
  }, [show])

  const handleToggle = (value) => async () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      let data = {
        action: 'add',
        songId: songId
      }
      newChecked.push(value)
      setChecked(newChecked)
      await updateSongInSongList(userSongList[value]._id, data).then((data) => {})
    } else {
      let data = {
        action: 'delete',
        songId: songId
      }
      newChecked.splice(currentIndex, 1)
      setChecked(newChecked)
      await updateSongInSongList(userSongList[value]._id, data).then((data) => {})
    }
  }
  const onCancelHandler = () => {
    props.onCancel()
  }
  const ListItems = userSongList.map((songList, index) => {
    const labelId = `checkbox-list-secondary-label-${index}`
    return (
      <div key={index}>
        <ListItem
          key={songList._id}
          secondaryAction={
            <Checkbox
              edge='end'
              color='secondary'
              onChange={handleToggle(index)}
              checked={checked.indexOf(index) !== -1}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          }
          disablePadding
        >
          <ListItemButton onClick={handleToggle(index)} key={index}>
            <ListItemText
              sx={{ color: 'text.primary' }}
              id={labelId}
              primary={`${songList.name}`}
            />
          </ListItemButton>
        </ListItem>
        <Divider key={index} />
      </div>
    )
  })
  return (
    <>
      <SimpleComfirmModal show={show} title={'加入歌單'} onCancel={onCancelHandler} noFooter>
        {
          <List
            dense
            sx={{
              width: '100%',
              maxWidth: 360,
              maxHeight: 300,
              overflow: 'auto',
              bgcolor: 'background.paper'
            }}
          >
            {ListItems}
          </List>
        }
      </SimpleComfirmModal>
    </>
  )
}
export default UserSongListModal
