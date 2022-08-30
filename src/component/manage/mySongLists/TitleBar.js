import { useRef, useState } from 'react'
import { Typography, Button, TextField } from '@mui/material'
import { Wrapper } from './MySongListsStyle'
import SimpleComfirmModal from '../../SimpleComfirmModal'
import { createSongList } from '../../../api/songList'

const TitleBar = (props) => {
    
  const [showCreateModal, setShowCreateModal] = useState(false)
  const listNameRef = useRef()

  //關閉Modal
  const modalClose = (event, reason) => {
    // if (reason === 'backdropClick') {
    //   setShowCreateSongList(false)
    // }
    setShowCreateModal(false)
  }
  //建立歌曲
  const createSongListHandler = async () => {
    try {
      const songListName = listNameRef.current.value
      const data = {
        name: songListName
      }
      const response = await createSongList(data)
      props.getUserSongList()
      setShowCreateModal(false)
    } catch (e) {
      setShowCreateModal(false)
    }
  }
  return (
    <Wrapper>
      <Typography className='title' variant='h6'>
        歌單列表
      </Typography>
      <Button
        variant='contained'
        color='error'
        onClick={() => {
          setShowCreateModal(true)
        }}
      >
        新增歌單
      </Button>
      {/* 新建歌單 */}
      <SimpleComfirmModal
        show={showCreateModal}
        close={modalClose}
        title={'新增歌單'}
        confirmText={'建立'}
        cancelText={'取消'}
        onConfirm={createSongListHandler}
        onCancel={modalClose}
      >
        {
          <TextField
            id='filled-multiline-static'
            label='歌單名稱'
            inputRef={listNameRef}
            rows={4}
            sx={{ width: '100%', mb: 2 }}
          ></TextField>
        }
      </SimpleComfirmModal>
    </Wrapper>
  )
}
export default TitleBar
