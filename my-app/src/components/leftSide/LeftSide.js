import React from "react";
import './LeftSide.css';
import img from './JSIFY.PNG';
import { AccessAlarm, ThreeDRotation  } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SvgIcon } from '@mui/material';

import { FaSearch,FaItunesNote,FaHome  } from 'react-icons/fa';
import rogal from '../../musicElement/mp3/rogal.mp3';
import uzi from '../../musicElement/png/img.png';
import AudioPlayer from '../adioplayer/AudioPlayer';
import ReactAudioPlayer from 'react-audio-player';
import {useNavigate} from "react-router-dom";
function LeftSide  (props){
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
    return(
        <div className="x">
            <div className="y">
           <img src={img} alt="xd" className="logo" />
        </div>

            <div className="z">
            <nav className="navX">
                <ul className="ulX">
                    <li className="liX" onClick={app}> <FaHome />  Home</li>
                    <li className="liX">   <FaSearch /> Search</li>
                    <li className="liX" onClick={playlist}><FaItunesNote /> Your Library</li>
                </ul>
            </nav>
        </div>





        </div>
    )
}


export default LeftSide