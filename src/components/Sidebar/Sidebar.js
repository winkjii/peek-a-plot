import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.css'
import logo from '../../assets/logo.png';

import React from 'react'

export default function Sidebar({children}) {
  const menuItem =[
    {
      title: "Home",
      path: "/home"
    },
    {
      title: "Lists",
      path: "/lists"
    },
    {
      title: "Profile",
      path: "/profile"
    }
  ];
  return (
    <div className={styles.container_1}>
      <div className={styles.sidebar}>
        <img src={logo} alt="" className='logo' width={40} style={{marginLeft: 60}}/>
        <div className={styles.menu}>
          <div>
            {
               menuItem.map((item, index)=> (
                <NavLink to={item.path} key={index}
                className={styles.link}>
                  <div className={styles.link_title}>{item.title}</div>
                </NavLink>
              ))

            }
          </div>
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}