import { createSlice } from '@reduxjs/toolkit'

const loadSlice = createSlice({
  name: 'load',
  initialState: {
    isLoading: false
  },
  reducers: {
    setLoading: (state, action) => {
      return { isLoading: true }
    },
    clearLoading: (state, action) => {
      state.isLoading = false
    }
  }
})

const { reducer, actions } = loadSlice
export const { setLoading, clearLoading } = actions
export default reducer
