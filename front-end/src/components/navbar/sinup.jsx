import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../../imgs/Instagram_logo.svg.png"
import {  toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setname]= useState("");
    const [user_name, setuser_name]= useState("");
    const [email, setemail]= useState("");
    const [password, setpassword]= useState("");
    // const [error, seterror] = useState("")

    // toast function
    const notifyError = (msg) => toast.error(msg);
    const notifyMsg = (msg)=>toast.success(msg)

// email verification
const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postdata =()=>{
        if(!name || !user_name || !email || !password){
            return notifyError("enter all the fields")
        }
    if(!emailReg.test(email)){
        return notifyError("envalid email")
    }
    if(password.length<5){
        return notifyError("password must be greater than 5")
    }
        fetch("https://instagram-clone-trzg.onrender.com/signup",{
            method:"post",
            headers:{
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({
                email:email,
                name:name,
                username:user_name,
                password:password
            })
        }).then(res=>res.json()).then(data=>{
            //  seterror(data)
            console.log(data.message)
             if(data.message){
                console.log(data.message)
                notifyMsg(data.message)
                navigate("/signin")
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
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-form-1">
                    <img src={logo} alt="" />
                    <p className="login-para">
                        SignUp to see more photos and videos <br /> from your friends
                    </p>
                    <div>
                        <input type="email" name="email" id="email" placeholder="Email" 
                        onChange={(e)=>{setemail(e.target.value)}} value={email}/>
                    </div>
                    <div>
                        <input type="text" name="FullName" id="fname" placeholder="Full Name"
                         onChange={(e)=>{setname(e.target.value)}} value={name} />
                    </div>
                    <div>
                        <input type="text" name="username" id="username" placeholder="username"
                         onChange={(e)=>{setuser_name(e.target.value)}} value={user_name} />
                    </div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="password"
                         onChange={(e)=>{setpassword(e.target.value)}} value={password} />
                    </div>
                    <p className="signUp-para">
                        By signing up, you agree to our terms, <br /> privacy policy & cookies policy.
                    </p>
                    <button className="btn-0" onClick={postdata}>SignUp</button>
                    {/* for showing error below the button turnary operator */}
                  {/* {error.message?<p className=" message">{error.message}</p>:<p className="error">{error.error} </p>} */}
                </div>
                
                <div className="signup-form-2">
                    Already have an account ?
                    <Link to="/signIn">
                    <span style={{color : "blue", cursor : "pointer", fontSize: "14px"}}>SignIn</span>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default Signup;