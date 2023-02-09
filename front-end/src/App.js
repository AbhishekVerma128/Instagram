import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  useState } from "react";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar"
import Profile from "./components/profile/profile";
import Signin from "./components/navbar/signin";
import Signup from "./components/navbar/sinup";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from "./components/Createpost/Createpost";
import { LoginContext } from "./context/LoginContext";
import Model from "./components/modal/modal"
import Display_Profile from "./components/Display_profile/Display_Profile";
import MyfollowingPost from "./components/myfollowingPost/myfollowingPost";
function App() {
  const [userLogin, setUserLogin]= useState(false);
  const [modal, setModal]= useState(false)

  return (
    <BrowserRouter>
    <div className="App">
   <LoginContext.Provider value={{setUserLogin, setModal}}>
   <Navbar value={userLogin}/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/createpost" element={<Createpost/>}></Route>
      <Route path="/userProfile/:id" element={<Display_Profile/>}/>
      <Route path="followingpost" element={<MyfollowingPost/>}/>
    </Routes>
    <ToastContainer theme="dark"/>
   {modal && <Model setModal={setModal}/>} 
   </LoginContext.Provider>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
