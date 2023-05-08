import React from "react";
import api from "../../api/axiosConfig";
import { useEffect, useState } from "react";
import avatar from "../testfile/avatar.png";
import {useLocation, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Comment = () => {
    const location = useLocation();
    const [reviews, setReviews] = useState([]);
    const number = location.state.number.X1;

    const getMusicData = async () => {
        try {
            const response = await api.get(`/api/v1/reviews/${number}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            console.log(response.data);
            setReviews(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (id) => {
        console.log("to " + id);
        try {
            const response = await api.delete(`/api/v1/reviews/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            if (response.status === 200) {
                setReviews(
                    reviews.filter((review) => review.objectId !== id.toHexString())
                );
            } else {
                console.log("Error delete music");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMusicData();
    }, []);
    const navigate = useNavigate();
    const back =async()=>{
        navigate('/admin/music');
    }
    return (
        <div className="xd">
            <ArrowBackIcon onClick={()=>{
                back();
            }}/>
                        <div className="comments">
                {Object.entries(reviews).map(([objectId, body]) => (
                    <div className="review-body" key={objectId}>
                        <img src={avatar} alt="avatar" />
                        <div className="review-user">
                            <p className="review-username">User</p>
                            <p className="review-text">{body}</p>
                        </div>
                        <div className="review-likes">
                            <span className="like-counter">0</span>
                            <i className="fas fa-thumbs-up"></i>
                            <i className="fas fa-thumbs-down"></i>
                        </div>
                        <div className="review-buttons">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => deleteComment(objectId)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
