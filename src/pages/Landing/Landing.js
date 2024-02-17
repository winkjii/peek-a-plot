import logo from "../../assets/logo.png";
import tel from "../../assets/telephone.png";
import x from "../../assets/x.jpg";
import email from "../../assets/email.png";
import styles from "./Landing.module.css";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Landing() {
  const howto = useRef(null);
  const contact = useRef(null);

  const scrollToComponent = (elementRef) => {
    window.scrollTo({
      top: elementRef.current?.offsetTop,
      behavior: "smooth"
    })
  }
  const contactData = [
    {
      logo: tel,
      title: "Call Center",
      description: "088-888-8888",
    },
    {
      logo: x,
      title: "X",
      description: "@Peek-A-Plot",
    },
    {
      logo: email,
      title: "E-mail",
      description: "peekaplot@gmail.com",
    },
  ];
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.appName}>Peek-A-Plot</div>
        <div className={styles.navbarRight}>
          <div className={styles.navbarTxt} onClick={() => scrollToComponent(contact)}>Contact us</div>
          <div className={styles.navbarTxt} onClick={() => scrollToComponent(howto)}>User guide</div>
          <Link
            to="/sign-in"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.navbarTxt}>Sign-in</div>
          </Link>
          <ButtonSemantic
            title={"Get started"}
            path={"/sign-up"}
            theme={"black"}
            fontSize={13}
          />
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.text}>
            <text className={styles.headerTxt}>Welcome my boo...</text>
            <text className={styles.headerTxt}>It's great to meet you</text>
          </div>
          <ButtonSemantic
            title={"Start Writing"}
            path={"/sign-up"}
            theme={"white"}
            width={210}
            height={37}
          />
        </div>
        <img
          src={logo}
          alt=""
          width={110}
          height={130}
          style={{ objectFit: "contain", marginTop: 20 }}
        />
      </div>
      <div className={styles.description}>
        <text className={styles.title}>Peek-A-Plot คืออะไร</text>
        <text className={styles.contentDescription}>
          {"\t"}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          vestibulum, metus at consectetur elementum, leo neque cursus metus,
          vitae mollis enim leo accumsan elit. Pellentesque a urna vel odio
          pellentesque bibendum. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Ut fermentum malesuada
          justo in fringilla.
        </text>
      </div>
      <div className={styles.howto}>
        <div className={styles.title} ref={howto}>วิธีการใช้งาน</div>
        <text className={styles.content}>
          1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต
        </text>
        <img
          src={logo}
          alt=""
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
        {/* // -------------------------------------// */}
        <text className={styles.content}>
          1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต
        </text>
        <img
          src={logo}
          alt=""
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
        <text className={styles.content}>
          1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต
        </text>
        <img
          src={logo}
          alt=""
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
        <text className={styles.content}>
          1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต
        </text>
        <img
          src={logo}
          alt=""
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
        <text className={styles.content}>
          1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต
        </text>
        <img
          src={logo}
          alt=""
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
        {/* // ---------------------------// */}
      </div>
      <div className={styles.contact}>
        <text className={styles.title} ref={contact}>ติดต่อเรา</text>
        <text className={styles.content}>
          ติดต่อสอบถามข้อมูลต่างๆได้ตามช่องทางดังนี้
        </text>
        <div className={styles.dataContainer}>
          {contactData.map((item, index) => {
            return (
              <div className={styles.data} key={index}>
                <img
                  src={item.logo}
                  alt=""
                  width={40}
                  height={40}
                  style={{ objectFit: "contain", borderRadius: 7 }}
                />
                <text className={styles.contactName}>{item.title}</text>
                <text className={styles.contactData}>{item.description}</text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
