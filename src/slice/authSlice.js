import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setLoading, clearLoading } from './loadSlice'
import { checkTokenValid } from '../api/user'

export const login = createAsyncThunk('auth/login', async ({ account, password }, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading())
    const JSONData = JSON.stringify({ account, password })
    const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/users/login`, JSONData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    thunkAPI.dispatch(clearLoading())

    const responseData = response.data
    if (responseData.status === 'success') {
      localStorage.setItem('accessToken', responseData.token)
      localStorage.setItem('isLoggedIn', true)
      return thunkAPI.fulfillWithValue({ user: responseData.user })
    } else {
      return thunkAPI.rejectWithValue({ message: responseData.message })
    }
  } catch (error) {
    thunkAPI.dispatch(clearLoading())
    return thunkAPI.rejectWithValue({ message: '請求錯誤' })
  }
})
export const validAccessToken = createAsyncThunk('auth/validAccessToken', async (thunkAPI) => {
  try {
    const response = await checkTokenValid()
    let user = { user: response.user }
    localStorage.setItem('isLoggedIn', true)
    return user
  } catch (e) {
    thunkAPI.rejectWithValue()
  }
})
export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading())
    const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/users`, data, {
      headers: {
        'Content-Type': `multipart/form-data;`
      }
    })
    thunkAPI.dispatch(clearLoading())
    const responseData = response.data
    if (responseData.status === 'success') {
      localStorage.setItem('accessToken', responseData.token)
      localStorage.setItem('isLoggedIn', true)
      return { user: responseData.user }
    } else {
      return thunkAPI.rejectWithValue({ message: responseData.message })
    }
  } catch (e) {
    return thunkAPI.rejectWithValue({ message: '未知的錯誤!' })
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} 
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('isLoggedIn')
      state.user = {}
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user
    },
    [login.rejected]: (state) => {
      state.user = {}
    },
    [validAccessToken.fulfilled]: (state, action) => {
      state.user = action.payload.user
    },
    [validAccessToken.rejected]: (state) => {
      state.user = {}
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload.user
    },
    [register.rejected]: (state) => {
      state.user = {}
    }
  }
})
const { reducer, actions } = authSlice
export const { logout } = actions
export default reducer
