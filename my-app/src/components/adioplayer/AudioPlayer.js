import React, { useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import './AudioPlayer.css';
import store, {
    playTrack,
    pauseTrack,
    stopTrack,
    setAudioElement,
    setDuration,
    setCurrentTime,
    setAudioPlayerRef, setPlayList
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
    useEffect(() => {
        if (store.getState().audioS) {
            const audio = new Audio(require(`../../musicElement/mp3/${store.getState().audioS}.mp3`));
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
                currentTimeEl.innerText=currentCzas;},1000);
            });
        }
    }, [store.getState().audioS,dispatch]);
    const playlistList=useSelector((state)=>state.playlist)
    const playNext=()=>{
        if (audioObj) {
            audioObj.pause();
        }
        const track = store.getState().playlist;
        console.log(track[1].tytul,track[1].artysta);

    }
    const handlePlay = () => {
        dispatch(playTrack(store.getState().trackName, store.getState().artistName,store.getState().audioS, store.getState().image));
        dispatch(setAudioPlayerRef(audioPlayerRef));
        const audioObj = store.getState().audioElement;
        console.log(store.getState().audioElement.currentTime)
        if (audioObj) {
            audioObj.play();
        }
        localStorage.setItem('isPlaying', 'true');
    };

    const handlePause = () => {
        dispatch(pauseTrack());
        const audioObj = store.getState().audioElement;
        if (audioObj) {
            audioObj.pause();
        }
        localStorage.setItem('isPlaying', 'false');
    };

    const handleStop = () => {
        dispatch(stopTrack());
        const audioObj = store.getState().audioElement;
        if (audioObj) {
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
                    <div className="next-button">
                        <FaStepBackward />
                    </div>
                    <div className="play-button" onClick={isPlaying ? handlePause : handlePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </div>
                    <div className="next-button"  onClick={playNext}>
                        <FaStepForward />
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
            )}
            <div className="muza">
                <img src={store.getState().image} alt="xd" className="logomuza" />
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