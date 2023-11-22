import React, {useEffect, useState} from "react";
import './LeftSide.css';
import imgLarge from './JSIFY.PNG';
import imgSmall from './JSFIY_RESPO.PNG';
import { SvgIcon } from '@mui/material';
import { FaSearch,FaItunesNote,FaHome  } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import MidSide from "../midSide/MidSide";

function LeftSide  ({setStatus} ){
    const navigate = useNavigate();

    function HomeIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }
    const app = async (event)=>{

        navigate('/app');

    }
    const playlist = async (event)=>{
        navigate('/app/playlist');

    }


    const handleSearchClick = async (event)=>{
        setStatus((prevStatus) => !prevStatus);

    }
    const [imgSource, setImgSource] = useState(imgLarge);
    useEffect(() => {
        const handleResize = () => {
            setImgSource(window.innerWidth <= 760 ? imgSmall : imgLarge);
        };

        // Dodaj listener na zmianę rozmiaru ekranu
        window.addEventListener('resize', handleResize);

        // Wywołaj handleResize, aby ustawić obraz przy załadowaniu strony
        handleResize();

        // Usuń listener przy odmontowaniu komponentu
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <div className="x">
            <div className="y">
                <img src={imgSource} alt="xd" className="logo" />
            </div>

            <div className="z">
                <nav className="navX">
                    <ul className="ulX">
                        <li className="liX" onClick={app}><FaHome /> <p className="left-text">Home</p></li>
                        <li className="liX" onClick={handleSearchClick}>
                            <FaSearch /> <p className="left-text">Search </p>
                        </li>
                        <li className="liX" onClick={playlist}><FaItunesNote /> <p className="left-text">Your Library </p></li>
                    </ul>
                </nav>
            </div>





        </div>
    )
}


export default LeftSide