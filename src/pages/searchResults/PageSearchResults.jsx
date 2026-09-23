import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { getCachedResponse, isEmpty, isNumber, setCachedResponse } from "../../utilFuncs";
import Header from "../../components/Header/Header";
import "./PageSearchResults.css"
import BookCardList from "../../components/BookCardList/BookCardList";


export default function PageSearchResults() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ bookRecords, setBookRecords ] = useState([]);
    const [ numFound, setNumFound ] = useState(0);
    const [ books, setBooks ] = useState([]);
    const [ loadingResults, setLoadingResults ] = useState(false);

    const navigate = useNavigate();
    
    const params = useParams();
    const currSearchQuery = params.query;
    const pageNum = params.page;

    const limit = 10;
    const maxPageNum = Math.ceil(numFound / limit)

    function searchArgsValidator(searchQuery, page, limit, numFound=null, maxPageNum=null) {
        if (isEmpty(searchQuery)) {
            console.error("Search query must not be empty")
            return false;
        }
    
        if (!isNumber(limit)) {
            console.error(`Value for 'limit' must be a integer. (Value: ${limit} | Type: ${typeof limit})`)
            return false;
        }
    
        if (!isNumber(page)) {
            console.error(`Value for 'page' must be a integer. (Value: ${page} | Type: ${typeof page})`)
            return false;
        }
    
        if (numFound && page > maxPageNum) {
            console.error(`Value for 'page' must be a number smaller, or equal, to ${maxPageNum}`)
            return false;
        }
    
        return true
    }

    function getBookByTitle(searchQuery, page, limit, numFound=null, maxPageNum=null) {
        var argsAreValid = searchArgsValidator(searchQuery, page, limit, numFound, maxPageNum);
        if (!argsAreValid) { return; }

        setLoadingResults(true)

        // Cache API response
        const cacheKey = `pagedBookSearch:${searchQuery}:${page}:${limit}`;
        const wasCached = getCachedResponse(cacheKey);

        if (wasCached) {
            setBooks(wasCached);
            setLoadingResults(false);
            return;
        }

        let url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}&limit=${limit}&page=${page}`

        fetch (url, {method: "get"})
        .then(res => {
            if (!res.ok) throw new Error(`Unable to fetch book data from OpenLibrary (${res.status} - ${res.statusText})`);
            return res.json()
        })
        .then(data => {
            setCachedResponse(cacheKey, data)
            setBooks(data)
            setLoadingResults(false)
        })
        .catch(err =>{
            setLoadingResults(false)
            console.error(err)
        })
    }

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
        if ((books !== undefined | books !== null) && !loadingResults) {
            setBookRecords(books.docs)
            setNumFound(books.numFound)
        }
    }, [books, loadingResults])

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
                    { loadingResults 
                        ?
                            <p className="centeredText semibold loadingMsg">Loading...</p>
                        :
                        <div>
                            <p className="semibold centeredText resultsForMsg">Results for "{currSearchQuery}" ({numFound})</p>
                            <BookCardList bookList={bookRecords} />
                            { bookRecords?.length > 0 &&
                                <div className="flex row vCenter hCenter paginationContainer"> 
                                    <div className="wrapper" title="Go to previous page">
                                        <FontAwesomeIcon icon={faChevronLeft} onClick={() => pageBack()} className={`chevIcon ${pageNum == 1 && 'chevDisabled'}`}/>
                                    </div>
                                    <p>{pageNum}</p>
                                    <div className="wrapper" title="Go to next page">
                                        <FontAwesomeIcon icon={faChevronRight} onClick={() => nextPage()} className={`chevIcon ${pageNum == maxPageNum && 'chevDisabled'}`}/>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}