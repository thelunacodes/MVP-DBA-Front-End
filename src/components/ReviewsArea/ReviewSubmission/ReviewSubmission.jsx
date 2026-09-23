import { useState } from "react"

import "./ReviewSubmission.css"
import StarRating from "../../StarRating/StarRating"
import { UseUserContext } from "../../../Providers/UserProvider";
import { API_URL } from "../../../appConsts";

export default function ReviewSubmission({bookKey, reviews, setReviews}) {
    const {isLoggedIn, currUserId} = UseUserContext();
    const [isSendingReview, setIsSendingReview] = useState(false)

    const [reviewScore, setReviewScore] = useState(0)
    const [reviewComment, setReviewComment] = useState("")
    const delay = ms => new Promise(res => setTimeout(res, ms));

    function resetFields() {
        setReviewComment("")
        setReviewScore(0)
    }

    function getReviewJson() {
        let json = {}
        
        json.user_id = currUserId
        json.book_key = bookKey
        json.review_score = reviewScore
        json.review_comment = reviewComment

        return json;
    }

    function saveReview() {
        setIsSendingReview(true)
        
        let reviewJson = getReviewJson();
        let url = `${API_URL}/review`

        fetch(url, {method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(reviewJson)
        })
        .then(async res => {
            if (!res.ok) {
                await delay(1000) // 1 second
                throw new Error(`Unable to save book review (${res.status} - ${res.statusText})`);
            } 
            return res.json()
        })
        .then(async data => {
            await delay(1000)
            setIsSendingReview(false)
            setReviews([data, ...reviews]) 
            resetFields();
        })
        .catch(async err => {
            await delay(1000)
            setIsSendingReview(false)
            console.error(err)
        })   
    }

    return (
        <>
            { isLoggedIn 
                ?
                    (<div className="flex column vCenter reviewsInputContainer">
                        <div className="flex column vCenter starRatingContainer">
                            <StarRating rating={reviewScore} maxScore={5} hasEmptyStars={true}/>
                            <input disabled={isSendingReview} className="ratingRangeInput" type="range" value={reviewScore} min="0" max="5" step="0.5" onChange={(e) => setReviewScore(Number(e.target.value))} />
                        </div>
                        
                        <textarea className="reviewsTextArea" maxLength="420" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Write your review..." disabled={isSendingReview} />
                        <div className="flex reviewsSubmitContainer">
                            <button title="Submit review" className="appButton" disabled={isSendingReview} onClick={() => saveReview()}>Submit</button>
                        </div>
                    </div>)
                :
                <div className="flex hCenter reviewsInputContainer">
                    <p>You must be logged in to leave a review!</p>
                </div>
            }
        </>
    )
}