import { cache, createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../appConsts";
import { getCachedResponse } from "../utilFuncs";

const UserContext = createContext(undefined);

export function UserProvider({children}) {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user has already logged in
    useEffect(() => {
        const cachedUserId = getCachedResponse("loggedInUserId");
        if (cachedUserId) {
            setUserId(Number(cachedUserId)); 
        }
    }, [])

    useEffect(() => {
        if (typeof userId === 'number') {
            let url = `${API_URL}/userbyid?id=${userId}`;

            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error(`Unable to fetch user (${res.status} - ${res.statusText})`)
                    return res.json()
                })
                .then(data => {
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
                            setUserId: setUserId,
                            isLoggedIn: isLoggedIn, 
                            username: user ? `${user.name} ${user.surname}` : null }

    return (
        <UserContext.Provider value={providerValue} >
            {children}
        </UserContext.Provider>
    )
}

export function UseUserContext() {
    const context = useContext(UserContext);

    if (!context) throw new Error("O 'UseUserContext' deve ser usado dentro de um 'UserProvider'!")

    return context;
}