import React, { useEffect, useRef, useState } from 'react'
import "./Login.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
// import { SignUp} from '../../store/reducer-slice/auth'
import { SignUp,SignIn} from '../../store/reducer-slice/middlewares/auth'
function Login() {
  let ref=useRef(null);
  const auth = useSelector((state) => state?.auth)
  const [phone,setPhone]=useState("")
  let dispatch=useDispatch()

  const navigate=useNavigate();
  const phoneNumberGet=()=>{
       if(phone==""){
        return alert("enter phone number ")
       }
      //  alert("go to");
         let phoneNumber=`+${phone}`
      console.log("phone >>>>>",phoneNumber)
        dispatch(SignIn({phone:phoneNumber,navigate}))
       
      
       
  }



  useEffect(()=>{
    console.log("w",phone.length)
    if(phone.length==11){
      phoneNumberGet()
    }
  },[phone])
  return (
    <div className='login_wrapper bd_red'>
       <div className='bd_yellow login_container'>
       <h3 className='login_title    mb-4'>Login To Continue</h3>
        <div className='login_btn_div'>  <Button className='login_btn' variant="primary" size="lg">
          Have a Facebook/Email Account
        </Button></div>
        <p className='login_or'>Or</p>

        <InputGroup className="mb-3 login_input" >
        <InputGroup.Text id="basic-addon1" className='input_span'>92 |</InputGroup.Text>
        <Form.Control
        className='input_phone'
          placeholder="Enter Your Mobile  Number"
          aria-label="phone"
          aria-describedby="basic-addon1"
          ref={ref}
          value={phone}
          onChange={(e)=>{setPhone(e.target.value)}}

        />
      </InputGroup>
       </div>

    </div>
  )
}

export default Login