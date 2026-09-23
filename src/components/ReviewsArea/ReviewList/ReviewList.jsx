import React from "react"
import "./ReviewList.css"
import ReviewCard from "../ReviewCard/ReviewCard"


export default function ReviewList({reviews=[], reviewsSetter}) {

    return (
        <>
            { reviews.length === 0 || reviews === null 
                ?
                <div>
                    <p>There're no reviews for this book yet.</p>
                </div>
                :
                <div className="flex column vCenter reviewListContainer" >
                    {reviews.map((r,k) => 
                        <React.Fragment key={k}> 
                            <ReviewCard review={r} reviewIdx={k} reviewList={reviews} reviewListSetter={reviewsSetter}/>
                        </React.Fragment>
                    )}
                </div>
            }
        </>
    )
}