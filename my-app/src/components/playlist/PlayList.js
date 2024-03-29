import React, { useEffect, useState } from 'react';
import './PlayList.css';
import { useNavigate } from 'react-router-dom';
import store, {playTrack} from '../store/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AudioPlayer from '../audioplayer/AudioPlayer';
import jwt_decode from 'jwt-decode';
import api from '../../api/axiosConfig';
import AddPlayList from "../addPlayList/AddPlayList";
import  nuta from "../../musicElement/png/333.png"
import {FaHeart, FaPlayCircle,FaTrashAlt} from "react-icons/fa";
import {Alert, AlertTitle} from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProfileComponent from "../profilecomponent/ProfileComponent";
export const createPlayListApi = async (name, username) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                name: name,
                username: username
            }),
        });

        if (response.ok) {
            console.log('PlayList created successfully!');
            return response.data; // Możesz zwrócić dane playlisy, jeśli potrzebujesz
        } else {
            console.log('Error creating playlist');
        }
    } catch (error) {
        console.log('An error occurred while creating playlist:', error);
        throw error; // Rzuć błąd, aby móc go obsłużyć w komponencie
    }
};
function PlayList(props) {
    const navigate = useNavigate();
    const [playlistApi, setPlayList] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const [isDeleted, setIsDeleted] = useState(false);
    const [isCreate, setCreate] = useState(true);

    const getPlaylist = async () => {
        try {
            const response = await api.get(`/api/v1/playlist/names/${username}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            setPlayList(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getPlaylist();
    }, []);

    const showMore = async (id, nazwa) => {
        navigate(`/app/playlist/${id}`, { state: { nazwa: nazwa } });
    }

    const create = async () => {
        setCreate(false);
    }

    const deletePlayList = async (idPlayList) => {
        const idPar = idPlayList;

        try {
            const response = await api.delete(`/api/v1/playlist/${idPar}/deletePlayList`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (response.status === 200) {
                console.log("success DELETE ");
                const playlist = response.data;
                console.log(playlist);
                setIsDeleted(true);
                setPlayList(playlistApi.filter(item => item.id !== idPlayList));
            } else {
                console.log('Error delete playlist');
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404) {
                setIsDeleted(true);
            }
        }
    };

    useEffect(() => {
        let timeout;
        if (isDeleted) {
            timeout = setTimeout(() => {
                setIsDeleted(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [isDeleted]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [playlist, setPlayListPlay] = useState([]);
    const dispatch = useDispatch();
    const index = useSelector((state)=>state.index);
    const table = useSelector((state)=>state.playlist);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        try {
            // const image = require(`../../musicElement/png/${table[index].plik}.png`);
            const image = `https://drive.google.com/uc?id=${table[index].zdjecie}`;
            dispatch(playTrack(table[index].tytul, table[index].artysta, table[index].plik, image));
        }
        catch (err) {
            console.log(err);
        }
    }, [table]);
    const playPlayList = async (id)=> {
        try {
            const response = await api.get(`/api/v1/playlist/${id}/musicIds`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            console.log(response.data);
            dispatch({
                type: 'PLAYLIST_TO_PLAYLIST',
                payload: {
                    index: index,
                    element: response.data
                }
            });
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const handleCreatePlayList= () => {
        try {
            // Wywołanie funkcji createPlayListApi
            createPlayListApi(name, username).then(getPlaylist);
            handleClose();
            // Tu możesz dodać logikę po utworzeniu playlisty, np. odświeżenie listy playlist, aktualizację stanu itp.
            console.log('PlayList created successfully!');
        } catch (error) {
            console.error('An error occurred while creating playlist:', error);
            // Tutaj możesz obsłużyć błąd, np. wyświetlając komunikat dla użytkownika
        }
    };

    const CreatePlayList = async () => {
        setIsCreating(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                }),
            });

            if (response.ok) {
                setCreate(true);
                setIsCreating(false);
                setIsDeleted(false); // Usunięcie komunikatu o sukcesie po utworzeniu nowej playlisty

                // Pobranie zaktualizowanej listy playlist bez odświeżania strony
                getPlaylist();

                alert('Playlist created successfully!'); // Dodanie komunikatu
            } else {
                setIsCreating(false);
                console.log('Error create playlist');
            }
        } catch (error) {
            setIsCreating(false);
            console.log(await error.text());
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(

        <div className="fullContainer"><ProfileComponent name={username}/>
                <div className="xd">
                    <div>
                        <Button variant="primary" onClick={handleShow}>
                            Create new PlayList
                        </Button>

                        <Modal show={show} onHide={handleClose}>

                            <Modal.Header closeButton>
                                <Modal.Title>Form for creating a new playlist</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleCreatePlayList}>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Name the PlayList</Form.Label>
                                        <Form.Control
                                            className="contentClassName"
                                            type="text" placeholder="Enter name"
                                            value={name}
                                            style={{ width: '450px', height:'80px', margin:'5px 5px 5px 5px' }}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus/>
                                        <small id="emailHelp" className="form-text text-muted">Make sure the name means something to you.</small>
                                        <Button variant="primary" type="submit" >
                                            Submit
                                        </Button>
                                    </Form.Group> </Form>

                            </Modal.Body>
                            <Modal.Footer>

                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className="card-body">

                        {/*{isCreate ? (*/}
                        {/*    <button type="button" className="btn btn-primary" onClick={create}>*/}
                        {/*        Create new PlayList*/}
                        {/*    </button>*/}
                        {/*) : (*/}
                        {/*    <AddPlayList setCreate={setCreate} />*/}
                        {/*)}*/}
                    </div>
                    {isDeleted &&(    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Success delete PlayList <strong>check it out!</strong>
                    </Alert>)}

                    <div className="card-container">
                        {playlistApi.map((plalist) => (
                            <div className="card" >
                                <img class="card-img-top" src={nuta} />
                                <span className="play-btn">
                                <FaPlayCircle className="play-button"
                                onClick={()=>playPlayList(plalist.id)}/>
                                <FaTrashAlt
                                    className="button-del"
                                    onClick={() => deletePlayList(plalist.id)}
                                />
                            </span>
                                <div className="card-body" onClick={() => showMore(plalist.id, plalist.name)}>
                                    <h5 class="card-title" key={plalist}>
                                        {plalist.name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

);
}

export default PlayList;
