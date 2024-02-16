import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.css';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";

import React from 'react'

export default function Sidebar({children}) {
  const menuItem =[
    {
      title: "Home",
      path: "/home"
    },
  ];


  return (
    <div className={styles.container_1}>
      <div className={styles.sidebar}>
      <img src={logo} alt="" className='logo' width={40} style={{ marginLeft: 60, marginTop: 20 }} />
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

          <div className={styles.bottombar}>
            <ButtonSemantic title={"Plot"} path={"/plot"} theme={"white"}/>
            <Link className={styles.b_signout} to="/sign-out" style={{ textDecoration: "none", color: "white",  }}><text>Sign out</text></Link>
          </div>

        </div>      
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  )
}