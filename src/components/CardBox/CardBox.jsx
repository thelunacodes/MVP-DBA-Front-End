import "./CardBox.css"

export default function CardBox({margin, cardContent, hasHoverResponse, cardWidth, cardHeight, hasRoundedCorner}) {

    const cardBoxStyle = {
        '--card-margin': `${margin ?? '0px 0px 0px 0px'}`,
        '--card-width': `${cardWidth ?? 'fit-content'}`,
        '--card-height': `${cardHeight ?? 'fit-content'}`,
        '--card-cursor': `${hasHoverResponse ? 'pointer' : 'default'}`,
        "--border-radius": `${hasRoundedCorner ? "10px" : "0px"}`
    }

    return (
        <div className="cardContainer" style={cardBoxStyle}>
            {cardContent}
        </div>
    )
}