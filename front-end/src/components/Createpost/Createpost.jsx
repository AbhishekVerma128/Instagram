import React, { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import './Createpost.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Createpost = () => {
    const navigate = useNavigate();
    const [caption, setcaption] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    // getting img from cloudinary
    const [imgurl, setImgurl] = useState("")
      console.log(imgurl)
     // toast function
     const notifyError = (msg) => toast.error(msg);
     const notifyMsg = (msg)=>toast.success(msg)
 
useEffect(()=>{
    if(imgurl){
        // saving imageurl and caption in mongo
     fetch("https://instagram-clone-trzg.onrender.com/createpost",{
        method:"post",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            caption,
            pic: imgurl
        })
      }).then(res =>res.json()).then(data=>
       { if(data.error){
        // console.log(data.error)
        setLoading(false)
        notifyError(data.error)
        }
        else{
            notifyMsg(data.message)
            setLoading(false)
            navigate("/")
        }
    
    }).catch(e=>console.log(e))

    }
},[imgurl])

const loadingData =()=>{
    if(loading){
        console.log("loading....")
        return (
            <h1>Loading....</h1>
        )
    }
}

    // upload pic in cloudnary
    const shareImage = () => {
        console.log(image, caption)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "vermaabhishek128");
        fetch("https://api.cloudinary.com/v1_1/vermaabhishek128/image/upload", {
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{setImgurl(data.url);setLoading(true); loadingData()})
        .catch(e=>console.log(e))
    // console.log(localStorage.getItem("jwt"))
        
    }


    // for review of image file
    const loadfile = (event) => {
        var output = document.getElementById('output');

        output.src = URL.createObjectURL(event.target.files[0]);
        // console.log(output.src);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }
    return (
        <div className="create-post">
            <div className="post-header">
                <h4>create new post</h4>
                <button id="post-btn" onClick={shareImage}><ArrowForwardIcon /></button>
            </div>
            <div className="main">

                {/* < id="img-icon"/> */}
                <center>
                    <img src={require("../../imgs/photo.png")} id="output" alt="" />
                </center>
                <input type="file" accept="image/*" onChange={(e) => {
                    loadfile(e);
                    setImage(e.target.files[0])
                }} />
            </div>
            <div className="details">
                <div className="card-header">
                    <div className="card-pic" style={{ display: "flex" }}>
                        <img src={require('../../imgs/boy3.jpg')} alt="" />
                        <span>Abhshek</span>
                    </div>
                </div>
                <textarea type="text" value={caption} onChange={(e) => setcaption(e.target.value)} placeholder="write a caption..."></textarea>
            </div>
        </div>
    )
}
export default Createpost;