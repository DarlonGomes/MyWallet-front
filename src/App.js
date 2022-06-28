import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./context/UserContext"
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/onboard/Home";
import Spending from "./components/onboard/Spending";
import Income from "./components/onboard/Income";

export default function App () {
    return(
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/home/spent" element={<Spending/>} />
                    <Route path="/home/income" element={<Income/>} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    )
}