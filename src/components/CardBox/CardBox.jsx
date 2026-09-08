import "./CardBox.css"

export default function CardBox({margin, cardContent, hasHoverResponse, occupyWidth=false, occupyHeight=false, hasRoundedCorner}) {

    const cardBoxStyle = {
        '--card-margin': `${margin ?? '0px 0px 0px 0px'}`,
        '--card-width': `${occupyWidth ? '100%' : 'fit-content'}`,
        '--card-height': `${occupyHeight ? '100%' : 'fit-content'}`,
        '--card-cursor': `${hasHoverResponse ? 'pointer' : 'default'}`,
        "--border-radius": `${hasRoundedCorner ? "10px" : "0px"}`
    }

    return (
        <div className="cardContainer" style={cardBoxStyle}>
            {cardContent}
        </div>
    )
}