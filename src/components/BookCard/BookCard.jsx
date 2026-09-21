import { useNavigate } from "react-router"

import CardBox from "../CardBox/CardBox"
import { bookKeyToParameter, listToStringWithAnd } from "../../utilFuncs";
import "./BookCard.css"

export default function BookCard({book}) {    
    const navigate = useNavigate();

    return (
        <CardBox cardContent={
            <div className="flex row bookCardContainer" onClick={() => navigate(`/book/${bookKeyToParameter(book.key)}`)}>
                { book.cover_i
                    ?
                       <img className="bookCoverImg" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={`${book.title}'s cover`} />
                    :
                        <div className="flex vCenter hCenter noCoverPlaceholder"> 
                            <p className="noCoverMsg">No cover</p>
                        </div>
                }
            
                <div className="bookInfoContainer">
                    <div className="flex flow vCenter bookTitleYear">
                        <p className="semibold bookTitle">{book.title}  {book.first_publish_year && `(${book.first_publish_year})`}</p>
                       
                    </div>
                    <p className="bookAuthor">Author(s): {listToStringWithAnd(book.author_name) ?? "Unavailable"}</p>
                </div>
            </div>
        } cardWidth={"100%"} hasHoverResponse={true} hasRoundedCorner={true}/>
    )
}