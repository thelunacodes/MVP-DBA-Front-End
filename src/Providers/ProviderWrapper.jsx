import { ModalProvider } from "./ModalProvider";
import { UserProvider } from "./UserProvider";

export default function ProviderWrapper({children}) {

    return (
        <UserProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </UserProvider>
    )
}