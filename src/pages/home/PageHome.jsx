import "./PageHome.css"
import { UseUserContext } from "../../providers/UserProvider";
import Header from "../../components/Header/Header";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { UseBookContext } from "../../providers/BookProvider";
import { isEmpty } from "../../utilFuncs";

export default function PageHome() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const { username } = UseUserContext();

    const navigate = useNavigate();

    function searchBook() {
        if (isEmpty(searchQuery)) return
        
        navigate(`/search/${encodeURIComponent(searchQuery)}/1`)
    }

    return (
        <div className="mainPageContainer">
            <title>Book Reviews - Home</title>

            <Header/>
            <div className="flex column vCenter pageContentContainer">
                <h1 className="welcomeMsg">Welcome to Book Reviews{username && `, ${username}`}!</h1>

                <div className="bookSearchContainer vCenter">
                    <div title="Search" className="searchIconContainer">
                        <FontAwesomeIcon className="searchIcon" icon={faSearch} onClick={() => searchBook()} />  
                    </div>
                    <input type="text" 
                        className="bookSearchInput"
                        placeholder="Search book..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                searchBook();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}