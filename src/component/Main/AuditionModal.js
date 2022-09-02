import { Box, Typography, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import SimpleComfirmModal from '../SimpleComfirmModal/SimpleComfirmModal'
import { replaceSongListData, openPlayer } from '../../slice/musicplayerSlice'
import { useDispatch } from 'react-redux'

const AuditionModal = () => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(true)
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const showAuditionModal = localStorage.getItem('showAuditionModal')
    if (showAuditionModal === null) {
      setShowModal(true)
      localStorage.setItem('showAuditionModal', false)
    } else if (showAuditionModal === 'true') {
      setShowModal(true)
      localStorage.setItem('showAuditionModal', false)
    } else {
      setShowModal(false)
      localStorage.setItem('showAuditionModal', false)
    }
  }, [])
  const changeShowNextTime = (e) => {
    //不再顯示
    if (!isChecked === true) {
      localStorage.setItem('showAuditionModal', false)
    } else {
      //顯示
      localStorage.setItem('showAuditionModal', true)
    }
    setIsChecked((checked) => !checked)
  }
  const playMusic = () => {
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

    if (isChecked === true) {
      localStorage.setItem('showAuditionModal', false)
    } else {
      //顯示
      localStorage.setItem('showAuditionModal', true)
    }
  }
  const modalClose = () => {
    if (isChecked === true) {
      localStorage.setItem('showAuditionModal', false)
    } else {
      //顯示
      localStorage.setItem('showAuditionModal', true)
    }
    setShowModal(false)
  }

  return (
    <SimpleComfirmModal
      show={showModal}
      title={'通知'}
      confirmText={'很想試聽!'}
      cancelText={'取消'}
      onConfirm={playMusic}
      onCancel={modalClose}
    >
      {
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body1' sx={{ fontWeight: 700 }}>
            試聽熱門單曲
          </Typography>
          不再顯示
          <Checkbox checked={isChecked} onChange={changeShowNextTime} />
        </Box>
      }
    </SimpleComfirmModal>
  )
}

export default AuditionModal
