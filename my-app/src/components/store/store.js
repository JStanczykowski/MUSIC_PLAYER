import { createStore } from 'redux';

const initialState = {
    isPlaying: false,
    trackName: '',
    artistName: '',
    audioS: '',
    image:''
};

export const playTrack = (trackName, artistName,audioS,image) => ({

    type: 'PLAY_TRACK',
    payload: { trackName, artistName,audioS,image }
});

export const pauseTrack = () => ({
    type: 'PAUSE_TRACK'
});

export const stopTrack = () => ({
    type: 'STOP_TRACK'
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
        case 'PAUSE_TRACK':
            return {
                ...state,
                isPlaying: false
            };
        case 'STOP_TRACK':
            return initialState;
        default:
            return state;
    }
};

const store = createStore(playerReducer);

export default store;