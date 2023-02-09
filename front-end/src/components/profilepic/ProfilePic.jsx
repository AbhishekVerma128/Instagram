import React, { useState, useEffect, useRef } from 'react'
import "../modal/modal.css"

export default function ProfilePic({ changeProfile }) {
    const hiddenfileinput = useRef(null)
    const [image, setImage] = useState("");
    const [imgurl, setImgurl] = useState("")

    // upload pic in cloudnary
    const shareImage = () => {
        // console.log(image, caption)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "vermaabhishek128");
        fetch("https://api.cloudinary.com/v1_1/vermaabhishek128/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => setImgurl(data.url))
            .catch(e => console.log(e))
        // console.log(localStorage.getItem("jwt"))

    }

    const postPic = () => {
        // saving imageurl and caption in mongo
        fetch("https://instagram-clone-trzg.onrender.com/updateProfilePic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic: imgurl
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                // console.log(data.error)
                // notifyError(data.error)
            }
            else {
                console.log(data)
                changeProfile()
                window.location.reload()
                // notifyMsg(data.message)
                // navigate("/")
            }

        }).catch(e => console.log(e))
    }


    useEffect(() => {
        if (image) {
            shareImage()
        }

    }, [image])

    useEffect(() => {
        if (imgurl) {
            postPic()
        }

    }, [imgurl])


    const handleClick = () => {
        hiddenfileinput.current.click()
    }
    return (
        <div className='profilePic darkBg'>
            <div className="changepic centered">
                <div>
                    <h2>change profile pic</h2>
                </div>
                <div >
                    <button className='upload-btn' style={{ color: "#1EA1F7" }}
                        onClick={handleClick}>
                        upload photo</button>

                    <input type="file" accept='image/*'
                        ref={hiddenfileinput} style={{ display: "none" }}
                        onChange={(e) => { setImage(e.target.files[0]) }} />

                </div>
                <div >
                    <button className='upload-btn' style={{ color: "#ED4956" }}
                    onClick={()=>{
                        setImgurl(null)
                        postPic()
                    }}
                    > remove photo</button>

                </div>
                <div >
                    <button className='upload-btn' onClick={changeProfile}>cancel</button>

                </div>
            </div>

        </div>
    )
}
