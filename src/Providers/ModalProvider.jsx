import { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined);

export function ModalProvider({children}) {
    const [modalContent, setModalContent] = useState(<></>)
    const [showModal, setShowModal] = useState(false);
    const [canCloseModal, setCanCloseModal] = useState(true)
    
    function closeModal() {
        if (canCloseModal) {
            setShowModal(false);
            setModalContent(<></>)
        }
    }

    let providerValue = { modalContent: modalContent,
                          setModalContent: setModalContent,
                          showModal: showModal,
                          setShowModal: setShowModal, 
                          canCloseModal: canCloseModal,
                          setCanCloseModal: setCanCloseModal,
                          closeModal: closeModal}

    return (
        <ModalContext.Provider value={providerValue} >
            {children}
        </ModalContext.Provider>
    )
}

export function UseModalContext() {
    const context = useContext(ModalContext);

    if (!context) throw new Error("O 'UseModalContext' deve ser usado dentro de um 'ModalProvider'!")

    return context;
}