import CardBox from "../CardBox/CardBox"
import "./BookCard.css"


export default function BookCard({book}) {
    
    return (
        <CardBox cardContent={
            <div className="bookCardContainer">
                <p>{book.title}</p>
            </div>
        } cardWidth={"60%"}/>
    )
}