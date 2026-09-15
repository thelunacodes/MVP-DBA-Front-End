import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { UseBookContext } from "../../providers/BookProvider";

import { isEmpty } from "../../utilFuncs";
import Header from "../../components/Header/Header";
import "./PageSearchResults.css"
import BookCardList from "../../components/BookCardList/BookCardList";


export default function PageSearchResults() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ bookRecords, setBookRecords ] = useState([]);
    const [ numFound, setNumFound ] = useState(0);
    const { getBookByTitle, books, isSearching } = UseBookContext();
    
    const navigate = useNavigate();
    
    const params = useParams();
    const currSearchQuery = params.query;
    const pageNum = params.page;

    const limit = 10;
    const maxPageNum = Math.ceil(numFound / limit)
    // console.log(maxPageNum)

    function searchBook() {
        if (isEmpty(searchQuery)) return

        navigate(`/search/${encodeURIComponent(searchQuery)}/1`)
    }

    // Search books on page load
    useEffect(() => {
        setBookRecords([]);
        getBookByTitle(currSearchQuery, pageNum, limit )
    }, [params])

    // Load search results
    useEffect(() => {
        if ((books !== undefined | books !== null) && !isSearching) {
            setBookRecords(books.docs)
            setNumFound(books.numFound)
        }
    }, [books, isSearching])

    function pageBack() {
        if (pageNum == "1") return;

        navigate(`/search/${encodeURIComponent(currSearchQuery)}/${Number(pageNum)-1}`)
    }

    function nextPage() {
        if (pageNum == `${maxPageNum}`) return;

        navigate(`/search/${encodeURIComponent(currSearchQuery)}/${Number(pageNum)+1}`)
    }

    return (
        <div className="flex column mainPageContainer">
            <title>Book Reviews - Searching for "{currSearchQuery}"</title>

            <Header/>
            <div className="flex column vCenter vScroll pageContentContainer">
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
                <div className="flex column hCenter searchResultContainer">
                    { isSearching 
                        ?
                            <p className="centeredText semibold loadingMsg">Loading...</p>
                        :
                        <div>
                            <p className="semibold centeredText resultsForMsg">Results for "{currSearchQuery}" ({numFound})</p>
                            <BookCardList bookList={bookRecords} />
                            <div className="flex row vCenter hCenter paginationContainer"> 
                                <div className="wrapper" title="Go to previous page">
                                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => pageBack()} className={`chevIcon ${pageNum == 1 && 'chevDisabled'}`}/>
                                </div>
                                <p>{pageNum}</p>
                                <div className="wrapper" title="Go to next page">
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => nextPage()} className={`chevIcon ${pageNum == maxPageNum && 'chevDisabled'}`}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}