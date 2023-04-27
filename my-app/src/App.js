import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/login/Login";
import LeftSide from './components/leftSide/LeftSide';
import MidSide from './components/midSide/MidSide';
import Register from './components/register/Register';
import './App.css';
import PlayList from './components/playlist/PlayList';
import Reviews from "./components/testfile/TestFile";
import AudioPlayer from "./components/adioplayer/AudioPlayer";
import { Provider } from 'react-redux';
import AddPlayList from "./components/addPlayList/AddPlayList";
import store from './components/store/store';
import SearchScreen from './components/searchscreen/SearchScreen';
import PlayListSingle from './components/playlistsingle/PlayListSingle';
import Message from "./components/message/Message";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>

                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/app" element={<div className="glowny">
                                <Provider store={store}>
                                <LeftSide /><MidSide /></Provider></div>} />
                        </>
                    ) : (
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    )}
                    <Route path="/app/reviews" element={<div className="glowny"> <Provider store={store}>
                        <LeftSide/><Reviews/></Provider></div>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/app/playList" element={<div className="glowny"><Provider store={store}><LeftSide/><PlayList/>
                    </Provider></div>}/>
                    <Route path="/app/search" element={<div className="glowny"><Provider store={store}><LeftSide/><SearchScreen/>
                    </Provider></div>}/>
                    <Route path="/app/message" element={<div className="glowny"><Provider store={store}><Message/><SearchScreen/>
                    </Provider></div>}/>
                    <Route path="/app/playList/:id" element={<div className="glowny"><Provider store={store}><LeftSide/><PlayListSingle/>
                    </Provider></div>}/>

                </Routes>

        </BrowserRouter>
    );
}

export default App;


//
// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from "./components/login/Login";
// import LeftSide from './components/leftSide/LeftSide';
// import MidSide from './components/midSide/MidSide';
// import Register from './components/register/Register';
// import './App.css';
// import PlayList from './components/playlist/PlayList';
// import Reviews from "./components/testfile/TestFile";
// import AudioPlayer from "./components/adioplayer/AudioPlayer";
//
// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [audioPlayerState, setAudioPlayerState] = useState({
//         isPlaying: false,
//         volume: 50,
//         // ... inne właściwości stanu, które masz w AudioPlayer
//     });
//
//     const handleAudioPlayerStateChange = (newState) => {
//         setAudioPlayerState((prevState) => ({ ...prevState, ...newState }));
//     };
//
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {isLoggedIn ? (
//                     <>
//                         <Route
//                             path="/app"
//                             element={
//                                 <div className="glowny">
//                                     <LeftSide audioPlayerState={audioPlayerState} handleAudioPlayerStateChange={handleAudioPlayerStateChange} />
//                                     <MidSide audioPlayerState={audioPlayerState} handleAudioPlayerStateChange={handleAudioPlayerStateChange} />
//                                     <AudioPlayer audioPlayerState={audioPlayerState} handleAudioPlayerStateChange={handleAudioPlayerStateChange} />
//                                 </div>
//                             }
//                         />
//                     </>
//                 ) : (
//                     <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//                 )}
//                 <Route
//                     path="/app/reviews"
//                     element={
//                         <div className="glowny">
//                             <LeftSide audioPlayerState={audioPlayerState} handleAudioPlayerStateChange={handleAudioPlayerStateChange} />
//                             <Reviews audioPlayerState={audioPlayerState} handleAudioPlayerStateChange={handleAudioPlayerStateChange} />
//                             <AudioPlayer audioPlayerState={audioPlayerState} handleAudioPlayerStateChange={handleAudioPlayerStateChange} />
//                         </div>
//                     }
//                 />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/playList" element={<div className="glowny"><LeftSide/><PlayList/></div>} />
//             </Routes>
//         </BrowserRouter>
//     );
// }
//
// export default App;
