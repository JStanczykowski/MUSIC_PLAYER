import React, { useEffect, useState } from "react";
import LeftSide from "../leftSide/LeftSide";
import AudioPlayer from "../adioplayer/AudioPlayer";
import store from '../store/store';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import {Alert, AlertTitle} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../api/axiosConfig";
const InboxMess=(props)=>{
    const [formValues, setFormValues] = useState({title: '', message: ''});
    const token = localStorage.getItem('accessToken');
    const [isSend, setIsSend] = useState(false)
    const {username} = useParams();
    const navigate = useNavigate();
    const [message,setMessage] = useState([]);
    const mess = async (event)=>{
        navigate('/app/message');
    }
    const inbox = async (event)=>{
        window.location.reload();
    }
    const getMessage = async () => {
        try {
            const response = await api.get(`/api/v1/message/${username}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            setMessage(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getMessage();
    }, []);
    return(
        <Provider store={store}>
            <div className="fullContainer">
                <div className="xd">
                    <div>
                    <button type="button" className="btn btn-outline-primary btn-lg" onClick={mess}>
                        Send message</button>
                    <button type="button" className="btn btn-outline-primary btn-lg" onClick={inbox}>
                        The inbox</button>
                    </div>
                    <div>
                        {message.map((messa) => (
                            <p key={messa}>{messa.messageBody}</p>

                            ))}
                    </div>
                    </div>
                </div>
                <div className="player">
                    <AudioPlayer />
                </div>

        </Provider>
    )
}

export default InboxMess;