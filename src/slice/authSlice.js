import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setLoading, clearLoading } from './loadSlice'

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
      return thunkAPI.fulfillWithValue({ user: responseData.user })
    } else {
      return thunkAPI.rejectWithValue({ message: responseData.message })
    }
  } catch (error) {
    thunkAPI.dispatch(clearLoading())
    return thunkAPI.rejectWithValue({ message: '請求錯誤' })
  }
})
export const validAccessToken = createAsyncThunk(
  'auth/validAccessToken',
  async ({ accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/users/test`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      const responseData = response.data
      if (responseData.status === 'success') {
        return { user: responseData.user }
      } else {
        return thunkAPI.rejectWithValue()
      }
    } catch (err) {
      return thunkAPI.rejectWithValue()
    }
  }
)
export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading())
    const response = await axios.post(`http://localhost:80/api/v1/users`, data, {
      headers: {
        'Content-Type': `multipart/form-data;`
      }
    })
    thunkAPI.dispatch(clearLoading())
    const responseData = response.data
    if (responseData.status === 'success') {
      localStorage.setItem('accessToken', responseData.token)
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
    isLoggedIn: localStorage.getItem('accessToken') ? true : false,
    user: {} //
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('accessToken')
      state.isLoggedIn = false
      state.user = {}
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
    [validAccessToken.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      // return { ...initialState, user: action.payload.user }
      state.user = action.payload.user
    },
    [validAccessToken.rejected]: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
    },
    [register.rejected]: (state) => {
      state.isLoggedIn = false
      state.user = {}
    }
  }
})
const { reducer, actions } = authSlice
export const { logout } = actions
export default reducer
