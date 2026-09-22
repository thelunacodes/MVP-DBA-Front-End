import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

import "./Header.css"
import { UseUserContext } from "../../Providers/UserProvider"

export default function Header() {
    const {isLoggedIn, setUserId} = UseUserContext();
    const navigate = useNavigate();
    const btnLabel = isLoggedIn ? "Sign Out" : "Sign In";

    function signOut() {
        localStorage.removeItem("loggedInUserId");
        setUserId(null);
        location.reload();
    }
    
    return (
        <header className="headerContainer">
            <div className="headerContainerL" onClick={() => navigate("/home")}>
                <FontAwesomeIcon icon={faBookOpen} className="headerIcon" />
                <p className="headerLabel">Book Reviews</p>
            </div>
            <div className="headerContainerR">
                <button className="appButton" title={btnLabel} onClick={() => isLoggedIn ? signOut() : navigate("/login")}>
                    {btnLabel}
                </button>
            </div>
        </header>
    )
}