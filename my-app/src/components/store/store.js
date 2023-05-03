import { createStore } from 'redux';

const savedIsPlaying = localStorage.getItem('isPlaying') === 'true';

const initialState = {
    isPlaying: savedIsPlaying,
    trackName: '',
    artistName: '',
    playlist:[],
    audioS: '',
    image: '',
    duration:0,
    currentTime:1,
    audioElement: null,
    audioPlayerRef: null,
};
export const setAudioElement = (audioElement) => ({
    type: 'SET_AUDIO_ELEMENT',
    payload: audioElement,
});
export const setPlayList = (playlist) => ({
    type: 'SET_PLAYLIST',
    payload:playlist,
})
export const playTrack = (trackName, artistName, audioS, image) => ({
    type: 'PLAY_TRACK',
    payload: { trackName, artistName, audioS, image }
});
export const setAudioPlayerRef = (ref) => ({
    type: 'SET_AUDIO_PLAYER_REF',
    payload: ref,
});
export const pauseTrack = () => ({
    type: 'PAUSE_TRACK'
});

export const stopTrack = () => ({
    type: 'STOP_TRACK'
});
export const setCurrentTime = (currentTime) => ({
    type: 'SET_CURRENT_TIME',
    payload: currentTime
});

export const setDuration = (duration) => ({
    type: 'SET_DURATION',
    payload: duration
});
const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PLAY_TRACK':
            return {
                ...state,
                isPlaying: true,
                trackName: action.payload.trackName,
                artistName: action.payload.artistName,
                audioS: action.payload.audioS,
                image: action.payload.image
            };
        case 'SET_AUDIO_PLAYER_REF':
            return { ...state, audioPlayerRef: action.payload };
        case 'PAUSE_TRACK':
            return {
                ...state,
                isPlaying: false
            };
        case 'SET_PLAYLIST':
            return {
                ...state,
                playlist: [...state.playlist, action.payload]
            };
        case 'SET_AUDIO_ELEMENT':
            return {
                ...state,
                audioElement: action.payload,
            };
        case 'STOP_TRACK':
            return initialState;

        default:
            return state;
    }
};

const store = createStore(playerReducer);

store.subscribe(() => {
    const isPlaying = store.getState().isPlaying;
    localStorage.setItem('isPlaying', isPlaying.toString());
});

export default store;