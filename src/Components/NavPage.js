/*import React from 'react'

function NavPage() {
  return (
    <div>Hello</div>
  )
}

export default NavPage*/


import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Lists from '../pages/Home'
import Profile from '../pages/Home'


const NavPage = () => {
  return (
    <React.Fragment>
      <section>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </section>
    </React.Fragment>
  );
};

export default NavPage;