import React, { useEffect, useState } from "react";
import LeftSide from "../leftSide/LeftSide";
import AudioPlayer from "../adioplayer/AudioPlayer";
import store from '../store/store';
import { Provider } from 'react-redux';
const Message=(props)=>{
    return(
        <Provider store={store}>
            <div className="fullContainer">
                <div className="xd">


                </div>
                <div className="player">
                    <AudioPlayer />
                </div>

            </div>
        </Provider>
    )
}

export default Message;