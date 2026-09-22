import { useEffect, useState } from "react";

import "./ReviewsArea.css"
import ReviewSubmission from "./ReviewSubmission/ReviewSubmission";
import { API_URL } from "../../appConsts";
import { bookKeyToParameter } from "../../utilFuncs";
import ReviewList from "./ReviewList/ReviewList";

export default function ReviewsArea({bookKey="no key"}) {
    const [loadingReviews, setLoadingReviews] = useState(false); 
    const [bookReviews, setBookReviews] = useState([]) 

    function loadReviews() {
        setLoadingReviews(true);

        let url = `${API_URL}/review/bookKey?book_key=${bookKeyToParameter(bookKey)}`
        fetch(url, {method: "get"})
            .then(res => {
                if (!res.ok) throw new Error(`Unable to load reviews of this book (${res.status} - ${res.statusText})`); 
                return res.json()
            })
            .then(data => {
                setLoadingReviews(false)
                console.log(data.review)
                setBookReviews(data.review)
            })
            .catch(err => {
                setLoadingReviews(false)
                console.error(err)
            })   
    }

    useEffect(() => {
        if (bookKey != "no key") loadReviews();
    }, [])

    return (
        <div className="flex column vCenter reviewsArea">
            <p className="reviewsHeader semibold">Reviews</p>
            <ReviewSubmission bookKey={bookKey} reviews={bookReviews} setReviews={setBookReviews}/>

            {
                loadingReviews 
                ?
                    <p className="centeredText semibold loadingMsg">Loading...</p>
                :
                    <ReviewList reviews={bookReviews} reviewsSetter={setBookReviews} />
            }
        </div>
    )
}