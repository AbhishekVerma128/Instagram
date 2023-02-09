import React, {useContext}from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../imgs/Instagram_logo.svg.png"
import "./navbar.css"
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { LoginContext } from "../../context/LoginContext";
const Navbar = ({login})=>{
     const navigate = useNavigate()
    const {setModal} = useContext(LoginContext)
    const loginStatus = ()=>{
        const token =  localStorage.getItem('jwt')
        //console.log(token);
        if(login || token){
            return [
                <>
                 <Link to="/profile">
                <li>Profile</li>
                </Link>
                <Link to="./createpost">
                    <li>Createpost</li>
                </Link>
                <Link to="./followingpost">
                    <li>My following</li>
                </Link>
                <Link to="">
                <button className="primaryBtn" onClick={()=>setModal(true)}>
                    Log Out</button>
                </Link>
                </>]
            
        }
        else{
            return[
                <>
                <Link to="/signUp">
                <li>SignUp</li>
                </Link>
                <Link to="/signIn">
                <li>SignIn</li>
                </Link>
                </>
            ]
        }
    }

    const loginStatusMoblile=()=>{
            const token =  localStorage.getItem('jwt')
            //console.log(token);
            if(login || token){
                return [
                    <>
                     <Link to="/">
                    <li><HomeIcon/></li>
                    </Link>
                     <Link to="/profile">
                    <li><AccountCircleRoundedIcon/></li>
                    </Link>
                    <Link to="./createpost">
                        <li><LibraryAddIcon/></li>
                    </Link>
                    <Link to="./followingpost">
                        <li><ExploreIcon/></li>
                    </Link>
                    <Link to="">
                    <li onClick={()=>setModal(true)}>
                       <LogoutIcon/></li>
                    </Link>
                    </>]
                
            }
            else{
                return[
                    <>
                    <Link to="/signUp">
                    <li>SignUp</li>
                    </Link>
                    <Link to="/signIn">
                    <li>SignIn</li>
                    </Link>
                    </>
                ]
            }
        
    }
    return[
        <>
        <div className="navbar">
           <img src={logo} alt="logo" onClick={()=>{navigate("/")}}
            style={{cursor:"pointer"}} id="insta-logo" />
           <ul className="nav-items">
            {loginStatus()}
           </ul>
           <ul className="nav-mobile">
            {loginStatusMoblile()}
           </ul>
        </div>
        </>
   ]
}

export default Navbar;