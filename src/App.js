import logo from './logo.svg';
import './App.css';
// import UserPool from "./UserPool"
import { Routes, Route,Link } from "react-router-dom"
import AuthDummy from './components/dummy-components/auth';
import Login from './components/LoginComponent/Login';
import LoginWithEmail from './components/LoginComponent/LoginEmail';



function App() {

  return (
    <div className="App">
    {/* <SignIn /> */}
    

       <Routes>
        <Route path="/" element={<h1>HomeComponent</h1>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/login-with-email" element={<LoginWithEmail />} />
        <Route path="/auth" element={<AuthDummy />} />
        {/* <Route path="login" element={ <Login /> } /> */}
   
      </Routes>
    </div>
  );
}

export default App;
