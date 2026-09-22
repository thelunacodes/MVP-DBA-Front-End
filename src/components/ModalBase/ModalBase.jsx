import "./ModalBase.css"
import CardBox from "../CardBox/CardBox"
import { UseModalContext } from "../../Providers/ModalProvider"

export default function ModalBase() {
    const { modalContent, showModal, closeModal } = UseModalContext();
    
    return (
        <>
            { showModal && 
                <div className="flex vCenter hCenter modalBackground" onClick={() => closeModal()}>
                    <div className="wrapper" onClick={(e) => e.stopPropagation()}>
                        <CardBox cardContent={modalContent} hasRoundedCorner={true} />  
                    </div>
                        
                </div>
                
            }
        </>
    )
}