import { Box, Typography, Checkbox } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import SimpleComfirmModal from '../SimpleComfirmModal/SimpleComfirmModal'
import { replaceSongListData, openPlayer } from '../../slice/musicplayerSlice'
import { useDispatch } from 'react-redux'

const AuditionModal = () => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(true) //是否點擊「不再顯示」
  const [showModal, setShowModal] = useState(true) //顯示試聽紐

  useEffect(() => {
    const showAuditionModal = localStorage.getItem('showAuditionModal')
    if (showAuditionModal === null) {
      setShowModal(true)
    } else if (showAuditionModal === 'true') {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [])
  
  useEffect(() => {
    if (isChecked) localStorage.setItem('showAuditionModal', false)
    else localStorage.setItem('showAuditionModal', true)
  }, [isChecked])

  const changeShowNextHandler = (e) => {
    setIsChecked((checked) => !checked)
  }
  const playMusicHandler = useCallback(() => {
    const data = {
      _id: '6311917e30162259b87e5ae8',
      name: 'Never Gonna Give You Up',
      intro: '這首單曲在家鄉英國得到五週榜首，成為年度銷售冠軍，並且獲得全英音樂獎的最佳英國歌曲。',

      author: {
        account: 'xuanxuan',
        name: 'Rick Astley',
        image: 'https://storage.googleapis.com/xuan-voive.appspot.com/userImg/xuanxuan.jpg'
      },
      image:
        'https://storage.googleapis.com/xuan-voive.appspot.com/songImg/6311917e30162259b87e5ae8.jpg',
      mp3: 'https://storage.googleapis.com/xuan-voive.appspot.com/song/6311917e30162259b87e5ae8.mp3'
    }
    dispatch(replaceSongListData([data]))
    dispatch(openPlayer())
    setShowModal(false)
  }, [])
  const modalCloseHandler = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <SimpleComfirmModal
      show={showModal}
      title={'通知'}
      confirmText={'很想試聽!'}
      cancelText={'取消'}
      onConfirm={playMusicHandler}
      onCancel={modalCloseHandler}
    >
      {
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body1' sx={{ fontWeight: 700 }}>
            試聽熱門單曲
          </Typography>
          不再顯示
          <Checkbox checked={isChecked} onChange={changeShowNextHandler} />
        </Box>
      }
    </SimpleComfirmModal>
  )
}

export default AuditionModal
