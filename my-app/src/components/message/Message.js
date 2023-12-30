import React, { useEffect, useState } from "react";
import LeftSide from "../leftSide/LeftSide";
import AudioPlayer from "../audioplayer/AudioPlayer";
import store from '../store/store';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";
import {Alert, AlertTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ProfileComponent from "../profilecomponent/ProfileComponent";
const Message=(props)=>{
    const [formValues, setFormValues] = useState({title: '', message: ''});
    const token = localStorage.getItem('accessToken');
    const [isSend, setIsSend] = useState(false)
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await fetch('http://localhost:8080/api/v1/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    username: username,
                    title: formValues.title,
                    messageBody: formValues.message,
                }),
            });

            if (response.ok) {
                console.log("succes")
                setIsSend(true);
                setFormValues({title: '', message: ''});
            } else {

                console.log('Error registering user');
            }
        } catch (error) {
            console.log(await error.text());
        }
    };
    useEffect(() => {
        let timeout;
        if (isSend) {
            timeout = setTimeout(() => {
                setIsSend(false);
            }, 4000);
        }
        return () => clearTimeout(timeout);
    }, [isSend]);
    const mess = async (event)=>{
        navigate('/app/message');
    }
    const inbox = async (event)=>{
        navigate(`/app/message/${username}`);
    }
    const handleClear = () => {
        setFormValues({ title: '', message: '' }); // Funkcja czyszcząca pola formularza
    };
    return(

        <div className="fullContainer"><ProfileComponent name={username}/>
                <div className="xd">

                    <div>
                    <button type="button" className="btn btn-outline-primary btn-lg" onClick={mess}>
                        Send message</button>
                    <button type="button" className="btn btn-outline-primary btn-lg" onClick={inbox}>
                        The inbox</button></div>
                    <div className="messageForm">
                        {isSend &&(    <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Success send message to admin <strong>check it out!</strong>
                        </Alert>)}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group4">
                            <label htmlFor="exampleFormControlInput1">Title message</label>
                            <input type="title" className="form-control input-sm" id="formGroupExampleInput"
                                   placeholder="Title"
                                   value={formValues.title}
                                   onChange={(event) =>
                                       setFormValues({ ...formValues, title: event.target.value })
                                   }
                                   required/>
                        </div>
                        <div className="form-group4">
                            <label htmlFor="exampleFormControlTextarea1">Text area for message to admin</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                                      value={formValues.message}
                                      onChange={(event) =>
                                          setFormValues({ ...formValues, message: event.target.value })
                                      }
                                      required/>

                        </div>
                        <div className="pt-1 mb-4">
                            <button className="btn btn-info btn-lg btn-block" type="submit">
                                Send
                            </button>

                            <button className="btn btn-danger btn-lg btn-block" type="clear" onClick={handleClear}>
                                Clear
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                <div className="player">

                </div>

            </div>

    )
}

export default Message;