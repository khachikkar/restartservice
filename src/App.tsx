import React from 'react';
import './App.css';
import MyHeader from "./components/myheader";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import WashingDetails from "./pages/washingDetails";
import Adminka from "./pages/Adminka";
import FilteredProducts from "./pages/FilteredProducts";
import Footer from "./components/footer";
import {RestartContext} from "./context/contex";
const data : object = []

function App() {
    return (
        <div className="App">
            <RestartContext.Provider value={{data}}>
                <BrowserRouter>

                    <MyHeader/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/details" element={<WashingDetails/>}/>
                        <Route path="/adminka" element={<Adminka/>}/>
                        <Route path="/category/:category" element={<FilteredProducts/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </RestartContext.Provider>
        </div>
    );
}

export default App;
