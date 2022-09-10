import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
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
  Divider,
  TextField,
  Alert
} from '@mui/material'
import SimpleComfirmModal from './SimpleComfirmModal/SimpleComfirmModal'
import {
  createSongList,
  getListsAndCheckSongExistList,
  updateSongInSongList
} from '../api/songList'

const UserSongListModal = (props) => {
  const { show = false, songId } = props
  //show   (Boolean) => 是否顯示
  //songId (String)  => 歌曲ID
  const newSongListRef = useRef(null)
  const [checked, setChecked] = useState([])
  const [userSongList, setUserSongList] = useState([])
  const [showCreateSongList, setShowCreateSongList] = useState(false)
  const [createError, setCreateError] = useState('')

  const getSongLists = useCallback(async () => {
    console.log('song Change', songId)
    try {
      setCreateError('')
      const response = await getListsAndCheckSongExistList(songId)
      const newChecked = []
      for (let i = 0; i < response.songLists.length; i++) {
        if (response.songLists[i].hasThisSong) {
          newChecked.push(i)
        }
      }
      setUserSongList(response.songLists)
      setChecked(newChecked)
    } catch (e) {}
  }, [songId])

  useEffect(() => {
    if (show) getSongLists()
  }, [show, getSongLists])

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

  const onCancelHandler = useCallback(() => {
    props.onCancel()
  }, [])

  const ListItems = useMemo(() => {
    return userSongList.map((songList, index) => {
      console.log('listitem')
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
  }, [userSongList])

  const openCreateSongList = () => {
    setShowCreateSongList(true)
  }
  const createNewSongList = async () => {
    try {
      const listName = newSongListRef.current.value
      const data = {
        name: listName
      }
      const response = await createSongList(data)
      if (response.status === 'failed') {
        setCreateError(response.message)
        return
      }
      newSongListRef.current.value = ''
      setShowCreateSongList(false)
      getSongLists()
    } catch (e) {}
  }
  
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
        <Button
          variant='contained'
          onClick={openCreateSongList}
          sx={{ display: !showCreateSongList ? 'inline-block' : 'none', float: 'right' }}
        >
          立即建立歌單
        </Button>
        <Box sx={{ display: showCreateSongList ? 'block' : 'none' }}>
          <Typography variant='body1' sx={{ fontWeight: 700, mb: 2 }}>
            新建歌單
          </Typography>

          <TextField
            label='建立歌單'
            required
            variant='outlined'
            inputRef={newSongListRef}
            sx={{ mb: 2, width: '100%' }}
          />
          <Alert
            variant='filled'
            severity='error'
            icon={false}
            sx={{ display: createError.length > 0 ? 'block' : 'none', marginBottom: 2 }}
          >
            {createError}
          </Alert>
          <Button variant='contained' sx={{ float: 'right' }} onClick={createNewSongList}>
            建立
          </Button>
        </Box>
      </SimpleComfirmModal>
    </>
  )
}
export default React.memo(UserSongListModal)
