import React, {useEffect, useState} from 'react';
import "./AdminPanel.css";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import alt from "../leftSide/alt_music.png";
import {FaHome, FaItunesNote, FaSearch} from "react-icons/fa";
import {IoMan} from "react-icons/io5";
import imgLarge from "../leftSide/JSIFY.PNG";
import imgSmall from "../leftSide/JSFIY_RESPO.PNG";
import { BiMessageDetail } from "react-icons/bi";
import { TbMusicPlus } from "react-icons/tb";
import { LuMusic4 } from "react-icons/lu";
import { LuUserCog } from "react-icons/lu";

const AdminPanel =()=>{
    const navigate = useNavigate();
    const uzytkownicy = async (event)=>{

        navigate("/admin/users");
    }
    const music = async (event)=>{

        navigate("/admin/music");
    }
    const addmusic = async (event)=>{

        navigate("/admin/add");
    }
    const message = async (event)=>{

        navigate("/admin/message");
    }
    const back =async()=>{
        localStorage.removeItem('accessToken');
        navigate('/login');
        window.location.reload();
    }
    useEffect(() => {
        const handleResize = () => {
            setImgSource(window.innerWidth <= 760 ? imgSmall : imgLarge);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [imgSource, setImgSource] = useState(imgLarge);
    return(
        <div className="x">
            <div className="y">
                <img src={imgSource} alt={alt} className="logo" />
            </div>

            <div className="z">
                <nav className="navX">
                    <ul className="ulX">
                        <li className="liX" onClick={uzytkownicy}><LuUserCog /> <p className="left-text">Users</p></li>
                        <li className="liX" onClick={music}>
                            <LuMusic4 /> <p className="left-text">Music List</p>
                        </li>
                        <li className="liX" onClick={addmusic}><TbMusicPlus /> <p className="left-text">Add Music </p></li>
                        <li className="liX" onClick={message}>
                            <BiMessageDetail /> <p className="left-text">Message </p>
                        </li>
                    </ul>
                </nav>
            </div>





        </div>
    )
}

export default AdminPanel;