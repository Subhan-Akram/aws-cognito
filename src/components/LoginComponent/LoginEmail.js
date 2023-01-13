import React,{useState} from 'react'
import "./LoginEmail.css"
import "./Login.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useLocation } from 'react-router-dom';
function LoginEmail() {
  const location = useLocation();
console.log(location.state) 
const [email,setEmail]=useState("");
function isEmail(email) {
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}

const submitForm=()=>{
 if(!isEmail(email)){
         setEmail("")
         alert("enter correct email")
      return ""
 }
    alert(
      
        `phone number : ${location.state.phone} \n email : ${email}`
      
      
    )
}

  return (
    <div className='login_wrapper bd_red'>
    <div className='bd_yellow login_container'>
    <h3 className='login_title mb_1'>Have an Email or Facebook Account</h3>
    <InputGroup className="mb-3 login_input" >

     <Form.Control
     className='input_phone'
       placeholder="Enter Your Email"
       aria-label="email"
       aria-describedby="basic-addon1"
       value={email}
       onChange={(e)=>{setEmail(e.target.value)}}
     />
   </InputGroup>
     <div className='login_btn_div mt_2'>  
     <Button className='login_continue_btn' onClick={()=>{submitForm()}} variant="primary" size="lg">
        Continue
     </Button></div>
     <p className='login_or'>Or</p>

     <div className='login_btn_div '>  
     <Button className='login_continue_btn' variant="primary" size="lg">
        Login With Facebook
     </Button></div>

    
    </div>

 </div>
  )
}

export default LoginEmail