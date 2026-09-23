import { useNavigate } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./RegisterSuccessMessage.css"
import { UseModalContext } from "../../../../Providers/ModalProvider";

export default function RegisterSuccessMessage({setIsSaving}) {
    const navigate = useNavigate();
    const { closeModal } = UseModalContext();    

    function continueToLogin() {
        setIsSaving(false); 
        closeModal();
        navigate("/login")
    }

    return (
        <div className="flex column vCenter successMsgContainer">
            <p>Your account has been successfully created!</p>
            <button className="appButton" onClick={() => continueToLogin()} >Continue</button>
        </div>
    )
}