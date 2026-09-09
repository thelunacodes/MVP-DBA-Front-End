import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../appConsts";

const UserContext = createContext(undefined);

export function UserProvider({children}) {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        if (typeof userId === 'number') {
            let url = `${API_URL}/userbyid?id=${userId}`;

            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error(`Unable to fetch user: ${res.status}`)
                    return res.json()
                })
                .then(data => {
                    // console.log("User:", data)

                    setUser(data);
                    setIsLoggedIn(true)
                })
                .catch(err => {
                    console.error(err);
                    setUser(null);
                    setIsLoggedIn(false);
                })
        } else {
            setIsLoggedIn(false)
        }
    }, [userId]);

    let providerValue = { currUser: user, 
                            currUserId: userId, 
                            userIdSetter: setUserId,
                            isLoggedIn: isLoggedIn, 
                            username: user ? `${user.name} ${user.surname}` : null }

    return (
        <UserContext.Provider value={providerValue}
        >
            {children}
        </UserContext.Provider>
    )
}

export function UseUserContext() {
    const context = useContext(UserContext);

    if (!context) throw new Error("O 'UseUserContext' deve ser usado dentro de um 'UserProvider'!")

    return context;
}