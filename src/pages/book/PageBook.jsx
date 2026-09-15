import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { listToStringWithAnd, parameterToBookKey, listToString } from "../../utilFuncs.jsx";
import { UseBookContext } from "../../providers/BookProvider.jsx";
import Header from "../../components/Header/Header.jsx"
import CardBox from "../../components/CardBox/CardBox.jsx";
import ReviewsArea from "../../components/ReviewsArea/ReviewsArea.jsx";
import "./PageBook.css"


export default function PageBook() {
    const { getBookByKey, isSearching} = UseBookContext();
    const [ book, setBook ] = useState(null);
    const params = useParams();

    useEffect(() => {
        let bookKey = parameterToBookKey(params.key);
        getBookByKey(bookKey).then(setBook);
    }, [])

    return (
        <div className="flex column mainPageContainer">
            <title>Book Reviews - {book?.title}</title>
            <Header />
            <div className="flex column vCenter vScroll pageContentContainer">
                { isSearching 
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
                                
                                <ReviewsArea />
                            </div>
                        
                        } cardWidth="100%" hasRoundedCorner={true} />    
                }
            </div>  
        </div>
    )
}