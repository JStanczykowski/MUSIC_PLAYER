import React, { useEffect, useState } from 'react';
import './PlayListSingle.css';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';
import { Provider } from 'react-redux';
import AudioPlayer from '../audioplayer/AudioPlayer';
import jwt_decode from 'jwt-decode';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import img from "../leftSide/JSIFY.PNG";
import {FaHeart, FaPlayCircle} from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import ProfileComponent from "../profilecomponent/ProfileComponent";
function PlayListSingle(props) {
    const navigate = useNavigate();
    const [playlistApi, setPlayList] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const {id} = useParams();
    const getPlaylist = async () => {
        try {
            const response = await api.get(`/api/v1/playlist/${id}/musicIds`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            setPlayList(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getPlaylist();
    }, []);
    function srcImg(photo) {
       
        const LogoSrc = `https://drive.google.com/uc?id=${photo}`;
        return LogoSrc;
    }
    const back = async ()=>{
        navigate(`/app/playlist`);
    }
    const location = useLocation();
    const { nazwa } = location.state;

    return(

        <div className="fullContainer"><ProfileComponent name={username}/>
                <div className="xd">
                    <h1>{nazwa}</h1>
                    <p onClick={back}>Back</p>
                    <div className="card-body"   >
                        <table className="table mb-0">
                            <thead>
                            <tr>
                                <th scope="col">Image logo</th>
                                <th scope="col">Title</th>

                            </tr>
                            </thead>
                            <tbody>
                            {playlistApi.map((song) => {
                                return (
                                    <tr key={song} className="fw-normal">
                                        <th>
                                            <img src={srcImg(song.zdjecie)} alt="x"
                                                 className="shadow-1-strong rounded-circle"/>
                                            <span className="ms-2">{song.artysta}</span>
                                        </th>
                                        <td className="align-middle" >

                                            <span>{song.tytul}</span>
                                        </td>

                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="player">

                    </div>
                </div></div>

    );
}

export default PlayListSingle;
