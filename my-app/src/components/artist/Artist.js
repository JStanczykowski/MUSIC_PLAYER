import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import api from "../../api/axiosConfig";
import { AiFillInfoCircle } from "react-icons/ai";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { FaItunesNote } from "react-icons/fa";
import Pagination from 'react-bootstrap/Pagination';
import ProfileComponent from "../profilecomponent/ProfileComponent";
import "./Artist.css";

const Artist = () => {
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const [artistData, setArtistData] = useState([]);
    const [ai, setAi] = useState(null);
    const [loadingAi, setLoadingAi] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [expandedArtists, setExpandedArtists] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const artistsPerPage = 5;

    const getArtist = async () => {
        try {
            const response = await api.get(`/api/v1/music/artist`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });

            if (response.data && typeof response.data === 'object') {
                const artistNames = Object.keys(response.data);
                const initialExpandedArtists = {};

                artistNames.forEach(artistName => {
                    initialExpandedArtists[artistName] = false;
                });

                setExpandedArtists(initialExpandedArtists);
                setArtistData(response.data);
            } else {
                console.log('Dane artystów w niepoprawnym formacie.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const getInfoArtist = async (artistName) => {
        try {
            setLoadingAi(true);
            const response = await api.get(`/api/v1/music/ai/${artistName}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            setAi(response.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoadingAi(false);
        }
    };

    useEffect(() => {
        getArtist();
    }, []);

    const handleInfoArtist = async (artistName) => {
        setShowModal(true);
        await getInfoArtist(artistName);
    };

    const toggleExpand = (artistName) => {
        setExpandedArtists(prevState => ({
            ...prevState,
            [artistName]: !prevState[artistName]
        }));
    };

    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    const currentArtists = Object.keys(artistData).slice(indexOfFirstArtist, indexOfLastArtist);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="fullContainer">
            <ProfileComponent name={username} />
            <div className="xd">
                <table className="table table-striped table-dark" id="xdd">
                    <thead>
                    <tr>
                        <th scope="col">Artist name</th>
                        <th scope="col">Artist information </th>
                        <th scope="col">Artist musics </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentArtists.map((artistName, index) => (
                        <tr key={index}>
                            <td>
                                {artistName}{" "}
                            </td>
                            <td>
                                <AiFillInfoCircle onClick={() => handleInfoArtist(artistName)} className="show-music" />
                            </td>
                            <td>
                                <FaItunesNote onClick={() => toggleExpand(artistName)} className="show-music" />
                                {expandedArtists[artistName] && (
                                    <tr>
                                        {artistData[artistName].map((song, songIndex) => (
                                            <tr key={songIndex}>
                                                <td>{song.tytul}  </td>
                                                <td> : {song.genre}</td>
                                            </tr>
                                        ))}
                                    </tr>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <Pagination>
                        {[...Array(Math.ceil(Object.keys(artistData).length / artistsPerPage)).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
                <Dialog open={showModal} onClose={() => setShowModal(false)}>
                    <DialogTitle>Artist Information</DialogTitle>
                    <DialogContent>
                        {loadingAi ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <div>
                                <p>{ai}</p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions></DialogActions>
                </Dialog>
                <div></div>
            </div>
        </div>
    );
};

export default Artist;
