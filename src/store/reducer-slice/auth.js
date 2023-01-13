
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { SignIn,SignUp } from './middlewares/auth'
const initialState = {
  userLoggedIn: false,
  signUp_status:false,
  signInErr:"",
  signIn:false,
  userCredentials:{
    email:"",
    phoneNumber:"",
    authToken:"",
    loading:false,
  
  },user:{}
}








export const auth = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signin:(state)=>state

  },
  
  extraReducers: {
    [SignUp.pending]: (state) => {
      state.loading = true
    },
    [SignUp.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload
      state.signUp_status=true
      state.user={payload}
    },
    [SignUp.rejected]: (state,{payload}) => {
      state.loading = false
      state.userCredentials.err=payload
    },







    [SignIn.pending]: (state) => {
      state.loading = true
    },
    [SignIn.fulfilled]: (state, { payload }) => {
      console.log("user >",payload)
      state.loading = false
      state.signIn=true
      state.user={payload}
    },
    [SignIn.rejected]: (state,{payload}) => {
      state.loading = false
      state.signIn=false
      state.userCredentials.err=payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {authActions} = auth.actions

export default auth.reducer