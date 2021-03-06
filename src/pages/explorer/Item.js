import { useEffect, useState, useContext, useRef } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/image/noImgAlt.png'
import bscLogo from "../../assets/image/explorerPage/bscLogo.svg"
import ethLogo from "../../assets/image/explorerPage/ethLogo.png"
import polyLogo from "../../assets/image/explorerPage/polyLogo.png"
import solLogo from "../../assets/image/explorerPage/solLogo.png"
import bidFlame from "../../assets/image/landingPage/bidFlame.png"
import getImageData from '../../actions/getImageData'


import {WalletContext} from '../../context/walletContext'

function Item(props) {
    const walContext = useContext(WalletContext)
    const styles = {
        cover: {
            // flexBasis: "20%",
            width: '346px',
            padding: "20px 21px 30px 21px",
            display: "flex",
            flexDirection: "column",
        },
        img: {
            width: "100%",
            background: "#7A798A",
            borderRadius: "18px"
        },
        auctionCover: {
            position: 'relative',
            top: '-49px'
        },
        auctionTime: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '24px',
            textTransform: 'uppercase',

            display: "inline-flex",
            alignItems: "center",
            background: "#14141F",
            padding: "7px 14px 7px 10px",
            borderRadius: "10px",
        },
        colCover: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            marginBottom: '24px'
        },
        nftTitle: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '26px',
            textTransform: 'capitalize'
        },
        chainLogo: {
            width: "56px",
            height: '54px',
            objectFit: 'cover'
        },
        ownerCover: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: '20px'
        },
        ownerAvatar: {
            width: "47px",
            height: '45px',
            borderRadius: '12px'
        },
        owner: {
            paddingRight: '37px'
        },
        buyCover: {
            display: "flex",
            justifyContent: "space-between"
        },
        heading: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '20px',
            color: '#8A8AA0',
        },
        normal: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '15px',
            lineHeight: '22px',
            color: '#EBEBEB'
        },
        unknownName: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            color: '#403838'
        },
        bidTimeCover: {
            width: "70%",
            display: "flex",
            height:"30px",
            background: "#14141F",
            padding: "5px",
            borderRadius: "10px",
        },
        bidTimeCoverHide: {
            width: "70%",
            visibility: 'hidden',
            height:"30px",
            background: "#14141F",
            padding: "5px",
            borderRadius: "10px",
            position: "relative",
            top: "-40px",
        }
    }

    const Ref = useRef(null);

    const [nftImg, setNftImg] = useState(defaultImg)
    const [fav, setFav] = useState(false)
    const [favNftIds, setFavNftIds] = useState([])
    const [followers, setFollowers] = useState(props.nft.followerCnt)
    const [chainLogo, setChainLogo] = useState(bscLogo)
    const [chainName, setChainName] = useState('BNB')
    const [price, setPrice] = useState(0)

    const [ownerName, setOwnerName] = useState(null)
    const [ownerAvatar, setOwnerAvatar] = useState(defaultImg)
    const [timer, setTimer] = useState('00:00:00');
    const [started,setStarted] = useState(0)

    const updateFavNft = (updatedFavIds) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'user/' + walContext.wallet,
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

    const getChainDetail = () => {
        switch (props.nft.chainId) {
            case 0: setChainLogo(bscLogo); setChainName('BNB'); break;
            case 1: setChainLogo(ethLogo); setChainName('ETH'); break;
            case 2: setChainLogo(polyLogo); setChainName('POLY'); break;
            case 3: setChainLogo(solLogo); setChainName('SOL'); break;
            default: break;
        }
    }
    const toggleFav = () => {
        if(fav) {
            let idx = favNftIds.indexOf(props.nft.nft_id)
            if (idx > -1)
                favNftIds.splice(idx, 1)
            updateFavNft(favNftIds)
            updateFollowerCnt(followers-1)
            setFollowers(followers-1)
        } else {
            favNftIds.push(props.nft.nft_id)
            updateFavNft(favNftIds)
            updateFollowerCnt(followers+1)
            setFollowers(followers+1)
        }
        setFav(!fav)
    }
    // check if user wallet address is included in nft's favorite user wallet array
    const isFav = () => {
        for(let i = 0 ; i < favNftIds.length ; i++) {
            if(props.nft.nft_id == favNftIds[i]) {
                setFav(true)
                return
            }
        }        
        setFav(false)
    }
    const getOwnerData = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + props.nft.ownerAddr)
            .then( res => res.json())
            .then( data => {
                setFavNftIds(data[0].favIds)
                setOwnerName(data[0].name)
                let avatarTemp = getImageData(data[0].avatar.data.data)
                setOwnerAvatar(avatarTemp)
            })
    }

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ' : ' +
                (minutes > 9 ? minutes : '0' + minutes) + ' : '
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        if (Ref.current) 
            clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let startIn = new Date(props.nft.auctionStartIn)
        let endIn = new Date(props.nft.auctionEndIn)
        
        let deadline;

        if(startIn > new Date()) {
            deadline = startIn;
            setStarted(0) // auction is not yet started
        }
        else if (startIn < new Date() && endIn > new Date()){
            deadline = endIn;
            setStarted(1) // auction is in progress
        } else {
            deadline = endIn;
            setStarted(2) // auction is already ended
        }
  
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }
    
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    useEffect(() => {
        if( props.nft.img !== null) {
            let temp = getImageData(props.nft.img.data.data)
            setNftImg(temp)
        }
        
        getOwnerData()
        getChainDetail()
        setPrice(props.nft.price)
    }, [])

    useEffect(() => {
        isFav()
    }, [favNftIds])

    return(
        <div style={styles.cover}>
            <img src={nftImg} style={styles.img}/>
            <div style={props.nft.saleMethod == 1 ? styles.auctionCover : {}}>
                {
                    props.nft.saleMethod == 1 ?
                    <div style={styles.auctionTime}>
                        <span>{timer}</span>
                        <span style={{margin: '0 5px'}}>LEFT</span>
                        <img src={bidFlame} style={styles.flameLogo} alt=""/>
                    </div>
                    :
                    ""
                }
                <div style={styles.colCover}>
                    <span style={styles.nftTitle}>{props.nft.title}</span>
                    <img src={chainLogo} style={styles.chainLogo}></img>
                </div>
                <div style={styles.ownerCover}>
                    <img src={ownerAvatar} style={styles.ownerAvatar}></img>
                    <div style={styles.owner}>
                        <p style={styles.heading}>Owned By</p>
                        {
                            ownerName !== null ?
                            <p style={styles.normal}>{ownerName}</p>
                            :
                            <p style={styles.unknownName}>Unknown</p>
                        }
                    </div>
                    <div style={styles.bidPrice}>
                        {
                            props.nft.saleMethod == 0 ?
                            <p style={styles.heading}>Price:</p>
                            :
                            <p style={styles.heading}>Highest Bid:</p>
                        }
                        <p style={styles.normal}>{price} {chainName}</p>
                    </div>
                </div>
                <div style={styles.buyCover}>
                    {
                        props.nft.saleMethod == 0 ?
                        <button className="smNormal"><Link to={'/assets/' + props.nft.nft_id}>Buy Now</Link></button>
                        :
                        <button className="smNormal"><Link to={'/assets/' + props.nft.nft_id}>Place Bid</Link></button>
                    }
                    <button className="favBtn" onClick={toggleFav}>
                        {
                            fav ?
                                <FaIcons.FaHeart/>
                            :
                                <FaIcons.FaRegHeart/> 
                        }
                        {followers}
                    </button>
                </div>
            </div>
            {/* {
                props.nft.saleMethod == 0 ?
                <div style={styles.bidTimeCoverHide}>
                    <span>{timer} LEFT</span>
                    <img src={bidFlame} style={styles.flameLogo} alt=""/>
                </div>
                :
                <div style={styles.bidTimeCover}>
                    <span>{timer} LEFT</span>
                    <img src={bidFlame} style={styles.flameLogo} alt=""/>
                </div>
            }
            <div style={styles.colCover}>
                <span>{props.nft.title}</span>
                <img src={chainLogo} style={styles.chainLogo}></img>
            </div>
            <div style={styles.ownerCover}>
                <img src={ownerAvatar} style={styles.ownerAvatar}></img>
                <div style={styles.owner}>
                    <p style={styles.heading}>Owned By</p>
                    {
                        ownerName !== null ?
                        <p style={styles.normal}>{ownerName}</p>
                        :
                        <p style={styles.unknownName}>Unknown</p>
                    }
                </div>
                <div style={styles.bidPrice}>
                    {
                        props.nft.saleMethod == 0 ?
                        <p style={styles.heading}>Price:</p>
                        :
                        <p style={styles.heading}>Highest Bid:</p>
                    }
                    <p style={styles.normal}>{price} {chainName}</p>
                </div>
            </div>
            <div style={styles.buyCover}>
                {
                    props.nft.saleMethod == 0 ?
                    <button className="smNormal"><Link to={'/assets/' + props.nft.nft_id}>Buy Now</Link></button>
                    :
                    <button className="smNormal"><Link to={'/assets/' + props.nft.nft_id}>Place Bid</Link></button>
                }
                <button className="favBtn" onClick={toggleFav}>
                    {
                        fav ?
                            <FaIcons.FaHeart/>
                        :
                            <FaIcons.FaRegHeart/> 
                    }
                    {followers}
                </button>
            </div> */}
        </div>
    )
}

export default Item