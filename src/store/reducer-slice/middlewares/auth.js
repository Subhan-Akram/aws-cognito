import {  createAsyncThunk } from '@reduxjs/toolkit'
import { signup,handleSignIn } from '../../../services/aws-cognito-auth/cognito-auth-functions'


export const SignIn = createAsyncThunk(
  'SignIn',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {
    // let navigate=useNavigate()
    const checkSignIn=(res)=>{
      console.log("runing>>>>>>>>>>>>",res?.user)
      if(res?.user==undefined){
        // return navigate("/signin",{ state: {thunkAPI} })
 return thunkAPI.navigate("/login-with-email",{ state:thunkAPI.phone })
     }else{
      // window.location.href("/login-with-email")
      
     }
    }
try{
  
const res=await handleSignIn(thunkAPI.phone);


// console.log("res.status",res,res./message,!res.user.username==thunkAPI.phone)
console.log("res?>",res,res?.user?.username==thunkAPI.phone)
if (!(res?.username)) {
  alert(res)

  checkSignIn(res)
  return rejectWithValue(`${res} error is showing `)

  // throw Error(res)
}else{
  thunkAPI.navigate("/")
  return fulfillWithValue(res)
}
}catch (err) {
  // alert(err)
  checkSignIn(err)
    throw rejectWithValue(err)
  // handle error here

}


})


export const SignUp = createAsyncThunk(
  'SignUp',
  async (thunkAPI,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {

try{
  
const res=await signup(thunkAPI.email,thunkAPI.phone);
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




