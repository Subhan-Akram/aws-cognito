import logo from './logo.svg';
import './App.css';
// import UserPool from "./UserPool"
import { Auth ,Amplify } from 'aws-amplify';
import { useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { authActions,SignUp} from './store/reducer-slice/auth'
Amplify.configure({
  Auth: {
    region: 'us-east-1', // your cognito region
    userPoolId: 'us-east-1_RrkHDEuVx',  // your user pool id
    userPoolWebClientId: '3ksrmoeiudsmngddimbv6i1udo', // your app client id
}
});
function App() {
  const fetchUser = async (userId) => {
    try {
        const user = await Auth.getUser(userId);
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
    }
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
              validationData: []
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

const handleSignOut = async () => {
    try {
        await Auth.signOut();
        // setIsLoggedIn(false);
        // setUser(null);
    } catch (error) {
        console.log("error : ",error)
      }
    }
  return (
    <div className="App">
       <label>Email : </label>
       <input type="email" ref={emailRef} placeholder="email"></input>
       <input type="number" ref={phoneRef} placeholder="phone number"></input>
       <button  onClick={()=>dispatch(SignUp({email:emailRef.current.value,phone:`+${phoneRef.current.value}`}))}>On Click for singup</button>
       <br />
       <input type="number" ref={codeRef} placeholder='verfication code'></input>
       <button onClick={()=>dispatch(SignUp({email:emailRef.current.value,phone:`+${phoneRef.current.value}`}))}>varifcation</button>



       <input type="email"  placeholder='sign in phone'></input>
       <button onClick={()=>{handleSignIn()}}>SIGN IN </button>


   <h1>SIGN OUT</h1>
       <button onClick={()=>{handleSignOut()}}>SIGN OUT </button>
    </div>
  );
}

export default App;
