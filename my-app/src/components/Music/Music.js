import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./music.css";

const Music = () => {
    const [music, setMusic] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(4);

    const getMusic = async () => {
        try {
            const response = await api.get("/api/v1/music", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            console.log(response.data);
            setMusic(response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    function srcImg(photo) {
        const LogoSrc = `https://drive.google.com/uc?id=${photo}`;
        return LogoSrc;
    }

    const navigate = useNavigate();
    const [newTest, setNewTest] = useState({
        img: "",
        title: "",
        artist: "",
        number: "",
        zdjecie: "",
    });
    function toggleDiv(photo, title, artist, objectId, number, zdjecie) {


        const LogoSrc = `https://drive.google.com/uc?id=${zdjecie}`;
        setNewTest({
            img: LogoSrc,
            title: title,
            artist: artist,
            number: number,
        })
        console.log("id: "+objectId)
        let X = title;
        let X1 = number;
        let X2 = artist;
        let X3 = objectId;


        navigate('/admin/music/comment', {state: {title: {X}, artist: {X2}, img: {LogoSrc}, number: {X1}, objectId: {X3}}})
    }

        const deleteMus = async (id) => {
        console.log("to " + id);
        try {
            const response = await api.delete(`/api/v1/music/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });
            if (response.status === 200) {
                setMusic(music.filter((song) => song.objectId !== id));
            } else {
                console.log("Error delete music");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const back = async () => {
        navigate("/admin/users");
    };

    useEffect(() => {
        getMusic();
    }, []);

    // Paginacja
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = music.slice(indexOfFirstSong, indexOfLastSong);

    return (
        <div className="xd">
            <ArrowBackIcon onClick={back} />
            <table className="table mb-0" id="quick-repair">
                <thead>
                <tr>
                    <th scope="col">Image logo</th>
                    <th scope="col">Title</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {currentSongs.map((song) => (
                    <tr key={song.id} className="fw-normal">
                        <th>
                            <img
                                src={srcImg(song.zdjecie)}
                                alt="x"
                                className="shadow-1-strong rounded-circle"
                            />
                            <span className="ms-2">{song.artysta}</span>
                        </th>
                        <td
                            className="align-middle"
                            onClick={() => toggleDiv(song.plik, song.tytul, song.artysta, song.objectId,song.number,song.zdjecie)}>
                            <span className="tytulMid">{song.tytul}</span>
                        </td>
                        <td className="align-middle" onClick={() => deleteMus(song.objectId)}>
                <span className="tytulMid">
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Paginacja */}
            <nav>
                <ul className="pagination">
                    {[...Array(Math.ceil(music.length / songsPerPage)).keys()].map((number) => (
                        <li key={number + 1} className="page-item">
                            <button
                                onClick={() => setCurrentPage(number + 1)}
                                className="page-link"
                            >
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Music;