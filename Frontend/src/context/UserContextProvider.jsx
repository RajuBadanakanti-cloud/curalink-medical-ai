import { useEffect, useState } from "react"
import UserContext from "./UserContext"


const UserContextProvider = ({children}) => {
        const [queries, setQueries] = useState(() => {
            try {
                const stored = localStorage.getItem("queries")
                return stored ? JSON.parse(stored) : []
            } catch (error) {
                console.error("Failed to parse queries from localStorage", error)
                return []
            }
        })

        const [autoFocused, setAutoFocused] = useState(false)
        const [openSidebar, setOpenSidebar] = useState(true)

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    
    useEffect(() => {
        localStorage.setItem("queries", JSON.stringify(queries))
        
    }, [queries])   

    return (
        <UserContext.Provider value={{queries, setQueries, autoFocused, setAutoFocused, openSidebar, setOpenSidebar}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider