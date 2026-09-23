import { useEffect, useState } from "react";

import "./ReviewCard.css"
import CardBox from "../../CardBox/CardBox"
import { API_URL } from "../../../appConsts";
import { formatDateTime, formatFullName, isEmpty } from "../../../utilFuncs";
import StarRating from "../../StarRating/StarRating";
import { UseUserContext } from "../../../Providers/UserProvider";
import { UseModalContext } from "../../../Providers/ModalProvider";
import DeleteReviewConfirmation from "../../ModalBase/Modals/DeleteReviewConfirmation/DeleteReviewConfirmation";


export default function ReviewCard({review, reviewIdx, reviewList, reviewListSetter}) {
    const { currUserId, username } = UseUserContext();
    const [editMode, setEditMode] = useState(false)
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

    // "Like" stuff
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    function likeReview() {
        setLiked(!liked)
        setLikeCount(c => !liked ? c + 1 : c - 1)

        //TODO: registrar like
    }

    //Edit stuff
    const [rCommentEdit, setRCommentEdit] = useState(review.review_comment)
    const [rScoreEdit, setRScoreEdit] = useState(Number(review.review_score))
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    
    function cancelEdit() {
        setRCommentEdit(review.review_comment);
        setRScoreEdit(Number(review.review_score));
        setEditMode(false);
    }

    function getReviewEditJson() {
        let reviewEditJson = {}

        reviewEditJson.pk_id = review.pk_id;
        reviewEditJson.user_id = review.user_id;
        reviewEditJson.book_key = review.book_key;
        reviewEditJson.review_score = rScoreEdit;
        reviewEditJson.review_comment = rCommentEdit;

        return reviewEditJson
    }

    function saveEdit() {
        setIsSavingEdit(true);
        
        let reviewEditJson = getReviewEditJson();
        let url = `${API_URL}/review`

        fetch(url, {method:"put", 
            headers: {
                "content-type": "application/json"
            }, 
            body: JSON.stringify(reviewEditJson)})
            .then(res => {
                if (!res.ok) throw new Error(`Unable to update book review (${res.status} - ${res.statusText})`);
                return res.json();
            })
            .then(updatedReview => {
                reviewList[reviewIdx] = updatedReview;
                reviewListSetter([...reviewList])
                setIsSavingEdit(false);
                setEditMode(false);
            })
            .catch(err => {
                console.error(err)
                setIsSavingEdit(false);
            })
    }

    const { setModalContent, setShowModal } = UseModalContext();

    function showDeleteReviewConfirmationModal() {
        setModalContent(<DeleteReviewConfirmation reviewId={review.pk_id} reviewList={reviewList} reviewListSetter={reviewListSetter}/>)
        setShowModal(true)
    }

    return (
        <CardBox cardContent={
            <div className="reviewCardContainer">
                { editMode
                ?
                    // EDIT REVIEW
                    <>
                        <p className="semibold reviewUserName">{reviewUserName}</p>

                        <div className="flex column vCenter">
                            <div className="flex column vCenter rEditScoreContainer">
                                <StarRating className="reviewRating" maxScore={5} rating={rScoreEdit} hasEmptyStars={true}/>
                                <input disabled={isSavingEdit} className="rEditScoreInput" type="range" value={rScoreEdit} min="0" max="5" step="0.5" onChange={(e) => setRScoreEdit(Number(e.target.value))} />
                            </div>
                            
                            <textarea className="rEditCommentInput" maxLength="420" value={rCommentEdit} onChange={(e) => setRCommentEdit(e.target.value)} disabled={isSavingEdit}/>

                            <div className="flex reviewCardBottom">
                                { review.user_id === currUserId && 
                                    <div className="flex row reviewCardBottomBtns"> 
                                        <button className="appButton cancelBtn" onClick={() => cancelEdit()}>Cancel</button>
                                        <button className="appButton" onClick={() => saveEdit()}>Save</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                :
                    // DISPLAY REVIEW
                    <>
                        <p className="semibold reviewUserName">{reviewUserName}</p>
                        <StarRating className="reviewRating" maxScore={5} rating={Number(review.review_score)} hasEmptyStars={true}/>
                        
                        { !isEmpty(review.review_comment) && <p className="reviewComment">{review.review_comment}</p> }

                        <div className="flex reviewCardBottom">
                            <p className="reviewDatetime secondaryText">{formatDateTime(review.created_at)}</p> 
                        
                            <div className="flex row reviewCardBottomBtns"> 
                                <p className={`reviewBottomBtn secondaryText ${liked && 'likedReview'}`} onClick={() => likeReview()}>{liked ? 'Unlike' : 'Like'} ({likeCount})</p>
                                { review.user_id === currUserId && 
                                    <>
                                        <p title="Edit review" className="reviewBottomBtn secondaryText" onClick={() => setEditMode(true)}>Edit</p>
                                        <p title="Delete review" className="reviewBottomBtn secondaryText" onClick={() => showDeleteReviewConfirmationModal()}>Delete</p>
                                    </>
                            }
                            </div>
                            
                        </div>
                    </>
                    
                }
                
            </div>
        } hasRoundedCorner={true} cardWidth={"50%"} minCardWidth={"560px"}/>
    )
}