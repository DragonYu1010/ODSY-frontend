import * as FaIcons from "react-icons/fa"
import img from "../../../assets/image/navbar/logo.png"
import bscLogo from "../../../assets/image/landingPage/bscLogo.png"

function Item() {
    const styles = {
        itemImg: {
            width: "100%",
            marginBottom: "10px",
            background: "grey",
            borderRadius: "18px"
        },
        title: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
        },
        logo: {
            width: "16%"
        },
        info: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
        },
        avatar: {
            background: "grey",
            borderRadius: "18px",
            width: "16%"
        },
        buyNow: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px"
        }
    }

    return (
        <div style={styles.itemCover}>
            <div style={styles.itemImg}>
                <img src={img} style={styles.img}/>
            </div>
            <div style={styles.title}>
                <span>"The RenaiXance Rising...</span>
                <img src={bscLogo} style={styles.logo} alt=""/>
            </div>
            <div style={styles.info}>
                <img src="" style={styles.avatar} alt="s"/>
                <div style={styles.owned}>
                    Owned By <br/>
                    David
                </div>
                <div style={styles.bid}>
                    Current Bid <br/>
                    4.89 BNB
                </div>
            </div>
            <div style={styles.buyNow}>
                <button className="normal">Buy Now</button>
                <div style={styles.favCnt}>
                    <FaIcons.FaRegHeart/> 100
                </div>
            </div>
        </div>
    )
}

export default Item