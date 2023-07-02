import {Component, useEffect, useRef, useState} from "react";
import "./MidSide.css";
import * as ReactDOM from 'react-dom';
import api from "../../api/axiosConfig";
import AudioPlayer from "../adioplayer/AudioPlayer";
import React from 'react';
import {FaHeart, FaPlayCircle,FaPlusCircle} from "react-icons/fa";
import img from "../leftSide/JSIFY.PNG";
import { useLocation } from 'react-router-dom'
import TestFile from "../testfile/TestFile";
import LeftSide from "../leftSide/LeftSide";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { connect } from 'react-redux';
import store, {playTrack} from "../store/store";
import { Provider } from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import ProfileComponent from "../profilecomponent/ProfileComponent";
import jwt_decode from "jwt-decode";
function MidSide() {

    const [playlistApi, setPlayList] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [music, setMusic] = useState([]);
    const [mus, setMus] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
    const [showDiv, setShowDiv] = useState(true);
    const [newAudio, setNewAudio] = useState({
        audioSrc: "",
        songTitle: "",
        artistName: "",
    });
    const [showLogoMusic, setShowLogoMusic] = useState(false);
    const [newTest, setNewTest] = useState({
        img: "",
        title: "",
        artist: "",
        number: "",
    });

    const getMusic = async () => {
        try {
            const response = await api.get("/api/v1/music",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            console.log(response.data)
                setMusic(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getMusic();
    }, []);


    function handleClickTwo(id) {

        dispatch({type: "SET_PLAYLIST",payload: id});
        console.log(store.getState().playlist);
    }
    const table = useSelector((state)=>state.playlist);
    const index = useSelector((state)=>state.index);

    function handleClick(id) {
        try {
            dispatch({
                type: 'CURRENT_PLAYLIST',
                payload: {
                    index: index,
                    element: id
                }
            });
            console.log(table);
            console.log(index);
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            const image = require(`../../musicElement/png/${table[index].plik}.png`);
            dispatch(playTrack(table[index].tytul, table[index].artysta, table[index].plik, image));
        }
        catch (err) {
            console.log(err);
        }
        }, [table]);

    function srcImg(photo) {
        const LogoSrc = require(`../../musicElement/png/${photo}.png`);
        return LogoSrc;
    }

    function toggleDiv(photo, title, artist,objectId ,number) {
        const LogoSrc = require(`../../musicElement/png/${photo}.png`);
        setNewTest({
            img: LogoSrc,
            title: title,
            artist: artist,
            number: number,
        })
        let X=  title;
        let X1 = number;
        let X2=artist;
        let X3=objectId;


      navigate('/app/reviews',{state:{title: {X}, artist:{X2}, img:{LogoSrc}, number: {X1},objectId:{X3}}})

    }
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const getPlaylist = async () => {
        try {
            const response = await api.get(`/api/v1/playlist/names/${username}`,{
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
    const requestBody  ={
        idPlayList:'',
        idMusic:''
    }
    const addToPlayList = async (idPlayList,idMusic)=>{
        console.log(idPlayList);
        console.log(idMusic);
        requestBody.idPlayList=idPlayList;
        requestBody.idMusic=idMusic;
        console.log(requestBody);
        console.log("xd " +localStorage.getItem('accessToken'));
        try {
            const response = await api.post(`/api/v1/playlist/${requestBody.idPlayList}/addMusic`, [ idPlayList, idMusic ], {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (response.status === 200) {
                console.log("success POST ")
                const playlist = response.data;
                console.log(playlist); // access the returned PlayList instance
            } else {
                console.log('Error create playlist');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="fullContainer">
            <div id="testfile-container"></div>

                <div className="xd">
                    <ProfileComponent name={username}/>
                    <div className="card-body"   >


                        <table className="table mb-0">
                            <thead>
                            <tr>
                                <th scope="col">Image logo</th>
                                <th scope="col">Title</th>
                                <th scope="col">Play</th>
                                <th scope="col">Fav</th>
                                <th scope="col">Add to PlayList</th>
                            </tr>
                            </thead>
                            <tbody>
                            {music.map((song) => {
                                return (
                                    <tr key={song.id} className="fw-normal">
                                        <th>
                                            <img src={srcImg(song.plik)} alt="x"
                                                 className="shadow-1-strong rounded-circle"/>
                                            <span className="ms-2">{song.artysta}</span>
                                        </th>
                                        <td className="align-middle"
                                            onClick={() => toggleDiv(song.plik, song.tytul, song.artysta, song.objectId,song.number)}>
                                            <span className="tytulMid">{song.tytul}</span>
                                        </td>
                                        <td className="align-middle">
                                            <FaPlayCircle onClick={() => {
                                                handleClick(song)
                                            }} className="button"/>
                                        </td>
                                        <td className="align-middle">
                                            <FaHeart onClick={() => {
                                                handleClickTwo(song)
                                            }} className="button"/>
                                        </td>
                                        {/*<FaPlusCircle className="button" />*/}
                                        <td className="align-middle">
                                            <NavDropdown   id="nav-dropdown-dark-example"
                                                           menuVariant="dark" title={<FaPlusCircle className="button" />}>
                                                {playlistApi.map((playlist)=>(
                                                    <NavDropdown.Item  key={playlist.id}
                                                                   onClick={() => addToPlayList(playlist.id, song.objectId)}
                                                    >{playlist.name}</NavDropdown.Item>
                                                ))}
                                            </NavDropdown>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>

            <div className="player" >
                {/*{showAudioPlayer && (*/}
                {/*<AudioPlayer*/}
                {/*    // audioS={newAudio.audioS}*/}
                {/*    // trackName={newAudio.songTitle}*/}
                {/*    // artistName={newAudio.artistName}*/}
                {/*    // image={showLogoMusic.LogoSrc}*/}
                {/*/>*/}
            {/*)}*/}
            </div>
        </div>
    );
}
    export default MidSide;
