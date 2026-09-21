import { useEffect, useState } from "react"
import { useParams } from "react-router"

import "./PageBook.css"
import { listToStringWithAnd, parameterToBookKey, listToString, setCachedResponse, getCachedResponse } from "../../utilFuncs.jsx";
import Header from "../../components/Header/Header.jsx"
import CardBox from "../../components/CardBox/CardBox.jsx";
import ReviewsArea from "../../components/ReviewsArea/ReviewsArea.jsx";


export default function PageBook() {
    const [book, setBook] = useState(null);
    const [loadingBook, setLoadingBook] = useState(false);

    const params = useParams();

    async function getBookByKey(bookKey) {
        setLoadingBook(true)

        // Cache API response
        const cacheKey = `getBookByKey:${bookKey}`;
        const cachedRes = getCachedResponse(cacheKey);

        if (cachedRes) {
            setLoadingBook(false);
            return cachedRes;           
        }

        let url = `https://openlibrary.org/search.json?q=key:"${bookKey}"&fields=key,title,description,author_name,first_publish_year,edition_count,cover_i,subject,language`
        
        return await fetch (url, {method: "get"})
            .then(res => {
                if (!res.ok) throw new Error(`Unable to fetch book with key '${bookKey}'.`)
                return res.json()
            })
            .then(data => {
                const book = data.docs?.[0] ?? null
                setCachedResponse(cacheKey, book)
                setLoadingBook(false)
                return book;
            })
            .catch(err => {
                console.error(err)
                setLoadingBook(false)
                return null
            })
    }

    useEffect(() => {
        let bookKey = parameterToBookKey(params.key)
        getBookByKey(bookKey).then(setBook);
    }, [])

    return (
        <div className="flex column mainPageContainer">
            <title>Book Reviews - {book?.title}</title>
            <Header />
            <div className="flex column vCenter vScroll pageContentContainer">
                { loadingBook 
                    ? 
                        <p className="centeredText semibold loadingMsg">Loading...</p>
                    :
                        <CardBox cardContent={
                            <div className="flex column bookPageCardContainer"> 
                                <div className="flex row" style={{"gap": "20px"}}>
                                    { book?.cover_i
                                        ?
                                        <img className="bookCoverPageImg" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={`${book.title}'s cover`} />
                                        :
                                            <div className="flex vCenter hCenter noCoverPagePlaceholder"> 
                                                <p className="noCoverMsg">No cover</p>
                                            </div>
                                    }
                                    <div className="bookPageCardInfo">
                                        <div className="wrapper">
                                            <p className="bookCardTitle semibold">{book?.title} ({book?.first_publish_year})</p>
                                            <p className="bookCardAuthors">Author(s): {listToStringWithAnd(book?.author_name) ?? "Unavailable"}</p>
                                        </div>
                                        <div className="bookCard">
                                            <p><b>Available languages:</b> {listToString(book?.language) ?? "Unavailable"} </p>
                                            <p><b>Tags:</b> {listToString(book?.subject) ?? "No tag(s) available"} </p>
                                            <p><b>Description:</b> {book?.description ?? "No description available"} </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <ReviewsArea bookKey={parameterToBookKey(params.key)}/>
                            </div>
                        
                        } cardWidth="80%" hasRoundedCorner={true} />    
                }
            </div>  
        </div>
    )
}