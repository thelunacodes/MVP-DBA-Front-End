import { useState } from "react"

import "./ReviewSubmission.css"
import StarRating from "../../StarRating/StarRating"
import { UseUserContext } from "../../../UserProvider";
import { API_URL } from "../../../appConsts";

export default function ReviewSubmission({bookKey}) {
    const {isLoggedIn, currUserId} = UseUserContext();
    const [isSendingReview, setIsSendingReview] = useState(false)

    const [reviewScore, setReviewScore] = useState(0)
    const [reviewComment, setReviewComment] = useState("")

    function handleRatingChange(newValue="no key") {
        setReviewScore(Number(newValue));
    }

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
        .then(res => {
            if (!res.ok) {
                setIsSendingReview(false)
                throw new Error(`Unable to save book review (${res.status} - ${res.statusText})`);
            } 
            return res.json()
        })
        .then(data => {
            setIsSendingReview(false)
            resetFields();
        })
        .catch(err => {
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
                            <input disabled={isSendingReview} className="ratingRangeInput" type="range" value={reviewScore} min="0" max="5" step="0.5" onChange={(e) => handleRatingChange(e.target.value)} />
                        </div>
                        
                        <textarea className="reviewsTextArea" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder={`Write your review... (KEY= ${bookKey})`} disabled={isSendingReview} />
                        {/* <textarea className="reviewsTextArea" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Write your review..." disabled={isSendingReview} /> */}
                        <div className="flex reviewsSubmitContainer">
                            <button title="Submit review" className="appButton" disabled={isSendingReview} onClick={() => saveReview()}>Submit</button>
                        </div>
                    </div>)
                :
                <div className="reviewsInputContainer">
                    <textarea className="reviewsTextArea" value="You must have an account to write a review!" disabled />
                </div>
            }
        </>
    )
}