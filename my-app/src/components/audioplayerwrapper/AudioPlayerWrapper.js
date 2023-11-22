import React, { useState } from 'react';
import AudioPlayer from '../audioplayer/AudioPlayer';
import { AudioPlayerProvider } from '../store/store';
function AudioPlayerWrapper() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleIsPlayingChange = (newIsPlaying) => {
        setIsPlaying(newIsPlaying);
    };

    const handleCurrentTimeChange = (newCurrentTime) => {
        setCurrentTime(newCurrentTime);
    };

    const handleDurationChange = (newDuration) => {
        setDuration(newDuration);
    };

    return (
        <div>
            <AudioPlayerProvider>
                <AudioPlayer
                    isPlaying={isPlaying}
                    onIsPlayingChange={handleIsPlayingChange}
                    currentTime={currentTime}
                    onCurrentTimeChange={handleCurrentTimeChange}
                    duration={duration}
                    onDurationChange={handleDurationChange}
                />
                {/* Dodaj więcej odtwarzaczy, jeśli jest to wymagane */}
            </AudioPlayerProvider>
        </div>
    );
}

export default AudioPlayerWrapper;