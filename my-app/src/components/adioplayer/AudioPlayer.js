import React, { useEffect, useRef, useState } from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import './AudioPlayer.css';
import store, { playTrack, pauseTrack, stopTrack } from '../store/store';

import imgSrc from "./img.png";

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const audioPl = useRef(null);
    const audioFile = useState('');
    const [audioObj, setAudioObj] = useState(null);
    const { audio: audioState } = useSelector((state) => state);
    const isPlaying = useSelector(state => state.player && state.player.isPlaying);
    const trackName = useSelector(state => state.player && state.player.trackName);
    const artistName = useSelector(state => state.player && state.player.artistName);
    const audioS = useSelector(state => state.player && state.player.audioS);
    const image = useSelector(state => state.player && state.player.image);
    useEffect(() => {
        if (audioS) {
            const audio = new Audio(require(`../../musicElement/mp3/${audioS}.mp3`));
            setAudioObj(audio);

            // Set duration when audio file is loaded
            audio.addEventListener('loadedmetadata', () => {
                dispatch({
                    type: 'SET_DURATION',
                    payload: audio.duration,
                });
            });
        }
    }, [audioS]);

    const currentTime = audioState ? audioState.currentTime : 0;
    const duration = audioObj ? audioObj.duration : 0;

    const handlePlay = () => {
        dispatch(playTrack(trackName, artistName,audioS, image));
        if (audioObj) {
            audioObj.play();
        }
    };

    const handlePause = () => {
        dispatch(pauseTrack(trackName, artistName, audioS, image));
        audioObj.pause();
    };

    const handleStop = () => {
        dispatch(stopTrack());
        audioObj.pause();
        audioObj.currentTime = 0;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        const updateCurrentTime = () => {
            dispatch({
                type: 'SET_CURRENT_TIME',
                payload: audioPl.current.currentTime,
            });
        };

        if (audioPl.current) {
            audioPl.current.addEventListener('timeupdate', updateCurrentTime);
        }

        return () => {
            if (audioPl.current) {
                audioPl.current.removeEventListener('timeupdate', updateCurrentTime);
            }
        };
    }, [audioState]);

    const progressBarWidth = `${(currentTime / duration) * 100}%`;
    return (
        <div className="audio-player">
            <div className="song-info">
                <h4 className="song-title">{artistName}</h4>
                <p className="artist-name">{trackName}</p>
            </div>
            <div className="bar">
                <div className="controls">
                    <div className="prev-button">
                        <FaStepBackward />
                    </div>
                    <div className="play-button" onClick={isPlaying ? handlePause : handlePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </div>
                    <div className="next-button">
                        <FaStepForward />
                    </div>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: progressBarWidth }}
                    />
                </div>
                <span className="current-time">{formatTime(currentTime)}</span>
                <span className="duration">{formatTime(duration)}</span>
            </div>
            {audioObj && (
                <ReactAudioPlayer
                    src={require(`../../musicElement/mp3/${audioS}.mp3`)}

                    onEnded={handleStop}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onTimeUpdate={() =>
                        dispatch({
                            type: 'SET_CURRENT_TIME',
                            payload: audioPl.current.currentTime,
                        })
                    }
                    onLoadedMetadata={() =>
                        dispatch({
                            type: 'SET_DURATION',
                            payload: audioPl.current.duration,
                        })
                    }
                />
            )}
            <div className="muza">
                <img src={image} alt="xd" className="logomuza" />
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