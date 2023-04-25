import React, { useEffect, useState } from 'react';
import './PlayList.css';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';
import { Provider } from 'react-redux';
import AudioPlayer from '../adioplayer/AudioPlayer';
import jwt_decode from 'jwt-decode';
import api from '../../api/axiosConfig';
import AddPlayList from "../addPlayList/AddPlayList";

function PlayList(props) {
    const navigate = useNavigate();
    const [playlistApi, setPlayList] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const [isCreate,setCreate] = useState(true);
    const getPlaylist = async () => {
        try {
            const response = await api.get(`/api/v1/playlist/names/${username}`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            setPlayList(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getPlaylist();
    }, []);
    const showMore = async (id,nazwa)=>{
        navigate(`/app/playlist/${id}`,{ state: { nazwa: nazwa } });
    }
    const create = async ()=>{
        setCreate(false);
    }
    return (
        <Provider store={store}>
            <div className="fullContainer">
                <div className="xd">
                <div className="card-body">
                    {isCreate ?(
                        <button type="button" className="btn btn-primary" onClick={create}>Create new PlayList</button>
                    ):(
                        <AddPlayList setCreate={setCreate}/>
                    )}
                    <table className="table mb-0">
                        <thead>
                        <tr> <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                {playlistApi.map((plalist)=>(

                    <tr key={plalist} ><th onClick={() => showMore(plalist.id,plalist.name)}>{plalist.name}</th>
                    </tr>
                ))
                }
                        </tbody></table>
                </div>
                <div className="player">
                    <AudioPlayer />
                </div>
                </div></div>
        </Provider>
    );
}

export default PlayList;
