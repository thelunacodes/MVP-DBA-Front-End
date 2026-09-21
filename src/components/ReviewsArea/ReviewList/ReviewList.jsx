import React from "react"
import "./ReviewList.css"


export default function ReviewList({reviews=[]}) {

    return (
        <>
            { reviews.length === 0 || reviews === null 
                ?
                <div>
                    <p>There're no reviews for this book yet.</p>
                </div>
                :
                <div>
                    {reviews.map((review,idx) => 
                        <React.Fragment key={idx}> 
                            {JSON.stringify(review)}
                        </React.Fragment>
                    )}
                </div>
            }
        </>
    )
}