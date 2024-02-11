//import logo from './logo.svg';
import './App.css';
//import Sidebar from "./Components/Sidebar";
import MainPage from './Components/MainPage';
import Landing from './pages/Landing';
import Sign_in from "./pages/SignIn";
import Sign_up from "./pages/SignUp";
import React from 'react';
import { BrowserRouter } from "react-router-dom";

function App() {
  let Component
  switch (window.location.pathname) {
    // case "/":
    //   Component = <Home />;
    //   break;
    //   case "/home":
    //     Component = <Home />;
    //     break;
    case "/sign-in":
      Component = <Sign_in />;
      break;
    case "/sign-up":
      Component = <Sign_up />;
      break;
    case "/landing":
      Component = <Landing />;
  }
  return (
    <React.Fragment>
      {Component}
      {/* <BrowserRouter>
        <MainPage />
      </BrowserRouter> */}
    </React.Fragment>
  );
}

export default App;
