import React,{useContext, useState} from "react";
import logo from "../../imgs/Instagram_logo.svg.png"
import { Link, useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';
import { LoginContext } from "../../context/LoginContext";

const Signin = ()=>{
    const {setUserLogin} = useContext(LoginContext);
    const navigate = useNavigate();
    const [email, setemail]= useState("");
    const [password, setpassword]= useState("");


    // toast function
    const notifyError = (msg) => toast.error(msg);
    const notifyMsg = (msg)=>toast.success(msg)

// email verification
const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const signIn =()=>{
        if(!email || !password){
            return notifyError("enter all the fields")
        }
    if(!emailReg.test(email)){
        return notifyError("envalid email")
    }
        fetch("https://instagram-clone-trzg.onrender.com/signin",{
            method:"post",
            headers:{
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json()).then(data=>{
            //  seterror(data)
            console.log(data.message)
             if(data.message){
                // console.log(data.message)
                notifyMsg(data.message)
                // console.log(data.token);
            // saving token to local storage
            localStorage.setItem("jwt", data.token)
            
            setUserLogin(true);
            localStorage.setItem("user", JSON.stringify(data.user))
            
                navigate("/")
             }
             else{
                // console.log(data)
                notifyError(data.error)
             }
             
           
            
        }).catch(e=>{
            // when api is not working
            // seterror(e)
            console.log(e)})
    }
    return(
        <div className="signup">
        <div className="signup-container">
            <div className=" signup-form-1 bg-clr">
                <img src={logo} alt="" />
                <div>
                <input type="email" name="email" id="email" placeholder="Email" 
                        onChange={(e)=>{setemail(e.target.value)}} value={email}/>
                </div>
                <div>
                <input type="password" name="password" id="password" placeholder="password"
                         onChange={(e)=>{setpassword(e.target.value)}} value={password} />
                </div>
                <button className="btn-0"  onClick={signIn}>SignIn</button>
            </div>
            <div className="signup-form-2 bg-clr">
                Don't have an account?
                <Link to="/signup">
                    <span style={{color : "blue", cursor : "pointer", fontSize: "14px",paddingLeft:"2px"}}>SignUp</span>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Signin;