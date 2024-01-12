import React, { useEffect, useState } from "react";
import { getMusicData } from "../TestFile";
import Comment from "./comment/Comment";
import "./comments.css";
import CommentForm from "./CommentForm";
import api from "../../../api/axiosConfig";
import jwt_decode from "jwt-decode";
import { useLocation } from 'react-router-dom';
import {Spinner} from "react-bootstrap";

export const deleteCommentApi = async (id) => {
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;

    try {
        const response = await api.delete(`/api/v1/reviews/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });

        if (response.status === 200) {
            console.log(`Komentarz o id ${id} został usunięty.`);

        }
    } catch (error) {
        console.error('Błąd podczas usuwania komentarza:', error);

    }
};
export const createCommentApi = async (text, parentId = null, location) => {
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;

    const number = location.state?.number?.X1;

    try {
        const response = await api.post(
            '/api/v1/reviews',
            {
                reviewBody: text,
                number: number,
                owner: username,
                parentId: parentId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            }
        );
        console.log('Komentarz został dodany!');
        if (response.status === 200) {
            console.log('działa');
            return response.data; // Zwróć dane komentarza, jeśli potrzebne
        }
    } catch (error) {
        console.log('Wystąpił błąd podczas dodawania komentarza:', error);
        throw error; // Rzuć błąd, aby móc obsłużyć go w komponencie
    }
}
export const updateCommenttApi = async (text, id) => {
    try {
        const response = await api.put(
            `/api/v1/reviews/${id}`,
            { text:text },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            }
        );
        console.log('Komentarz został zaaktualizowany!');
        if (response.status === 200) {
            console.log('działa');
            return response.data;
        }
    } catch (error) {
        console.log('Wystąpił błąd podczas aktualizacji komentarza:', error);
        throw error;
    }
}

const Comments = ({ currentUser, objectId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [mus, setMus] = useState();
    const [activeComment,setActiveComment] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const reviewsData = await getMusicData(objectId, setMus, setReviews);
            setBackendComments(reviewsData || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania danych:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [objectId]);
    const deleteComment = async (id) => {
       if(window.confirm("Are you sure that you want to remove comment?")){
           try {
               await deleteCommentApi(id);
               fetchData();
           } catch (error) {
               console.error('Błąd:', error);
           }
       }


    };
    const addComment = (text, parentId) => {
        const finalParentId = parentId !== undefined ? parentId : "";
        console.log(parentId);
        try {
            createCommentApi(text, finalParentId, location).then(fetchData);

            setActiveComment(null);
        } catch (error) {
            console.error('Błąd:', error);
        }
    };
    const updateComment = (text, id) => {

        try {
            updateCommenttApi(text, id).then(fetchData);

            setActiveComment(null);
        } catch (error) {
            console.error('Błąd:', error);
        }
    };
    return (
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comments-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <div className="comments-container">
                    {backendComments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            replies={comment.parentId || []}
                            currentUserId={currentUser}
                            addComment={addComment}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            activeComment = {activeComment}
                            setActiveComment={setActiveComment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comments;
