import logo from "../../assets/logo.png";
import tel from "../../assets/telephone.png";
import x from "../../assets/x.jpg";
import howTo1 from "../../assets/howTo-1.png";
import howTo2 from "../../assets/howTo-2.png";
import howTo3 from "../../assets/howTo-3.png";
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
      behavior: "smooth",
    });
  };
  const contactData = [
    {
      logo: tel,
      title: "Call Center",
      description: "084-478-7690",
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

  const howToUse = [
    {
      title:
        "1. เมื่อผู้ใช้เข้าสู่หน้าเว็บให้ทำการ Sign-in / Log-in เพื่อทำการเข้าสู่ระบบ ",
      pic: howTo1,
    },
    {
      title:
        "2. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต",
      pic: howTo2,
    },
    {
      title:
        "3. เมื่อเข้าสู่หน้าของการเขียนพล็อตแล้วจะสามารถทำการเขียนและโพสพล็อตได้",
      pic: howTo3,
    },
  ];
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.appName}>Peek-A-Plot</div>
        <div className={styles.navbarRight}>
          <div
            className={styles.navbarTxt}
            onClick={() => scrollToComponent(contact)}
          >
            Contact us
          </div>
          <div
            className={styles.navbarTxt}
            onClick={() => scrollToComponent(howto)}
          >
            User guide
          </div>
          <Link
            to="/sign-in"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={styles.navbarTxt}>Sign-in</div>
          </Link>
          <ButtonSemantic
            title={"Get started"}
            path={"/sign-up"}
            theme={"#541C9C"}
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
            color={"#541C9C"}
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
          {"\t"}Peek-A-Plot เป็นเว็บแอปพลิเคชันสำหรับเขียนพล็อต เพื่อนำเสนอ,
          แบ่งปันเนื้อหา และแลกเปลี่ยนความคิดต่างๆ ได้อย่างสะดวกสบาย
          และป้องกันการละเมิดลิขสิทธิ์และปัญหาที่อาจเกิดขึ้น
          เนื่องจากปัจจุบันผู้คนหันมาสนใจงานเขียนและการอ่านหนังสือมากขึ้นเพราะไม่เพียงเสริมสร้างทักษะทางภาษาแต่ยังส่งเสริมคิดเชิงสร้างสรรค์
          และเนื่องจากการเขียนและการแสดงผลงานที่กระจัดกระจายอาจเกิดปัญหาบางอย่าง
          เช่น การหยิบยืมไอเดียหรือเนื้อหาจากผลงานของผู้อื่นโดยไม่ได้รับอนุญาต
          ซึ่งอาจก่อให้เกิดความขัดแย้งเพื่อแก้ไขปัญหาดังกล่าว
          จึงได้จัดทำเว็บนี้ขึ้นมา
        </text>
      </div>
      <div className={styles.howto}>
        <div className={styles.title} ref={howto}>
          วิธีการใช้งาน
        </div>
        {howToUse.map((data, i) => (
          <div key={i} className={styles.eachHowTo}>
            <text className={styles.content}>{data.title}</text>
            <img
              src={data.pic}
              alt=""
              width={500}
              style={{ objectFit: "contain", marginBottom: 60}}
            />
          </div>
        ))}
      </div>
      <div className={styles.contact}>
        <text className={styles.title} ref={contact}>
          ติดต่อเรา
        </text>
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
