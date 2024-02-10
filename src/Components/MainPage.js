import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../src/App.css"
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home"
import Lists from "../pages/Lists"
import Profile from "../pages/Profile"


const MainPage = () => {
  return (
    <React.Fragment>

      <div className="container">
        <div>
          <div>
            <Sidebar>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/lists" element={<Lists/>}/>
                <Route path="/profile" element={<Profile/>}/>
              </Routes>
            </Sidebar>
          </div>
        </div>



        {/* heading section */}
          <div className="header">
            <Navbar />
            
          </div>
      </div>
    </React.Fragment>
  );
};

export default MainPage;