import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarRating.css"

export default function StarRating({maxScore=5, rating, numOfRatings, hasEmptyStars=false}) {
    var hasHalf = rating % 1 != 0;
    var numOfStars = Math.floor(rating);
    var starsIcon = []

    if (rating === 0) {
        starsIcon.push({icon: faEmptyStar, isEmpty: true});
        var numOfGrayStars = Math.floor(maxScore - rating) - 1;
    } else {
        for (let i = 0; i < numOfStars; i++) {
            starsIcon.push({icon: faStar, isEmpty: false});
        }
            
        if (hasHalf) {
            starsIcon.push({icon: faStarHalfStroke, isEmpty: false});
        }

        var numOfGrayStars = Math.floor(maxScore - rating);
    }

    if (hasEmptyStars) {

        for (let i = 0; i < numOfGrayStars; i++) {
            starsIcon.push({icon: faEmptyStar, isEmpty: true});

        }        
    }

    return (
        <div className="flex row vCenter">
            <p className="ratingVal">{rating.toFixed(1)}</p>
            <div className="flex row starsContainer">
                {starsIcon.map((ico,idx) => <FontAwesomeIcon key={idx} icon={ico.icon} className={`starIcon`} />)}
            </div>
            {numOfRatings && <p className="numOfRatingsVal">{numOfRatings}</p>}
        </div>
    )
}