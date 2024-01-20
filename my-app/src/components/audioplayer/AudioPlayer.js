import React, { useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { FaArrowRotateLeft,FaArrowRotateRight,FaVolumeXmark   } from "react-icons/fa6";
import './AudioPlayer.css';
import alt from "../leftSide/alt_music.png";
import store, {
    playTrack,
    pauseTrack,
    stopTrack,
    setAudioElement,
    setDuration,
    setCurrentTime,
    setAudioPlayerRef, setPlayList, setIndex
} from '../store/store';



const AudioPlayer = (props) => {
    const dispatch = useDispatch();


    const [audioObj, setAudioObj] = useState(null);
    const { audio: audioState } = useSelector((state) => state);

    const isPlaying = store.getState().isPlaying;
    console.log(isPlaying);
    const audioPlayerRef = useRef(null);
    const currentTimeEl = document.getElementById("currentTime");
    const progressBarEl = document.getElementById("progressBar");
    const durationTimeEl= document.getElementById("durationTime");
    const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState(0);
    useEffect(() => {
        if (store.getState().audioS) {
            // Check if there's an existing audio object
            if (store.getState().audioElement) {
                // Stop the existing audio
                store.getState().audioElement.pause();
                store.getState().audioElement.currentTime = 0;
            }
            const audioUrl = `https://www.googleapis.com/drive/v3/files/${store.getState().audioS}?alt=media&key=AIzaSyCwAwTjI4pVK7FbxdAiH-xUWPzDGXDcnc4&v=.mp3`;
            const audio = new Audio(audioUrl);
            console.log("audio: "+audioUrl);
            console.log("audioS: "+store.getState().audioS);
            dispatch(setAudioElement(audio));

            store.getState().audioElement.addEventListener('loadedmetadata', () => {
                dispatch(setDuration(audio.duration));
                setAudioObj(audio);
            });


            store.getState().audioElement.addEventListener('timeupdate', () => {
                store.dispatch(setCurrentTime(store.getState().audioElement.duration));
                store.dispatch(setDuration(store.getState().audioElement.currentTime));
                const durationCzas = formatTime(store.getState().audioElement.duration);
                const progressBarWidth = `${store.getState().audioElement.currentTime / store.getState().audioElement.duration * 100}%`;
                progressBarEl.style.width = progressBarWidth;
                durationTimeEl.innerText=durationCzas;

                setInterval(() => {
                const currentCzas=formatTime(store.getState().audioElement.currentTime);
                currentTimeEl.innerText=currentCzas;
                if(currentCzas==durationCzas){

                    playNext();
                }},1000);
            });
            audio.play();
        }
    }, [store.getState().audioS,dispatch]);
    const playlistList=useSelector((state)=>state.playlist);
    const durationTime = useSelector((state)=>state.duration);
    const currentTime = useSelector((state)=>state.currentTime);

    const currentIndex = useSelector((state)=>state.index);
    console.log(currentIndex);
    const playNext=()=>{
        try{
        if (index+1 < table.length) {
            dispatch(setIndex(currentIndex+1));

            const image = `https://drive.google.com/uc?id=${table[index+1].zdjecie}`;

            dispatch(playTrack(table[index+1].tytul, table[index+1].artysta, table[index+1].plik, image));
        } else {
            dispatch(setIndex(0));

            const image = `https://drive.google.com/uc?id=${table[0].zdjecie}`;
            dispatch(playTrack(table[0].tytul, table[0].artysta, table[0].plik, image));
        }
            }
            catch (err){
                console.log(err);
            }
    }
    const playPrev=()=>{
        try{
            if (index-1 >= 0) {
                dispatch(setIndex(currentIndex-1));
                // const image = require(`../../musicElement/png/${table[index-1].plik}.png`);
                const image = `https://drive.google.com/uc?id=${table[index-1].zdjecie}`;
                dispatch(playTrack(table[index-1].tytul, table[index-1].artysta, table[index-1].plik, image));
            } else {
                dispatch(setIndex(table.length-1));

                const image = `https://drive.google.com/uc?id=${table[table.length-1].zdjecie}`;
                dispatch(playTrack(table[table.length-1].tytul, table[table.length-1].artysta, table[table.length-1].plik, image));
            }
        }
        catch (err){
            console.log(err);
        }
    }
    const table = useSelector((state)=>state.playlist);
    const index = useSelector((state)=>state.index);

    const handlePlay = () => {
        dispatch(pauseTrack());
        if (store.getState().audioElement) {
            store.getState().audioElement.pause();
            store.getState().audioElement.currentTime = 0;
        }
        localStorage.setItem('isPlaying', 'false');
        const image = `https://drive.google.com/uc?id=${table[index].zdjecie}`;
        console.log("image"+image);
        dispatch(playTrack(table[index].tytul, table[index].artysta, table[index].plik, image));
        dispatch(setAudioPlayerRef(audioPlayerRef));
        const audioObj = store.getState().audioElement;

        if (audioObj) {
            // Set the playback position before playing
            audioObj.currentTime = currentPlaybackPosition;
            audioObj.play();
        }
        localStorage.setItem('isPlaying', 'true');
    };

    const handlePause = () => {
        dispatch(pauseTrack());
        const audioObj = store.getState().audioElement;
        if (audioObj) {
            setCurrentPlaybackPosition(audioObj.currentTime);
            audioObj.pause();
        }
        localStorage.setItem('isPlaying', 'false');
    };

    const handleStop = () => {
        dispatch(stopTrack());
        const audioObj = store.getState().audioElement;
        if (audioObj) {
            setCurrentPlaybackPosition(audioObj.currentTime);
            audioObj.pause();
            audioObj.currentTime = 0;
        }
        localStorage.setItem('isPlaying', 'false');
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        const updateCurrentTime = () => {

            dispatch({
                type: 'SET_CURRENT_TIME',
                payload: store.getState().audioElement.currentTime,
            });
        };

        if (store.getState().audioElement) {
            store.getState().audioElement.addEventListener('timeupdate', updateCurrentTime);
        }

        return () => {
            if (store.getState().audioElement) {
                store.getState().audioElement.removeEventListener('timeupdate', updateCurrentTime);
            }
        };
    }, [dispatch]);
    const [volume2, setVolume2] = useState(1);
    const setVolume = (volume) => {
        const audioObj = store.getState().audioElement;
        if (audioObj) {
            setVolume2(volume);
            audioObj.volume = volume/2;
        }
    }
    const skipBackward = () => {
        const audioObj = store.getState().audioElement;
        if (audioObj) {
            audioObj.currentTime -= 10; // Przewiń w tył o 10 sekund
        }
    };

    const skipForward = () => {
        const audioObj = store.getState().audioElement;
        if (audioObj) {
            audioObj.currentTime += 10; // Przewiń do przodu o 10 sekund
        }
    };
    //
    // const progressBarWidth = `${store.getState().currentTime / store.getState().duration* 100}%`;
    return (
        <div className="audio-player">
            <div className="song-info">
                <h4 className="song-title">{store.getState().artistName}</h4>
                <p className="artist-name">{store.getState().trackName}</p>
            </div>
            <div className="bar">
                <div className="controls">
                    <div className="arrow-button"   onClick={skipBackward}>
                        <FaArrowRotateLeft />
                    </div>
                    <div className="next-button"
                         onClick={playPrev}>
                        <FaStepBackward />
                    </div>
                    <div className="play-button" onClick={isPlaying ? handlePause : handlePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </div>
                    <div className="next-button"  onClick={playNext}>
                        <FaStepForward />
                    </div>
                    <div className="arrow-button"  onClick={skipForward}>
                        <FaArrowRotateRight />
                    </div>
                </div>
                <div className="progress-bar">

                    <div
                        className="progress-bar-fill"
                        id="progressBar"

                    />
                </div>
                <span className="current-time" id="currentTime">1</span>
                <span className="duration" id="durationTime">1</span>
            </div>
            {audioObj && (
                <div>
                <ReactAudioPlayer
                    ref={audioPlayerRef}
                    src={store.getState().audioElement}
                    onEnded={handleStop}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onTimeUpdate={() =>
                        dispatch({
                            type: 'SET_CURRENT_TIME',
                            payload: store.getState().audioElement.currentTime,
                        })
                    }
                    onLoadedMetadata={() =>
                        dispatch({
                            type: 'SET_DURATION',
                            payload: store.getState().audioElement.duration,
                        })
                    }
                />
                 <div className="volume-container"> <div className="next-button"   onClick={() => setVolume(0)}> <FaVolumeXmark/></div>
                <input
                className="volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="1"
                value={volume2}
                onChange={(e) => setVolume(e.target.value)}
                /></div></div>
            )}
            <div className="muza">
                {store.getState().image ?(<img src={store.getState().image} alt="logo"  className="logomuza" />):
                    (<img src={alt} alt="logo" className="logomuza" />)}

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        audio: state.audio
    }
}

export default connect(mapStateToProps)(AudioPlayer);