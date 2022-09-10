import React from 'react'
import { Modal, Button } from '@mui/material'
import { Wrapper, Title, Content, Footer } from './SimpleModalStyle'

const SimpleComfirmModal = (props) => {
  const { show = false, title = '', confirmText = '', cancelText = '', noFooter = false } = props
  // show        (Boolean) =>  顯示modal
  // title       (String)  =>  Modal名稱
  // confirmText (String)  => 「確認」按鈕文字
  // cancelText  (String)  => 「取消」按鈕文字
  // noFooter    (Boolean) =>  不需要Footer (無確認、取消按鈕)
  
  const onConfirmHandler = () => {
    props.onConfirm()
  }
  const onCancelHandler = () => {
    props.onCancel()
  }
  return (
    <Modal
      open={show}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      onClose={onCancelHandler}
    >
      <Wrapper>
        {/* Title */}
        <Title id='modal-modal-title' variant='body1' component='h2'>
          {title}
        </Title>

        {/* Content */}
        <Content>{props.children}</Content>
        {/* Footer */}
        <Footer noFooter={noFooter}>
          <Button variant='contained' onClick={onConfirmHandler}>
            {confirmText}
          </Button>
          <Button variant='outlined' color='secondary' sx={{ ml: 1 }} onClick={onCancelHandler}>
            {cancelText}
          </Button>
        </Footer>
        {/* </Box> */}
      </Wrapper>
    </Modal>
  )
}
export default React.memo(SimpleComfirmModal)
