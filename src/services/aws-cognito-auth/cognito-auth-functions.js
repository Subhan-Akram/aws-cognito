
import { Auth ,Amplify } from 'aws-amplify';
Amplify.configure({
  Auth: {
    region: 'us-east-1', // your cognito region
    userPoolId: 'us-east-1_RrkHDEuVx',  // your user pool id
    userPoolWebClientId: '3ksrmoeiudsmngddimbv6i1udo', // your app client id
}
});
export  const resendCode = async (phone) => {
    try {
       let res= await Auth.resendSignUp(phone);
        console.log("Code Resent");
        return res

    } catch (error) {
        console.log(error);
        return error
    }
}

  export    const handleConfirmSignUp = async (phone,code) => {
        try {
          // console.log("verification code ",ref.current.value)
          
            const confirmSignUpResponse = await Auth.confirmSignUp(phone,code);
            console.log(confirmSignUpResponse);
            return confirmSignUpResponse
        } catch (error) {
            console.log("CODE ",error);
            return error
        }
    };
 export const signUp=async(email,phone)=>{
        try {
          console.log(">>>aws cognitpo>",phone,email)
        
          const signUpResponse = await Auth.signUp({
              username:phone,
              password:`${phone}-${email}-A`, // temporary password
              attributes: {
                  email:email,
                  phone_number:phone
              },
              validationData: []
          });
          console.log("response status",signUpResponse.code);
          return signUpResponse;
        
      } catch (error) {
        return error
          console.log(error);
      }

  }
 export const handleSignIn = async (phone,email) => {
    try {
        const signInResponse = await Auth.signIn(phone,`${phone}-${email}-A`); // temporary password
        // setIsLoggedIn(true);
        console.log("token user : ",signInResponse)
        return signInResponse
        // setUser(signInResponse.getIdToken().payload);
    } catch (error) {
        console.log(error);
        return error
    }
};

export const handleSignOut = async () => {
    try {
        await Auth.signOut();
        // setIsLoggedIn(false);
        // setUser(null);
    } catch (error) {
        console.log("error : ",error)
      }
    }