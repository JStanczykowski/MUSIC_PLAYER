import React, { useEffect, useState } from 'react';
import './PlayList.css';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';
import { Provider } from 'react-redux';
import AudioPlayer from '../adioplayer/AudioPlayer';
import jwt_decode from 'jwt-decode';
import api from '../../api/axiosConfig';
import AddPlayList from "../addPlayList/AddPlayList";
import  nuta from "../../musicElement/png/333.png"
import {FaHeart, FaPlayCircle,FaTrashAlt} from "react-icons/fa";
import {Alert, AlertTitle} from "@mui/material";
import ProfileComponent from "../profilecomponent/ProfileComponent";
function PlayList(props) {
    const navigate = useNavigate();
    const [playlistApi, setPlayList] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const [isDeleted, setIsDeleted] = useState(false);
    const [isCreate, setCreate] = useState(true);
    const getPlaylist = async () => {
        try {
            const response = await api.get(`/api/v1/playlist/names/${username}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            setPlayList(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getPlaylist();
    }, []);

    const showMore = async (id, nazwa) => {
        navigate(`/app/playlist/${id}`, { state: { nazwa: nazwa } });
    }

    const create = async () => {
        setCreate(false);
    }

    const deletePlayList = async (idPlayList) => {
        const idPar = idPlayList;
        try {
            const response = await api.delete(`/api/v1/playlist/${idPar}/deletePlayList`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (response.status === 200) {
                console.log("success DELETE ");
                const playlist = response.data;
                console.log(playlist);
                setIsDeleted(true);
                setPlayList(playlistApi.filter(item => item.id !== idPlayList));
            } else {
                console.log('Error delete playlist');
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404) {
                setIsDeleted(true);
            }
        }
    };

    useEffect(() => {
        let timeout;
        if (isDeleted) {
            timeout = setTimeout(() => {
                setIsDeleted(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isDeleted]);

    return(

        <div className="fullContainer"><ProfileComponent name={username}/>
                <div className="xd">
                    <div className="card-body">
                        {isCreate ? (
                            <button type="button" className="btn btn-primary" onClick={create}>
                                Create new PlayList
                            </button>
                        ) : (
                            <AddPlayList setCreate={setCreate} />
                        )}
                    </div>
                    {isDeleted &&(    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Success delete PlayList <strong>check it out!</strong>
                    </Alert>)}

                    <div className="card-container">
                        {playlistApi.map((plalist) => (
                            <div className="card" >
                                <img class="card-img-top" src={nuta} />
                                <span className="play-btn">
                                <FaPlayCircle className="play-button" />
                                <FaTrashAlt
                                    className="button-del"
                                    onClick={() => deletePlayList(plalist.id)}
                                />
                            </span>
                                <div className="card-body" onClick={() => showMore(plalist.id, plalist.name)}>
                                    <h5 class="card-title" key={plalist}>
                                        {plalist.name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="player">

                </div>

            </div>

);
}

export default PlayList;
