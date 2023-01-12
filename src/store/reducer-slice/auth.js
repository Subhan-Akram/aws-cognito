
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signUp } from '../../services/aws-cognito-auth/cognito-auth-functions'
const initialState = {
  userLoggedIn: false,
  signup_status:false,
  userCredentials:{
    email:"",
    phoneNumber:"",
    authToken:"",
    loading:false,
    err:""
  },user:{}
}
export const SignUp = createAsyncThunk(
  'SignUp',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  
const res=await signUp(thunkAPI.email,thunkAPI.phone);
// console.log("res.status",res,res./message,!res.user.username==thunkAPI.phone)
if (!res.user.username==thunkAPI.phone) {

  console.log("rejected >>>>")
  // return rejectWithValue(`${res} error is showing `)

  throw Error(res)
}
return fulfillWithValue(res)
}catch (err) {
  alert(err)
    throw rejectWithValue(err)
  // handle error here

}


})












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
  },
})

// Action creators are generated for each case reducer function
export const {authActions} = auth.actions

export default auth.reducer