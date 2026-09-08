import "./PageHome.css"
import { UseUserContext } from "../../providers/UserProvider";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function PageHome() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const { isLoggedIn } = UseUserContext();

    function searchBook() {
        if (searchQuery.trim() === "") return

        console.log(`Pesquisando por "${searchQuery}"...`)
    }

    return (
        <div className="mainPageContainer">
            <title>Book Reviews - Home</title>

            <Header isLoggedIn={isLoggedIn} />
            <div className="flex column vCenter pageContentContainer">
                <h1 className="welcomeMsg">Welcome to Book Reviews!</h1>

                <div className="bookSearchContainer vCenter">
                    <div title="Search" className="searchIconContainer">
                        <FontAwesomeIcon className="searchIcon" icon={faSearch} onClick={() => searchBook()} />  
                    </div>
                    <input type="text" 
                        className="bookSearchInput"
                        placeholder="Search for a book to review..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                searchBook();
                            }
                        }}/>
                </div>
            </div>
        </div>
    )
}