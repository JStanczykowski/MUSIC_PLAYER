import React, {useEffect, useState} from "react";
import api from "../../api/axiosConfig";
import img from "../leftSide/JSIFY.PNG";
import {FaHeart, FaPlayCircle, FaPlusCircle} from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Music =()=>{

    const [music, setMusic] = useState([]);
    const getMusic = async () => {
        try {
            const response = await api.get("/api/v1/music",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            console.log(response.data);
            setMusic(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };
    function srcImg(photo) {
        const LogoSrc = require(`../../musicElement/png/${photo}.png`);
        return LogoSrc;
    }
    const navigate = useNavigate();
    function toggleDiv(photo, title, artist, number) {
        const LogoSrc = require(`../../musicElement/png/${photo}.png`);

        let X=  title;
        let X1 = number;
        let X2=artist;

        console.log("this", number);

        navigate('/admin/music/comment',{state:{title: {X}, artist:{X2}, img:{LogoSrc}, number: {X1}}})

    }
    const deleteMus = async (id) => {
        console.log("to "+id);
        try {
            const response = await api.delete(`/api/v1/music/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            if (response.status === 200) {
                setMusic(music.filter(song => song.objectId !== id));
            }else {
                console.log('Error delete music');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const back =async()=>{
        navigate('/admin');
    }
    useEffect(() => {
        getMusic();
    }, []);
    return(
        <div className="xd">
            <ArrowBackIcon onClick={()=>{
                back();
            }}/>
            <table className="table mb-0">
                <thead>
                <tr>
                    <th scope="col">Image logo</th>
                    <th scope="col">Title</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {music.map((song) => {
                    return (
                        <tr key={song.id} className="fw-normal">
                            <th>
                                <img src={srcImg(song.plik)} alt="x"
                                     className="shadow-1-strong rounded-circle"/>
                                <span className="ms-2">{song.artysta}</span>
                            </th>
                            <td className="align-middle"
                                onClick={() => toggleDiv(song.plik, song.tytul, song.artysta, song.objectId)}>
                                <span className="tytulMid">{song.tytul}</span>
                            </td>
                            <td className="align-middle"
                                onClick={() => deleteMus(song.objectId)}>
                                <span className="tytulMid">
                                    <button type="button" className="btn btn-danger">Delete</button>
                                </span>
                            </td>

                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Music;