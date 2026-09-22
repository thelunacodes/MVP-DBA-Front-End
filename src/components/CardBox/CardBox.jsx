import "./CardBox.css"

export default function CardBox({margin, cardContent, hasHoverResponse, minCardWidth, maxCardWidth, cardWidth, minCardHeight, maxCardHeight, cardHeight, hasRoundedCorner}) {

    const cardBoxStyle = {
        '--card-margin': `${margin ?? '0px 0px 0px 0px'}`,
        '--card-width': `${cardWidth ?? 'fit-content'}`,
        '--card-height': `${cardHeight ?? 'fit-content'}`,
        '--card-cursor': `${hasHoverResponse ? 'pointer' : 'default'}`,
        "--border-radius": `${hasRoundedCorner ? "10px" : "0px"}`,
        "--min-card-width": `${minCardWidth ?? "none"}`,
        "--max-card-width": `${maxCardWidth ?? "none"}`,
        "--min-card-height": `${minCardHeight ?? "none"}`,
        "--max-card-height": `${maxCardHeight ?? "none"}`,
    }

    return (
        <div className="cardContainer" style={cardBoxStyle}>
            {cardContent}
        </div>
    )
}