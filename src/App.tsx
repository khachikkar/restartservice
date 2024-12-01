import React from 'react';
import './App.css';
import MyHeader from "./components/myheader";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import WashingDetails from "./pages/washingDetails";
import Adminka from "./pages/Adminka";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <MyHeader />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/details/:id" element={<WashingDetails />} />
                <Route path="/adminka" element={<Adminka />} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
