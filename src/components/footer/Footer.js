import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import logo from "../../assets/image/navbar/logo.png"
import styles from './footerStyles'

function Footer(props) {
    return(
        <>
        <div className="desktop">
            <footer className="footerCover">
                <div className="columnCoverOne">
                    <img src={logo} alt="sd" style={{height: "60px"}}/>
                    <br/>
                    <p style={{paddingRight: '30px'}}>
                    Join us on a venture exploring the secrets of the universe, while preserving the sanctity of historical items from ancient antiquity to the furthest edge of the universe.  
                    </p>
                    <div style={styles.socialIcons}>
                        <FaIcons.FaFacebookF/>
                        <FaIcons.FaTwitter/>
                        <FaIcons.FaGoogle/>
                    </div>
                </div>
                <div className="columnCoverTwo">
                    <div style={styles.title}>My Account</div>
                    <div style={styles.links}>
                        <a href="">Authors</a>
                        <a href="">Collections</a>
                        <a href="">Author Profile</a>
                        <a href="">Create A NFT</a>
                    </div>
                </div>
                <div className="columnCoverTwo">
                    <div style={styles.title}>Resources</div>
                    <div style={styles.links}>
                        <a href="">Help & Support</a>
                        <a href="">Live Auctions</a>
                        <a href="">Item Details</a>
                        <a href="">Activity</a>
                    </div>
                </div>
                <div className="columnCoverTwo">
                    <div style={styles.title}>Company</div>
                    <div style={styles.links}>
                        <a href="/aboutus">About Us</a>
                        <a href="">Contact Us</a>
                    </div>
                </div>
                <div className="columnCoverThree">
                    <div style={styles.title}>Subscribe To Our Newsletter</div>
                </div>
            </footer>
        </div>
        <div className="mobile">
        {
            props.clicked ?
            <></>
            :
            <footer style={styles.footerCover}>
                <div style={styles.mobileColumnCover}>
                    <img src={logo} alt="sd" style={{height: "60px"}}/>
                    <br/>
                    <p style={{paddingRight: '30px'}}>
                    Join us on a venture exploring the secrets of the universe, while preserving the sanctity of historical items from ancient antiquity to the furthest edge of the universe.  
                    </p>
                    <div style={styles.socialIcons}>
                        <FaIcons.FaFacebookF/>
                        <FaIcons.FaTwitter/>
                        <FaIcons.FaGoogle/>
                    </div>
                </div>
            </footer>
        }
        </div>
        </>
    )
}

export default Footer