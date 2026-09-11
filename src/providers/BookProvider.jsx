import { createContext, useContext, useState } from "react";
import { getCachedResponse, isEmpty, isNumber, setCachedResponse } from "../utilFuncs";

const BookContext = createContext(undefined);

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
    
    // let maxPageNum = isNumber(numFound) ? Math.ceil(numFound / limit) : null;
    // console.log(maxPageNum);

    if (numFound && page > maxPageNum) {
        console.error(`Value for 'page' must be a number smaller, or equal, to ${maxPageNum}`)
        return false;
    }

    return true
}

export function BookProvider({children}) {
    const [ books, setBooks ] = useState([]);
    const [ isSearching, setIsSearching ] = useState(false);

    function bookSearch(searchQuery, page, limit, numFound=null, maxPageNum=null) {
        var argsAreValid = searchArgsValidator(searchQuery, page, limit, numFound, maxPageNum);
        if (!argsAreValid) { return; }

        setIsSearching(true)

        // Cache API response
        const cacheKey = `bookSearch:${searchQuery}:${page}:${limit}`;
        const wasCached = getCachedResponse(cacheKey);

        if (wasCached) {
            setBooks(wasCached);
            setIsSearching(false);
            return;
        }

        let url = `https://openlibrary.org/search.json?title=${searchQuery}&limit=${limit}&page=${page}`

        fetch (url, {method: "get"})
        .then(res => {
            if (!res.ok) {
                setIsSearching(false);
                throw new Error(`Unable to fetch book data from OpenLibrary (${res.status} - ${res.statusText})`)
            }
            return res.json()
        })
        .then(data => {
            setCachedResponse(cacheKey, data)
            setBooks(data)
            setIsSearching(false)
        })
        .catch(err =>{
            setIsSearching(false)
            console.error(err)
        })
    }

    let providerValue = {
        books: books,
        isSearching: isSearching,
        bookSearch: bookSearch
    }

    return (
        <BookContext.Provider value = {providerValue}>
            {children}
        </ BookContext.Provider>
    )
}

export function UseBookContext() {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error("O 'UseBookContext' deve ser usado dentro de um 'BookProvider'!")
    }

    return context;
}