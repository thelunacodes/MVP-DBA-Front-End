import { useEffect, useState } from "react";

import "./ReviewCard.css"
import CardBox from "../../CardBox/CardBox"
import { API_URL } from "../../../appConsts";
import { formatDateTime, formatFullName, isEmpty } from "../../../utilFuncs";
import StarRating from "../../StarRating/StarRating";
import { UseUserContext } from "../../../Providers/UserProvider";
import { UseModalContext } from "../../../Providers/ModalProvider";
import DeleteReviewConfirmation from "../../ModalBase/Modals/DeleteReviewConfirmation/DeleteReviewConfirmation";


export default function ReviewCard({review, reviewList, reviewListSetter}) {
    const { currUserId, username } = UseUserContext();
    const [reviewUserName, setReviewUserName] = useState("")
    
    // Get username
    useEffect(() => {
        console.log(`currUserId: ${currUserId}`)

        if (currUserId === Number(review.user_id)) {
            setReviewUserName(username);
            return;
        }

        let url = `${API_URL}/userbyid?id=${review.user_id}`;

            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error(`Unable to fetch user (${res.status} - ${res.statusText})`)
                    return res.json()
                })
                .then(data => {
                    setReviewUserName(formatFullName(data));
                })
                .catch(err => {
                    console.error(err);
                    setReviewUserName("")
                })
    }, [review])

    const { setModalContent, setShowModal } = UseModalContext();

    function showDeleteReviewConfirmationModal() {
        console.log(review)
        setModalContent(<DeleteReviewConfirmation reviewId={review.pk_id} reviewList={reviewList} reviewListSetter={reviewListSetter}/>)
        setShowModal(true)
    }

    return (
        <CardBox cardContent={
            <div className="reviewCardContainer">
                <p className="semibold reviewUserName">{reviewUserName}</p>
                <StarRating className="reviewRating" maxScore={5} rating={Number(review.review_score)} hasEmptyStars={true}/>
                
                { !isEmpty(review.review_comment) && <p className="reviewComment">{review.review_comment}</p> }

                <div className="flex reviewCardBottom">
                    <p className="reviewDatetime secondaryText">{formatDateTime(review.created_at)}</p> 
                    { review.user_id === currUserId && 
                        <div className="flex row editDeleteReview"> 
                            <p title="Edit review" className="reviewBottomBtn secondaryText">Edit</p>
                            <p title="Delete review" className="reviewBottomBtn secondaryText" onClick={() => showDeleteReviewConfirmationModal()}>Delete</p>
                        </div>
                    }
                </div>
            </div>
        } hasRoundedCorner={true} cardWidth={"50%"} minCardWidth={"560px"}/>
    )
}