import { createSlice } from '@reduxjs/toolkit'

const loadSlice = createSlice({
  name: 'mode',
  initialState: {
    mode: localStorage.getItem('mode') || 'light'
  },
  reducers: {
    toggleMode: (state, action) => {
      if (state.mode === 'light') {
        localStorage.setItem('mode', 'dark')
        state.mode = 'dark'
      } else {
        localStorage.setItem('mode', 'light')
        state.mode = 'light'
      }
    }
  }
})

const { reducer, actions } = loadSlice
export const { toggleMode } = actions
export default reducer
