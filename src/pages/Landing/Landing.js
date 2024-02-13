import logo from "../../assets/logo.png";
import tel from "../../assets/telephone.png"
import line from "../../assets/line.png"
import email from "../../assets/email.png"
import styles from "./Landing.module.css"
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";
import { Link } from "react-router-dom";

export default function Landing() {
    const contact = [
        {
            logo: tel,
            title: "Call Center",
            description: "088-888-8888",
        },
        {
            logo: line,
            title: "X",
            description: "@Peek-A-Plot",
        },
        {
            logo: email,
            title: "E-mail",
            description: "peekaplot@gmail.com",
        },
    ]
  return (
    <div>
      <div className={styles.navbar}>
        <div>Peek-A-Plot</div>
        <div className={styles.navbarRight}>
          <text>Contact us</text>
          <text>User guide</text>
          <Link to="/sign-in" style={{ textDecoration: "none", color: "inherit" }}><text>Sign-in</text></Link>
          <ButtonSemantic title={"Get started"} path={"/sign-up"} theme={"black"}/>
        </div>
      </div>
      <div className={styles.header}>
        <div>
          <div className={styles.text}>
            <text className={styles.headerTxt}>Welcome my boo...</text>
            <text className={styles.headerTxt}>It's great to meet you</text>
          </div>
          <button>Start Writing</button>
        </div>
        <img src={logo} alt="" width={100} height={300} style={{objectFit: "contain"}}/>
      </div>
      <div className={styles.description}>
        <text className={styles.descriptionTitle}>Peek-A-Plot คืออะไร</text>
        <text>       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum, metus at consectetur elementum, leo neque cursus metus, vitae mollis enim leo accumsan elit. Pellentesque a urna vel odio pellentesque bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut fermentum malesuada justo in fringilla.</text>
      </div>
      <div className={styles.howto}>
        <text>วิธีการใช้งาน</text>
        <text>1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต</text>
        <img src={logo}  alt="" width={300} height={300} style={{objectFit: "contain"}}/>
      </div>
      <div className={styles.contact}>
        <text style={{marginBottom: 10}}>ติดต่อเรา</text>
        <text style={{marginBottom: 30}}>ติดต่อสอบถามข้อมูลต่างๆได้ตามช่องทางดังนี้</text>
        <div className={styles.dataContainer}>
        {contact.map((item, index) => {
            return (
                <div className={styles.data}>
                <img src={item.logo}  alt="" width={40} height={40} style={{objectFit: "contain"}}/>
                <text>{item.title}</text>
                <text>{item.description}</text>
                </div>
            )
        })}
        </div>
      </div>
    </div>
  );
}