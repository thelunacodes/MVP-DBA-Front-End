import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { UseUserContext } from "../../providers/UserProvider"

export default function Header() {
    const {isLoggedIn} = UseUserContext();
    const btnLabel = isLoggedIn ? "Sign Out" : "Sign In";
    
    return (
        <header className="headerContainer">
            <div className="headerContainerL">
                <FontAwesomeIcon icon={faBookOpen} className="headerIcon" />
                <p className="headerLabel">Book Reviews</p>
            </div>
            <div className="headerContainerR">
                <button className="appButton" title={btnLabel}>
                    {btnLabel}
                </button>
            </div>
        </header>
    )
}