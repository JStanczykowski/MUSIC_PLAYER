import React, { useEffect, useState } from "react";
import "./TestFile.css";
import api from "../../api/axiosConfig";
import ReviewForm from "../reviewForm/ReviewForm";
import avatar from "./avatar.png";
import { useLocation } from 'react-router-dom'
import AudioPlayer from "../audioplayer/AudioPlayer";
import Comments from "./comments/comments"
import { Provider } from 'react-redux';
import store from "../store/store";
import ProfileComponent from "../profilecomponent/ProfileComponent";
import jwt_decode from "jwt-decode";
export const getMusicData = async (objectId,setMus,setReviews) => {
    try {
        const response = await api.get(`/api/v1/music/${objectId}`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            } });
        const review = await api.get(`/api/v1/reviews/${objectId}`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            } });
        const singleMusic = response.data;
        setMus(singleMusic);
        console.log(review.data)
        setReviews(response.data.reviews);
        return review.data;
    } catch (error) {
        console.log(error);
    }
};
function TestFile() {
    const location = useLocation()
    const title = location.state.title.X;
    const number = location.state.number.X1;
    const artist = location.state.artist.X2;
    const img = location.state.img.LogoSrc;
    const objectId = location.state.objectId.X3;

    const [mus, setMus] = useState();
    const [reviews, setReviews] = useState([]);



    useEffect(() => {
        getMusicData(objectId,setMus,setReviews);
    }, []);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    return (

            <div className="wrapper">
                {/*<ProfileComponent name={username}/>*/}
                <div className="content">
                    <div>
                    <img src={img} alt="xd" className="imgStyle" />
                    <div className="details">
                        <h1>{title}</h1>
                        <p>{artist}</p>
                    </div>
                    </div>
                <Comments currentUser={username} objectId={objectId}/>
                </div>

            </div>

    );
}

export default TestFile;
