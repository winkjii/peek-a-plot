/*import {SidebarData} from '../data/SidebarData'
import { NavLink } from "react-router-dom";
import logo_ghost from '../assets/Ghost-003.png'

import React from 'react'

const Sidebar = () => {
    const activeLink = 'hover:bg-red-500 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-red-500'
    const normalLink = 'hover:bg-red-500 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold'

  return (
    <React.Fragment>
    <section>
      <div className="text-white">
        <img src={logo_ghost} alt="" className='logo'/>
          {
               SidebarData.map((item, index)=>{
                return(
                    <div className="text" key={index}>
                        <NavLink to={item.path}
                        className={({ isActive }) =>
                        isActive ? activeLink: normalLink}
                         >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                        </NavLink>
                        
                    </div>
                )
              })
          }
  
      </div>
    </section>
  </React.Fragment>
  )
}

export default Sidebar*/


import {SidebarData} from '../data/SidebarData'
import { NavLink } from "react-router-dom";
import logo_ghost from '../assets/Ghost-003.png'

import React from 'react'

export default function Sidebar() {
  return (
    <div className='container_1'>
      <div className='sidebar'>
        <img src={logo_ghost} alt="" className='logo'/>
        <div className='menu'>
          <div>
            {
              SidebarData.map((item, index)=> (
                <NavLink to={item.path} key={index}
                className="link">
                  <div className='link_title'>{item.title}</div>
                </NavLink>
              ))

            }
          </div>
        </div>
      </div>
    </div>
  )
}
