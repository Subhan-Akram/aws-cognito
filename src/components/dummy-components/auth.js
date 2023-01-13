import React from 'react'
import { Auth ,Amplify } from 'aws-amplify';
import { useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SignUp} from '../../store/reducer-slice/middlewares/auth'

const { Magic } = require('magic-sdk');

function AuthDummy() {
  Amplify.configure({
    Auth: {
      region: 'us-east-1', // your cognito region
      userPoolId: 'us-east-1_RrkHDEuVx',  // your user pool id
      userPoolWebClientId: '3ksrmoeiudsmngddimbv6i1udo', // your app client id
  }
  });
  const fetchUser = async (userId) => {
    // try {
    //     const user = await Auth.currentUserInfo();
    //     console.log("res user >>>>>>>>>>>",user);
    //     return user;
    // } catch (error) {
    //     console.log("err : >>>>>>>>>>>>",error);
    // }
    try {
   let res=await m.auth.loginWithEmailOTP({ email: 'subhan.akram1971@gmail.com' });  
    // await m.auth.loginWithMagicLink({ email: 'subhan.akram2400@gmail.com' });
   console.log("res>",res)
    } catch (err){
      console.log("err",err)
    }
      // Handle errors if required!
    
    
};
  const count = useSelector((state) => state?.auth)
  let dispatch=useDispatch();
  useEffect(() => {

    return ()=>{
      fetchUser("0837e78e-3a35-4bc4-97e2-b37fb35e7524")
      
      console.log("run")
  } },[]);
  
  console.log("redux count : ",count)
  let codeRef=useRef(null);
  let emailRef=useRef(null);
  let phoneRef=useRef(null);
  
  // console.log("phone>>>",phone)
  const resendCode = async (phoneNumber) => {
    try {
        await Auth.resendSignUp(phoneNumber);
        console.log("Code Resent");
    } catch (error) {
        console.log(error);
    }
}

      const handleConfirmSignUp = async () => {
        try {
          // console.log("verification code ",ref.current.value)
          let code=codeRef.current.value
            const confirmSignUpResponse = await Auth.confirmSignUp(`+${phoneRef.current.value}`,code);
            console.log(confirmSignUpResponse);
        } catch (error) {
            console.log("CODE ",error);
        }
    };
  const signUp=async()=>{
        try {
        
          const signUpResponse = await Auth.signUp({
              username:`+${phoneRef.current.value}`,
              password:`${phoneRef.current.value}-${emailRef.current.value}-A`, // temporary password
              attributes: {
                  email:emailRef.current.value,
                  phone_number:`+${phoneRef.current.value}`
              },
              validationData: [],
              autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
          });
          console.log(signUpResponse);
        
      } catch (error) {
          console.log(error);
      }

  }
  const handleSignIn = async (phoneNumber) => {
    try {
        const signInResponse = await Auth.signIn(`+${phoneRef.current.value}`,`${phoneRef.current.value}-${emailRef.current.value}-A`); // temporary password
        // setIsLoggedIn(true);
        console.log("token user : ",signInResponse.getIdToken().payload)
        // setUser(signInResponse.getIdToken().payload);
    } catch (error) {
        console.log(error);
    }
};
const m = new Magic('pk_live_A72F4C02A28BFD04'); 
const handleSignOut = async () => {
    try {
        // await Auth.signOut();
        // setIsLoggedIn(false);
        // setUser(null);
    } catch (error) {
        console.log("error : ",error)
      }
    }
  return (
    <div>Auth

<label>Email : </label>
       <input type="email" ref={emailRef} placeholder="email"></input>
       <input type="number" ref={phoneRef} placeholder="phone number"></input>
       <button  onClick={()=>dispatch(SignUp({email:emailRef.current.value,phone:`+${phoneRef.current.value}`}))}>On Click for singup</button>
       {/* <button  onClick={()=>signUp()}>On Click for singup</button> */}
       <br />
       <input type="number" ref={codeRef} placeholder='verfication code'></input>
       {/* <button onClick={()=>dispatch(SignUp({email:emailRef.current.value,phone:`+${phoneRef.current.value}`}))}>varifcation</button> */}
       <button onClick={()=>handleConfirmSignUp()}>varifcation</button>



       <input type="email"  placeholder='sign in phone'></input>
       <button onClick={()=>{handleSignIn()}}>SIGN IN </button>
    </div>
  )
}

export default AuthDummy;