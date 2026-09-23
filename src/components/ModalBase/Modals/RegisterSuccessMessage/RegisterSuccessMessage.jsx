import { useNavigate } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import "./RegisterSuccessMessage.css"
import { UseModalContext } from "../../../../Providers/ModalProvider";
import { use, useEffect } from "react";

export default function RegisterSuccessMessage({setIsSaving}) {
    const navigate = useNavigate();
    const { closeModal, showModal } = UseModalContext();    

    useEffect(() => {
        navigate("/login") // Redirect to login page after closing modal
    }, [showModal])

    
    function continueToLogin() {
        setIsSaving(false); 
        closeModal();
    }

    return (
        <div className="flex column vCenter successMsgContainer">
            <p>Your account has been successfully created!</p>
            <button className="appButton" onClick={() => continueToLogin()} >Continue</button>
        </div>
    )
}