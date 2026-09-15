import React from "react"
import BookCard from "../BookCard/BookCard"
import "./BookCardList.css"
import { useNavigate } from "react-router"
import { bookKeyToParameter } from "../../utilFuncs"

export default function BookCardList({bookList}) {
    const navigate = useNavigate()

    if (bookList === undefined || bookList.length === 0) return ( <p>No results :(</p> )                
    
    const keyToParameter = (key) => { return k.s }
    
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