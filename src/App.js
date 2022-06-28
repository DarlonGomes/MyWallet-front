import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext"

export default function App () {
    return(
        <DataProvider>
            <BrowserRouter>
                <Routes>
                
                </Routes>
            </BrowserRouter>
        </DataProvider>
    )
}