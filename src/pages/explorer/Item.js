import { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import img from "../../assets/image/navbar/logo.png"

function Item(props) {
    const styles = {
        cover: {
            flexBasis: "20%",
            padding: "20px"
        },
        img: {
            width: "100%",
            background: "#7A798A",
            borderRadius: "18px"
        },
        colCover: {
            display: "flex",
            justifyContent: "space-between"
        },
        colLogo: {
            width: "10%"
        },
        ownerCover: {
            display: "flex",
            justifyContent: "space-around"
        },
        ownerAvatar: {
            width: "20%"
        },
        owner: {

        },
        buyCover: {
            display: "flex",
            justifyContent: "space-between"
        }
    }

    const [img, setImg] = useState(null)
    const [fav, setFav] = useState(false)

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    const setImgData = (buffer) => {
        let temp = 'data:image/jpeg;base64,' + arrayBufferToBase64(buffer)
        setImg(temp)
    }
    const updateFavNft = (updatedFavIds) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'user/' + localStorage.getItem('connectedWalletAddress'),
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({favIds: updatedFavIds})
                }
            )
        } catch (e) {
            
        }
    }
    const updateFollowerCnt = (cnt) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'nft/' + props.nft.nft_id,
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({followerCnt: cnt})
                }
            )
        } catch (e) {
            
        }

    }
    const getFavNftIds = () => {
        let favNftIds = localStorage.getItem('userFavNftIds')
        favNftIds = favNftIds.split(',').map(function(item) {
            return parseInt(item, 10);
        });
        return favNftIds
    }
    const toggleFav = () => {
        let favNftIds = getFavNftIds()
        let followerCnt = props.nft.followerCnt
        if(fav) {
            let idx = favNftIds.indexOf(props.nft.nft_id)
            if (idx > -1)
                favNftIds.splice(idx, 1)
            updateFavNft(favNftIds)
            updateFollowerCnt(followerCnt-1)

        } else {
            favNftIds.push(props.nft.nft_id)
            updateFavNft(favNftIds)
            updateFollowerCnt(followerCnt+1)
        }
    }
    // check if user wallet address is included in nft's favorite user wallet array
    const isFav = () => {
        let favNftIds = getFavNftIds()

        for(let i = 0 ; i < favNftIds.length ; i++) {
            if(props.nft.nft_id == favNftIds[i]) {
                setFav(true)
                return
            }
        }        
        setFav(false)
    }
    useEffect(() => {
        setImgData(props.nft.img.data.data)
        isFav()
    }, [])
    return(
        <div style={styles.cover}>
            <img src={img} style={styles.img}/>
            <div style={styles.colCover}>
                <span>{props.nft.title}</span>
                <img src={img} style={styles.colLogo}></img>
            </div>
            <div style={styles.ownerCover}>
                <img src={img} style={styles.ownerAvatar}></img>
                <div style={styles.owner}>
                    <p>Owned By</p>
                    <p>David</p>
                </div>
                <div style={styles.bidPrice}>
                    <p>Current Bid:</p>
                    <p>4.89 BNB</p>
                </div>
            </div>
            <div style={styles.buyCover}>
                <button className="smNormal">Buy Now</button>
                <button className="favBtn" onClick={toggleFav}>
                    {
                        fav ?
                            <FaIcons.FaHeart/>
                        :
                            <FaIcons.FaRegHeart/> 
                    }
                    {props.nft.followerCnt}
                </button>
            </div>
        </div>
    )
}

export default Item