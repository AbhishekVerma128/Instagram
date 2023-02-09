import React, { useEffect, useState } from "react";
import Postdetail from "../postdetail/postdetail"
import ProfilePic from "../profilepic/ProfilePic";
import './profile.css'
const Profile = ()=>{
    const defaultPic ="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
    const [pic, setpic] = useState([])
    const [show, setShow] = useState(false)
    const [commentPic, setCommentPic] = useState([]);
    const [profilePic, setProfilePic] = useState(false)
    const [user, setUser]= useState("")
    // console.log(commentPic)
    // view and hide comment
    const viewPost = (post)=>{
        if(show){
            setShow(false)
        }
        else{
            setShow(true)
            setCommentPic(post)
            //console.log(commentPic.comments);
        }
    }
    // display profile pic options

    const changeProfile=()=>{
        if(profilePic){
            setProfilePic(false)
        }
        else{
            setProfilePic(true)
        }
    }
    useEffect(()=>{
        fetch(`https://instagram-clone-trzg.onrender.com/userProfile/${JSON.parse(localStorage.getItem("user"))._id}`,{
          headers:{
              "Authorization":"Bearer " +localStorage.getItem("jwt")
          }
        }).then(res=>res.json())
        .then(result =>{
            console.log(result)
            setpic(result.ProfileData); 
            setUser(result.data);}).catch(e=>console.log(e))
          },[])
    return(
   
        <div className="profile" >
            {/* Profile frame */}
            <div className="profile-frame">
                {/* profilepic */}
                <div className="profile-pic">
                    <img
                    onClick={changeProfile}
                     src={user.Photo?user.Photo: defaultPic} alt="" />
                </div>
                {/* profile-data */}
                <div className="profile-data">
                <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info" style={{display:"flex"}}>
                        <p>{pic?pic.length:"0"}  posts</p>
                        <p>{user.followers?user.followers.length:"0"} follower</p>
                        <p>{user.following?user.following.length:"0"}  folllowing</p>
                    </div>
                </div>
            </div>
            <hr style={{width: "95%", margin:"25px auto", opacity:"0.8"}}/>
            {/* gallery */}
            <div className="gallery">
                {pic.map((pic)=>{
                    return (
                    <img src={pic.photo} key={pic._id}
                    onClick={()=>{viewPost(pic)}}
                    ></img>
                    )
                })}
            </div>
            {
               show && <Postdetail commentPic={commentPic} viewPost={viewPost}/>
            }

            {
                profilePic && <ProfilePic changeProfile={changeProfile}/>
            }
           
        </div>
    )
}
export default Profile;
