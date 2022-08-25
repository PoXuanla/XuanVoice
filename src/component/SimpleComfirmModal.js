import { Modal, Box, Typography, Button } from '@mui/material'

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
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 300,
          width: '70%',
          bgcolor: 'background.paper',
          outline: 'none',
          boxShadow: 24,
          borderRadius: 2
        }}
      >
        {/* Title */}
        <Typography
          id='modal-modal-title'
          variant='body1'
          component='h2'
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            p: 2,
            pb: 0,
            bgcolor: 'primary',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
          }}
        >
          {title}
        </Typography>
        <Box sx={{ p: 2 }}>
          {/* Content */}
          <Box sx={{ mb: 1, color: 'text.primary' }}>{props.children}</Box>
          {/* Footer */}
          <Box sx={{ textAlign: 'right', display: noFooter ? 'none' : 'block' }}>
            <Button variant='contained' onClick={onConfirmHandler}>
              {confirmText}
            </Button>
            <Button variant='outlined' color='secondary' sx={{ ml: 1 }} onClick={onCancelHandler}>
              {cancelText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
export default SimpleComfirmModal
