import { UserProvider } from "./UserProvider"
import { BookProvider } from "./BookProvider"

export function AllProvider({ children }) {
        
        return (
            <BookProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </BookProvider>
        )
    }