import React, { useState } from 'react'
import { TextField } from '@mui/material'

const LoginFields = React.forwardRef((props, ref) => {
  const { accountRef, passwordRef } = ref.current
  return (
    <>
      <TextField
        id='account'
        label='帳號'
        required
        autoComplete='off'
        inputProps={{ minLength: 6 }}
        inputRef={accountRef}
      />
      <TextField
        id='password'
        label='密碼'
        required
        type='password'
        autoComplete='off'
        inputProps={{ minLength: 6 }}
        inputRef={passwordRef}
      />
    </>
  )
})
export default LoginFields
