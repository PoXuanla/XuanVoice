import React, { useState } from 'react'
import { TextField } from '@mui/material'

const RegisterFields = React.forwardRef((props, ref) => {
  const { accountRef, passwordRef, nameRef, introRef } = ref.current
  return (
    <>
      <TextField
        id='account'
        label='帳號'
        size='small'
        required
        autoComplete='off'
        inputProps={{ minLength: 6 }}
        inputRef={accountRef}
      />
      <TextField
        id='password'
        label='密碼'
        required
        size='small'
        autoComplete='off'
        inputRef={passwordRef}
        inputProps={{ minLength: 6 }}
      />
      <TextField
        id='name'
        label='暱稱'
        required
        size='small'
        type='password'
        autoComplete='off'
        inputRef={nameRef}
        inputProps={{ minLength: 2 }}
      />
      <TextField id='intro' label='自我介紹' multiline inputRef={introRef} />
    </>
  )
})
export default RegisterFields
