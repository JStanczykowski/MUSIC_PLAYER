import React, { useEffect, useState } from "react";
import "./TestFile.css";
import api from "../../api/axiosConfig";
import ReviewForm from "../reviewForm/ReviewForm";
import avatar from "./avatar.png";
import { useLocation } from 'react-router-dom'
import AudioPlayer from "../audioplayer/AudioPlayer";

import { Provider } from 'react-redux';
import store from "../store/store";
import ProfileComponent from "../profilecomponent/ProfileComponent";
import jwt_decode from "jwt-decode";
function TestFile() {
    const location = useLocation()
    const title = location.state.title.X;
    const number = location.state.number.X1;
    const artist = location.state.artist.X2;
    const img = location.state.img.LogoSrc;
    const objectId = location.state.objectId.X3;

    const [mus, setMus] = useState();
    const [reviews, setReviews] = useState([]);

    const getMusicData = async () => {
        try {
            const response = await api.get(`/api/v1/music/${objectId}`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            const singleMusic = response.data;
            setMus(singleMusic);

            setReviews(response.data.reviews);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMusicData();
    }, []);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    return (

            <div className="wrapper">
                {/*<ProfileComponent name={username}/>*/}
                <div className="content">
                    <img src={img} alt="xd" className="imgStyle" />
                    <div className="details">
                        <h1>{title}</h1>
                        <p>{artist}</p>
                    </div>

                </div>
            <div className="reviewFormL">    <ReviewForm setReviews={setReviews} number={number} /></div>
                <div className="review-comments-wrapper">
                    <div className="comments">
                        {mus && Array.isArray(mus.reviewIds) &&
                            mus.reviewIds.map((review) => (
                                <div className="review-body">
                                    <img src={avatar} alt="avatar" />
                                    <div className="review-user">
                                        <p className="review-username" key={review.id.timestamp}>{review.owner}</p>
                                        <p className="review-text" key={review.id.timestamp}>{review.body}</p>
                                    </div>
                                    <div className="review-likes">
                                        <span className="like-counter">0</span>
                                        <i className="fas fa-thumbs-up"></i>
                                        <i className="fas fa-thumbs-down"></i>
                                    </div>
                                    <div className="review-buttons">
                                        <button className="like-button">Like</button>
                                        <button className="dislike-button">Dislike</button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="player">
                        <AudioPlayer />
                    </div>
                </div>
            </div>

    );
}

export default TestFile;
