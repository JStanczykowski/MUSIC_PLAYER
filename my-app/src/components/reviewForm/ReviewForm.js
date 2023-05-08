import React, { useState } from 'react';
import './ReviewForm.css';
import api from "../../api/axiosConfig";
import avatar from "./avatar.png";
import jwt_decode from "jwt-decode";
const ReviewForm = ({ reviews, setReviews, number,objectId }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(number);
            const response = await api.post(
                '/api/v1/reviews',
                {
                    reviewBody: comment,
                    number: number,
                    owner:username
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
                console.log('dziala');
            }
            setComment('');
            setRating('');
            setReviews([...reviews, response.data]);
        } catch (error) {
            console.log('Wystąpił błąd podczas dodawania komentarza:', error);
        }
    }
return (



    <div className="container">
        <form className="comment-form" onSubmit={handleSubmit}>
            <div className="add-comment-rating">
                <label htmlFor="comment" className="addCom">
                    Add a comment
                </label>
                <fieldset>
                    <img
                        className="comment-avatar"
                        src={avatar}
                        alt="Music author avatar"
                    />
                    <div className="star-container">
                        <label htmlFor="rating1" className="star">&#9733;</label>
                        <input
                            type="radio"
                            id="rating1"
                            name="rating"
                            value="1"
                            onChange={(event) => setRating(event.target.value)}
                        />
                        <label htmlFor="rating2" className="star">&#9733;</label>
                        <input
                            type="radio"
                            id="rating2"
                            name="rating"
                            value="2"
                            onChange={(event) => setRating(event.target.value)}
                        />
                        <label htmlFor="rating3" className="star">&#9733;</label>
                        <input
                            type="radio"
                            id="rating3"
                            name="rating"
                            value="3"
                            onChange={(event) => setRating(event.target.value)}
                        />
                        <label htmlFor="rating4" className="star">&#9733;</label>
                        <input
                            type="radio"
                            id="rating4"
                            name="rating"
                            value="4"
                            onChange={(event) => setRating(event.target.value)}
                        />
                        <label htmlFor="rating5" className="star">&#9733;</label>
                        <input
                            type="radio"
                            id="rating5"
                            name="rating"
                            value="5"
                            onChange={(event) => setRating(event.target.value)}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="form-group2">
      <textarea
          rows="5"
          className="comment"
          placeholder="What is your opinion?"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
      ></textarea>
            </div>
            <div className="button-container">
                <button type="submit">Add</button>
                <button type="clear"  onClick={() => {setComment(''); setRating('')}}>Clear</button>
            </div>
        </form>
    </div>
);
}

export default ReviewForm;