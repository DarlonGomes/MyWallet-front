import { createContext, useState } from "react";
export const UserContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);

    return(
        <UserContext.Provider value={{ data, setData, token, setToken}}>
            { children }
        </UserContext.Provider>
    )
}

export default DataProvider;