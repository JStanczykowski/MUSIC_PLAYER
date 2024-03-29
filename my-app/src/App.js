import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/login/Login";
import LeftSide from './components/leftSide/LeftSide';
import MidSide from './components/midSide/MidSide';
import Register from './components/register/Register';
import './App.css';
import PlayList from './components/playlist/PlayList';
import Reviews from "./components/testfile/TestFile";
import AudioPlayer from "./components/audioplayer/AudioPlayer";
import { Provider } from 'react-redux';
import AddPlayList from "./components/addPlayList/AddPlayList";
import store from './components/store/store';
import SearchScreen from './components/searchscreen/SearchScreen';
import PlayListSingle from './components/playlistsingle/PlayListSingle';
import Message from "./components/message/Message";
import InboxMess from "./components/inboxmess/InboxMess";
import AdminPanel from "./components/adminpanel/AdminPanel";
import profileComponent from "./components/profilecomponent/ProfileComponent";
import { createStore } from 'redux';
import ProfileInfo from "./components/profileinfo/ProfileInfo";
import Users from "./components/users/Users";
import Music from "./components/Music/Music";
import Comment from "./components/comment/Comment";
import AddMusic from "./components/addmusic/AddMusic";
import ListMessage from "./components/listmessage/ListMessage";
import Artist from "./components/artist/Artist";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(false);

    return (
        <div>
            <Provider store={store}><div>
                <BrowserRouter>
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/app" element={<div className="glowny">

                                <LeftSide setStatus={setCurrentStatus}/>
                                <MidSide status={currentStatus}/></div>} />
                        </>
                    ) : (
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    )}
                    <Route path="/app/reviews" element={<div className="glowny">
                        <LeftSide/><Reviews/></div>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/app/playList" element={<div className="glowny"><LeftSide/><PlayList/>
                   </div>}/>
                    <Route path="/app/search" element={<div className="glowny"><LeftSide/><SearchScreen/>
                    </div>}/>
                    <Route path="/app/message" element={<div className="glowny"><LeftSide/><Message/>
                 </div>}/>
                    <Route path="/app/artist" element={<div className="glowny"><LeftSide/><Artist/>
                    </div>}/>
                    <Route path="/app/:username" element={<div className="glowny"><LeftSide/><ProfileInfo/>
                    </div>}/>
                    <Route path="/app/playList/:id" element={<div className="glowny"><LeftSide/><PlayListSingle/>
                  </div>}/>
                    <Route path="/app/message/:username" element={<div className="glowny"><LeftSide/><InboxMess/>
                    </div>}/>
                    <Route path="/admin/add" element={<div className="glowny"><AdminPanel/><AddMusic/></div> }/>
                    <Route path="/admin/users" element={<div className="glowny"><AdminPanel/><Users/></div> }/>
                    <Route path="/admin/music" element={<div className="glowny"><AdminPanel/><Music/></div> }/>
                    <Route path="/admin/music/comment" element={<div className="glowny"><AdminPanel/><Reviews/></div> }/>
                    <Route path="/admin/message" element={<div className="glowny"><AdminPanel/><ListMessage/></div> }/>
                </Routes></BrowserRouter></div>
                {isLoggedIn && <AudioPlayer /> }
            </Provider>
        </div>
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
