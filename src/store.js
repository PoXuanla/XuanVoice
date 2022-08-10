import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import loadSlice from './slice/loadSlice'
import modeSlice from './slice/modeSlice'
export default configureStore({
  reducer: {
    auth: authSlice,
    load: loadSlice,
    mode: modeSlice
  }
})
