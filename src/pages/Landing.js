import logo from "../assets/logo.png";
import tel from "../assets/telephone.png"
import line from "../assets/line.png"
import email from "../assets/email.png"
import { StyleSheet } from "react-native-web";

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
      <div style={styles.navbar}>
        <div>Peek-A-Plot</div>
        <div style={styles.navbarRight}>
          <text>Contact us</text>
          <text>User guide</text>
          <text>Sign-in</text>
          <button>Get started</button>
        </div>
      </div>
      <div style={styles.header}>
        <div>
          <div style={styles.text}>
            <text style={styles.headerTxt}>Welcome my boo...</text>
            <text style={styles.headerTxt}>It's great to meet you</text>
          </div>
          <button>Start Writing</button>
        </div>
        <img src={logo} width={100} height={300} style={{objectFit: "contain"}}/>
      </div>
      <div style={styles.description}>
        <text style={styles.descriptionTitle}>Peek-A-Plot คืออะไร</text>
        <text>       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum, metus at consectetur elementum, leo neque cursus metus, vitae mollis enim leo accumsan elit. Pellentesque a urna vel odio pellentesque bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut fermentum malesuada justo in fringilla.</text>
      </div>
      <div style={styles.howto}>
        <text>วิธีการใช้งาน</text>
        <text>1. เมื่อลงทะเบียนเข้าสู่ระบบเรียบร้อยแล้วให้ทำการคลิ๊กไปที่ปุ่มพล็อต</text>
        <img src={logo} width={300} height={300} style={{objectFit: "contain"}}/>
      </div>
      <div style={styles.contact}>
        <text style={{marginBottom: 10}}>ติดต่อเรา</text>
        <text style={{marginBottom: 30}}>ติดต่อสอบถามข้อมูลต่างๆได้ตามช่องทางดังนี้</text>
        <div style={styles.dataContainer}>
        {contact.map((item, index) => {
            return (
                <div style={styles.data}>
                <img src={item.logo} width={40} height={40} style={{objectFit: "contain"}}/>
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

const styles = StyleSheet.create({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    navbarRight: {
        width: 400,
        display: 'flex',
        justifyItem: 'space-between',
        justifyContent: 'space-between'
        // backgroundColor: 'gray',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 150,
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 40,
    },
    headerTxt: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
        marginLeft: 70,
        marginRight: 70,
    },
    contact: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    descriptionTitle: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    howto: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dataContainer: {
        width: 600,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    data: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})