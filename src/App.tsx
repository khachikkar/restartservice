import React from 'react';
import './App.css';
import MyHeader from "./components/myheader";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import WashingDetails from "./pages/washingDetails";
import Adminka from "./pages/Adminka";
import Footer from "./components/footer";
import {RestartContext} from "./context/contex";


const data : object = []

function App() {
  return (
    <div className="App">
<RestartContext.Provider value={{data}}>


        <BrowserRouter>
            <MyHeader />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/details/:id" element={<WashingDetails />} />
                <Route path="/adminka" element={<Adminka />} />
            </Routes>
            <Footer />
        </BrowserRouter>
</RestartContext.Provider>
    </div>
  );
}

export default App;
