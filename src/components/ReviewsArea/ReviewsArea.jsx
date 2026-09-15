import { useState } from "react";
import { UseUserContext } from "../../providers/UserProvider";
import "./ReviewsArea.css"

export default function ReviewsArea() {
    const {isLoggedIn} = UseUserContext();
    const [userReview, setUserReview] = useState("")
    const [loadingReviews, setLoadingReview] = useState(false); //TODO: MOVER PARA PROVIDER PRÓPRIO
    const [bookReviews, setBookReviews] = useState([]) //TODO: MOVER PARA PROVIDER PRÓPRIO

    return (
        <div className="flex column vCenter reviewsArea">
            <p className="reviewsHeader semibold">Reviews</p>
        
            { isLoggedIn 
                ?
                <div className="reviewsInputContainer">
                    <textarea className="reviewsTextArea" value={userReview} onChange={(e) => setUserReview(e.target.value)} placeholder="Write your review..." />
                    <div className="flex reviewsSubmitContainer">
                        <button title="Submit review" className="appButton">Submit</button>
                    </div>
                </div>
                :
                <div></div>
            }
            {
                loadingReviews 
                ?
                    <p className="centeredText semibold loadingMsg">Loading...</p>
                :
                    <div> 
                        
                    </div>
            }
        </div>
    )
}