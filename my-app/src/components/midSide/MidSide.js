import {Component, useEffect, useRef, useState} from "react";
import "./MidSide.css";
import * as ReactDOM from 'react-dom';
import api from "../../api/axiosConfig";
import AudioPlayer from "../audioplayer/AudioPlayer";
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
import ReactPaginate from 'react-paginate';
import Pagination from "../pagination/Pagination";
import { useParams } from 'react-router-dom';

function MidSide({status}) {
    const { searchState } = useParams();
    const [playlistApi, setPlayList] = useState([]);

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


    const getMusic = async () => {
        console.log('Wartość searchState:', searchState);
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


        const itemsPerPage = 5; // Ilosć elementów na stronie
        const [currentPage, setCurrentPage] = useState(0);

        const pageCount = Math.ceil(music.length / itemsPerPage);
        const offset = currentPage * itemsPerPage;

        // const currentItems = music.slice(offset, offset + itemsPerPage);

        const handlePageClick = ({ selected }) => {
            setCurrentPage(selected);
        };
    return (

        <div className="fullContainer">
            <div id="testfile-container"></div>
            <Pagination music={music} setMusic={setMusic} username={username} playlistApi={playlistApi} searchState={status} />
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
