import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

import React from "react";

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const menuItem = [
    {
      title: "Home",
      path: "/home",
    },
  ];

  // console.log("login", auth?.currentUser?.email);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container_1}>
      <div className={styles.sidebar}>
        <img
          src={logo}
          alt=""
          className="logo"
          width={40}
          style={{ marginLeft: 60, marginTop: 20 }}
        />
        <div className={styles.menu}>
          <div>
            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className={styles.link}>
                <div className={styles.link_title}>{item.title}</div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className={styles.bottombar}>
          <ButtonSemantic
            title={"Plot"}
            path={"/plot"}
            theme={"white"}
            width={130}
            fontSize={17}
          />
          {/* <Link
            className={styles.b_signout}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          > */}
          <div className={styles.b_signout} onClick={logout}>
            Sign out
          </div>
          {/* </Link> */}
        </div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
