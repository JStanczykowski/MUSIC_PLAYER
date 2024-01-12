import React, {useEffect, useState} from 'react';
import "./AddMusic.css"
import api from "../../api/axiosConfig";
const AddMusic = () => {

    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        picture: "",
        file: "",
        genre: "rap",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },

                body: JSON.stringify({
                    title: formData.title,
                    artist: formData.artist,
                    file: formData.file,
                    picture: formData.picture,
                    genre: formData.genre
                }),
            });

            if (response.ok) {
                console.log("succes")

            } else {

                console.log('Error registering user ' + response.type);
            }
        } catch (error) {
            console.log('Wystąpił błąd podczas dodawania komentarza:', error);
        }
        console.log(formData);
        setFormData({
            title: "",
            artist: "",
            picture: "",
            file: "",
            genre: "rap",
        });
    };

    const handleClear = () => {
        setFormData({
            title: "",
            artist: "",
            picture: "",
            file: "",
            genre: "rap",
        });
    };

    return (
        <div className="fullContainer">
            <div className="xd">
                <form className="form-add-music" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            id="input-add-music"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Artist:</label>
                        <input
                            type="text"
                            name="artist"
                            value={formData.artist}
                            onChange={handleChange}
                            id="input-add-music"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Picture:</label>
                        <input
                            type="text"
                            name="picture"
                            value={formData.picture}
                            onChange={handleChange}
                            id="input-add-music"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>File:</label>
                        <input
                            type="text"
                            name="file"
                            value={formData.file}
                            onChange={handleChange}
                            id="input-add-music"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Genre:</label>
                        <select
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            id="input-add-music"
                        >
                            <option value="rap">Rap</option>
                            <option value="pop">Pop</option>
                            <option value="hiphop">Hip Hop</option>
                        </select>
                    </div>
                    <div className="button-group">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMusic;
