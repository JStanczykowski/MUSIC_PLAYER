import React, {useCallback, useEffect, useState} from "react";
import api from "../../api/axiosConfig";
import "./ListMessage.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProfileComponent from "../profilecomponent/ProfileComponent";
import jwt_decode from "jwt-decode";
const ListMessage = () =>{
    const [formValues, setFormValues] = useState({ title: '', message: '' });
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);
    const mess = async (event) => {
        navigate('/app/message');
    }

    const inbox = async (event) => {
        window.location.reload();
    }
    const getMessage = async () => {
        try {
            const response = await api.get("/api/v1/message",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            console.log(response.data)
            setMessage(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        getMessage();
    }, []);
    const replyComment = async (reply, id) => {
        try {
            const response = await api.put(
                `/api/v1/message/${id}`,
                { reply:reply,
                    username:username},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                }
            );
            console.log('Wiadomość została wysłana!');
            if (response.status === 200) {
                console.log('działa');
                getMessage();
                // return response.data;
            }
        } catch (error) {
            console.log('Wiadomość nie została wysłana!', error);
            throw error;
        }
    }
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isMessageShown, setIsMessageShown] = useState({});

    const toggleMessage = useCallback((messageId) => {
        if (selectedMessage === messageId) {
            setSelectedMessage(null);
            setIsMessageShown(prevState => ({ ...prevState, [messageId]: false }));
        } else {
            setSelectedMessage(messageId);
            setIsMessageShown(prevState => ({ ...prevState, [messageId]: true }));
        }
    }, [selectedMessage]);

    const [selectedReply, setSelectedReply] = useState({});
    const [isReplyShown, setIsReplyShown] = useState({});

    const toggleReply = useCallback((messageId, replyId) => {
        setIsReplyShown(prevState => ({
            ...prevState,
            [messageId]: { ...prevState[messageId], [replyId]: !prevState[messageId]?.[replyId] }
        }));
    }, []);
    const onSubmit = (event, messageId) => {
        event.preventDefault();

        if (text.trim() !== "") {
            replyComment(text, messageId)
                .then((response) => {
                    console.log("Wiadomość została wysłana!", response);
                    // inbox();

                })
                .catch((error) => {
                    console.log("Wiadomość nie została wysłana!", error);

                });
        } else {
            console.log("Tekst odpowiedzi jest pusty!");

        }
        setText("");
    };
    const [text, setText] = useState("");

    const renderMessageContent = (msg) => {
        console.log(msg);
        const createAt = new Date(msg.createAt);
        const isTextAreaVisible = text.length === 0;
        const formattedDate = `${createAt.getDate().toString().padStart(2, '0')}-${
            (createAt.getMonth() + 1).toString().padStart(2, '0')
        }-${createAt.getFullYear()}`;
        return (
            <div>
                <div className={msg.username === username ? "message-left" : "message-right"}>
                    <h2>{msg.username}</h2>
                    <h4>{msg.title}</h4>
                    <p>{msg.messageBody}</p>
                    {isReplyNotEmpty(msg.reply) && (
                        <div>
                            <button className="comment-form-button-reply" onClick={() => toggleReply(msg.id, "reply")}>
                                Show Reply
                            </button>
                        </div>
                    )}
                </div>
                {isReplyNotEmpty(msg.reply) && isReplyShown[msg.id]?.["reply"] && (
                    msg.reply.map((reply, index) => (
                        <div key={index} className={reply.username === username ? "message-left" : "message-right"}>
                            <h2>{reply.username}</h2>
                            <p>{reply.messageBody}</p>
                        </div>
                    ))
                )}
                {isReplyShown[msg.id]?.["reply"] && (
                    <form onSubmit={(event) => onSubmit(event, msg.id)} className="comment-form-review">
                        <textarea
                            className="comment-form-textarea"
                            value={text}
                            placeholder="Enter the message"
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className="comment-form-button" type="submit">Send</button>
                        <button
                            type="button"
                            className="comment-form-cancel-button"
                            onClick={() => toggleReply(msg.id, "reply")}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        );
    };

    const isReplyNotEmpty = (reply) => {
        return reply && reply.length > 0;
    };

    return (
        <div className="fullContainer">

            <div className="xd">
                <div>
                    {message.map((messa, index) => {

                        if (messa.active === "true") {
                            return (
                                <div key={index}>
                                    {renderMessageContent(messa)}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            <div className="player"></div>
        </div>
    )
}

export default ListMessage;