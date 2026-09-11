import CardBox from "../CardBox/CardBox"
import "./BookCard.css"


export default function BookCard({book}) {    
    function formatAuthorList() {
        if (!book.author_name) return "Unknown"
        if (book.author_name.length === 1) return book.author_name[0]

        const authors = [...book.author_name];

        const last = authors.pop();
        return authors.join(', ') + ' and ' + last;
    }

    return (
        <CardBox cardContent={
            <div className="flex row bookCardContainer">
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
                    <p className="bookAuthor">Author(s): {formatAuthorList()}</p>
                </div>
            </div>
        } cardWidth={"100%"}/>
    )
}