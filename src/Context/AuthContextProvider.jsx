import { createContext, useEffect, useState } from "react"


export const authcontext = createContext()


function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null)

    useEffect(() => {

        if (localStorage.getItem("tkn") != null) {

            setToken(localStorage.getItem("tkn"))
        }
    }, [])
    console.log(token);

    return (
        <authcontext.Provider value={{
            token,
            setToken,
        }}>
            {children}
        </authcontext.Provider>
    )
}

export default AuthContextProvider