import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ProfileComponent from "../profilecomponent/ProfileComponent";
import img from "../leftSide/JSIFY.PNG";
import {FaHeart, FaPlayCircle, FaPlusCircle} from "react-icons/fa";
import { TbZoomReset } from "react-icons/tb";
import NavDropdown from "react-bootstrap/NavDropdown";
import store, {playTrack} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import api from "../../api/axiosConfig";
import {useLocation, useNavigate} from "react-router-dom";
import "./Pagination.css";
import AudioPlayer from "../audioplayer/AudioPlayer";
import {useAudioPlayer} from "../audioplayer/AudioPlayer";
import ModalAdvancedSearch from "../pagination/modalAdvancedSearch/ModalAdvancedSearch";
import SearchScreen from "../searchscreen/SearchScreen";
function Pagination({ music, setMusic, username, playlistApi,searchState }) {
    const itemsPerPage = 5; // Ilosć elementów na stronie
    const [currentPage, setCurrentPage] = useState(0);
    const [response, setResponse] = useState(null);
    const handleResponse = (data) => {
        if (data && typeof data === 'object') {
            console.log(typeof data);
            const dataArray = Object.values(data); // Przekształcenie pojedynczego obiektu 'data' w tablicę wartości
            console.log(dataArray);
            setMusic(dataArray); // Aktualizacja wartości 'music' przy użyciu funkcji przekazanej jako props ('setMusic')
            // console.log(dataArray[0]);
        }
        else {
            console.log(data);
            setMusic(data);
        }
        // console.log(music);
        setResponse(data);
    };
    const pageCount = Math.ceil(music.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    const location = useLocation();
    const navigate = useNavigate();
    const currentItems = music.slice(offset, offset + itemsPerPage);
    const [newTest, setNewTest] = useState({
        img: "",
        title: "",
        artist: "",
        number: "",
        zdjecie: "",
    });
    const dispatch = useDispatch();
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    function srcImg(photo) {
        const LogoSrc = `https://drive.google.com/uc?id=${photo}`;
        return LogoSrc;
    }
    const getMusic = async () => {
        try {
            const response = await api.get("/api/v1/music",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            console.log(response.data)
            setMusic(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };
    const table = useSelector((state)=>state.playlist);
    const index = useSelector((state)=>state.index);
    useEffect(() => {
        console.log(typeof handleResponse);
        try {
            console.log('useEffect triggered');
            const image = `https://drive.google.com/uc?id=${table[index].zdjecie}`;
            dispatch(playTrack(table[index].tytul, table[index].artysta, table[index].plik, image));
        }
        catch (err) {
            console.log(err);
        }
    }, [table,index]);
    function toggleDiv(photo, title, artist,objectId ,number,zdjecie) {


        const LogoSrc = `https://drive.google.com/uc?id=${zdjecie}`;
        setNewTest({
            img: LogoSrc,
            title: title,
            artist: artist,
            number: number,
        })
        let X=  title;
        let X1 = number;
        let X2=artist;
        let X3=objectId;


        navigate('/app/reviews',{state:{title: {X}, artist:{X2}, img:{LogoSrc}, number: {X1},objectId:{X3}}})

    }
    function handleClickTwo(id) {

        dispatch({type: "SET_PLAYLIST",payload: id});
        console.log(store.getState().playlist);
    }


    function handleClick(id) {
        try {
            dispatch({
                type: 'CURRENT_PLAYLIST',
                payload: {
                    index: index,
                    element: id
                }
            });
        }
        catch (error){
            console.log(error);
        }
    }
    const requestBody  ={
        idPlayList:'',
        idMusic:''
    }
    const addToPlayList = async (idPlayList,idMusic)=>{
        console.log(idPlayList);
        console.log(idMusic);
        requestBody.idPlayList=idPlayList;
        requestBody.idMusic=idMusic;
        console.log(requestBody);
        console.log("xd " +localStorage.getItem('accessToken'));
        try {
            const response = await api.post(`/api/v1/playlist/${requestBody.idPlayList}/addMusic`, [ idPlayList, idMusic ], {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            });
            if (response.status === 200) {
                console.log("success POST ")
                const playlist = response.data;
                console.log(playlist); // access the returned PlayList instance
            } else {
                console.log('Error create playlist');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="xd">
            <ProfileComponent name={username}/>

            <div className="card-body"   >
                <TbZoomReset className="buttonReset" onClick={() =>getMusic()}/>
                {searchState ? <ModalAdvancedSearch setShow={searchState} setResponse={handleResponse}/> : null}

                <table className="table mb-0" >
                    <thead>
                    <tr id="alignMid">
                        <th scope="col">Image logo</th>
                        <th scope="col">Title</th>
                        <th scope="col">Play</th>
                        <th scope="col">Fav</th>
                        <th scope="col">Add to PlayList</th>
                    </tr>
                    </thead>
                    <tbody >
                    {currentItems.map((song) => {
                        return (
                            <tr key={song.id} className="fw-normal" >
                                <th >
                                    <img src={srcImg(song.zdjecie)} alt="x"
                                         id="logoImg"
                                         className="shadow-1-strong rounded-circle"/>
                                    <span className="ms-2" id="artystaId">{song.artysta}</span>
                                </th>
                                <td className="align-middle"
                                    id="alignMid"
                                    onClick={() => toggleDiv(song.plik, song.tytul, song.artysta, song.objectId,song.number,song.zdjecie)}>
                                    <span className="tytulMid">{song.tytul}</span>
                                </td>
                                <td className="align-middle"
                                    id="alignMid">
                                    <FaPlayCircle onClick={() => {
                                        handleClick(song)
                                    }} className="button"/>
                                </td>
                                <td className="align-middle"
                                    id="alignMid">
                                    <FaHeart onClick={() => {
                                        handleClickTwo(song)
                                    }} className="button"/>
                                </td>
                                <td className="align-middle"
                                    id="alignMid">
                                    <NavDropdown   id="nav-dropdown-dark-example"
                                                   menuVariant="dark" title={<FaPlusCircle className="button" />}>
                                        {playlistApi.map((playlist)=>(
                                            <NavDropdown.Item  key={playlist.id}
                                                               onClick={() => addToPlayList(playlist.id, song.objectId)}
                                            >{playlist.name}</NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                containerClassName="pagination"
                pageLinkClassName="pageNumber"
                previousLinkClassName="pageNumber"
                nextLinkClassName="pageNumber"
                activeLinkClassName="active"
            />
        </div>
    );
}

export default Pagination;
