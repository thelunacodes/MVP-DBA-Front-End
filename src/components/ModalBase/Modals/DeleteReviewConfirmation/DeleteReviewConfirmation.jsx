import { useState } from "react";
import { API_URL } from "../../../../appConsts";
import { UseModalContext } from "../../../../Providers/ModalProvider"
import "./DeleteReviewConfirmation.css"
import { isNumber } from "../../../../utilFuncs";


export default function DeleteReviewConfirmation({reviewId, reviewList, reviewListSetter}) {
    const {setShowModal, closeModal, setCanCloseModal} = UseModalContext();
    const [isDeleting, setIsDeleting] = useState(false);

    function deleteReview() {
        if (!isNumber(reviewId)) return;

        setCanCloseModal(false)
        setIsDeleting(true);

        let url = `${API_URL}/review?pk_id=${reviewId}`
        fetch(url, {method: "delete", 
            headers: {
                "content-type": "application/json"
            },
            body: {pk_id: reviewId}})
        .then (res => {
            if (!res.ok) throw new Error(`Unable to delete review (${res.status} - ${res.statusText})`)
            return res.json()
        })
        .then(_ => {
            setIsDeleting(false);
            setCanCloseModal(true);
            reviewListSetter(reviewList.filter(r => r.pk_id != reviewId))
            setShowModal(false);
        })
        .catch(err => {
            setIsDeleting(false)
            setCanCloseModal(true);
            console.error(err)
        })
    }

    return (
        <div className="flex column vCenter delReviewContainer">
            <p className="semibold" style={{fontSize: "1.2rem", marginBottom: "5px"}}>Are you sure?</p>
            <p>Your review will be lost forever! (a very long time)</p>
            <div className="flex row hCenter" style={{marginTop: "25px",gap: "5px", boxSizing: "border-box", alignItems: "center"}}>
                <button className="appButton cancelBtn" onClick={() => closeModal()} disabled={isDeleting}>Cancel</button>
                <button className="appButton" disabled={isDeleting} onClick={() => deleteReview()}>Confirm</button>
            </div>
        
        </div>
    )
}