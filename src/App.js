//import logo from './logo.svg';
import './App.css';
//import Sidebar from "./Components/Sidebar";
import MainPage from './Components/MainPage';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
