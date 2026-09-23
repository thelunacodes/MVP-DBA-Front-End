import React from "react"

import BookCard from "../BookCard/BookCard"
import "./BookCardList.css"

export default function BookCardList({bookList}) {
    if (bookList === undefined || bookList.length === 0) return ( <p className="centeredText">No results :(</p> )     
    
    return (
        <div className="flex column vCenter bookCardLstContainer">
           { bookList.map((b, k) => 
                <React.Fragment key={k}>
                    <BookCard book={b} />
                </React.Fragment>
           )}
        </div>
        
    )
}