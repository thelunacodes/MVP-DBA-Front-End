import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { UseBookContext } from "../../providers/BookProvider";

import { isEmpty } from "../../utilFuncs";
import Header from "../../components/Header/Header";
import "./PageSearchResults.css"


export default function PageSearchResults() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ bookRecords, setBookRecords ] = useState([]);
    const [ numFound, setNumFound ] = useState(0);
    const { bookSearch, books, isSearching } = UseBookContext();
    
    const navigate = useNavigate();
    
    const params = useParams();
    const currSearchQuery = params.query;
    const pageNum = params.page;

    function searchBook() {
        if (isEmpty(searchQuery)) return

        navigate(`/search/${searchQuery}/1`)
    }

    // Search books on page load
    useEffect(() => {
        bookSearch(currSearchQuery, pageNum, 20 )
    }, [params])

    // Load search results
    useEffect(() => {
        if ((books !== undefined | books !== null) && !isSearching) {
            console.log(books);
            setBookRecords(books.docs)
            setNumFound(books.numFound)
        }
    }, [books, isSearching])

    return (
        <div className="mainPageContainer">
            <title>Book Reviews - Searching for "{currSearchQuery}"</title>

            <Header/>
            <div className="flex column vCenter pageContentContainer">
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

                

                { isSearching 
                    ?
                    <div>
                        <p className="loadingMsg">Loading...</p>
                    </div>
                    :
                    <div>
                        <p>Results for "{currSearchQuery}" ({numFound}) </p>

                        { (bookRecords === undefined || bookRecords.length === 0) 
                            ?
                                <div>
                                    <p>No results :(</p>
                                </div>
                            :
                                <div>
                                    { bookRecords.map((book, k) => 
                                        <div key={k}>
                                            {book.title}
                                        </div>
                                    )}
                                </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}