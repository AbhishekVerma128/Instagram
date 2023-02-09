import { RiCloseLine } from "react-icons/ri";
import  {useState} from "react"
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DeleteIcon from '@mui/icons-material/Delete';
import "./postdetail.css"
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Postdetail=({commentPic, viewPost})=>{
    const navigate =useNavigate()
         // toast function
         const notifyError = (msg) => toast.error(msg);
         const notifyMsg = (msg)=>toast.success(msg)
    // console.log(commentPic._id)
    const deletePost =()=>{
        if(window.confirm("do yo really want to delete this post")){
            fetch(`https://instagram-clone-trzg.onrender.com/delete/${commentPic._id}`,{
                method:"delete",
                headers: {
                    "Authorization" : "Bearer " + localStorage.getItem("jwt"),
                }
            }).then(res=>res.json())
            .then((result)=>{
                notifyMsg(result.message);
                viewPost();
                navigate("/")})
            .catch(e=>notifyError(e))
        }
       
    }
    // console.log(commentPic)
const [comment, setComment] = useState("");
return (
    <div className="show-comment">
                <div className="comment-container">
                    <div className="post-pic">
                        <img src={commentPic.photo} alt="" />
                    </div>
                    <div className="comment-details">
                        {/* comment header */}
                        <div className="card-Header" >
                            <div className="card-pic">
                                <img src={require('../../imgs/boy1.jpg')} alt="" />
                            </div>
                            <h5>{commentPic.postedBy.name}</h5>
                            <div className="deletePost" onClick={deletePost}>
                                <DeleteIcon/>
                            </div>
                        </div>
                        {/* comment section */}
                        <div className="comment-section">
                            {commentPic.comments.map((newcomment)=>{
                                return(
                                    <p className="comm"><span className="commenter" style={{fontWeight: "bolder"}}>
                                        {newcomment.postedBy.name}{" "}</span>
                                        <span className="commentText">{newcomment.comment}</span>
                                    </p>
                                );
                            })}
                        </div>
                        <div className="card-content">
                            <p>{commentPic.likes.length} likes</p>
                            <p>{commentPic.caption}</p>
                        </div>
                        {/* add comment */}
                        <div className="card-comment">
                            <span><AddReactionIcon /></span>
                            <input type="text" placeholder='Add a comment...' value={comment}
                            //  onChange={(e) => { setComment(e.target.value) }}
                              />
                            <button 
                            // onClick={()=> {PostComment(comment,commentPic._id ); viewComments()} }
                             className="comment-btn">Post</button>
                        </div>
                    </div>
                </div>
                {/* close comment */}
                <div className="close-comment" 
                onClick={viewPost}
                >
                    <span style={{fontSize: "40px" , cursor: "pointer"}} ><RiCloseLine /></span>
                </div>
            </div>
)
}
export default Postdetail;