import { useNavigate } from "react-router-dom"
import "./modal.css"

const Modal = ({setModal}) => {
    const navigate = useNavigate()
    return (
        <div className="darkBg" onClick={()=>setModal(false)}>
            <div className="centered">
            <div className="modal">
                <div className="modalHeader">
                    <h5 className="heading">confirm</h5>
                </div>
                <button className="closeBtn" onClick={()=>setModal(false)}>x</button>
                {/* modal content */}
                <div className="modalContent">
                    Are you really want to logout?
                </div>
                <div className="modalAction">
                    <div className="actionsContainer">
                        <button className="logoutBtn"  onClick={()=>{setModal(false)
                        localStorage.clear()
                        navigate("./signin")}}>
                            logout
                        </button>
                        <button className="cancelBtn"  onClick={()=>setModal(false)}>
                            cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>
        </div>

    )
}

export default Modal;