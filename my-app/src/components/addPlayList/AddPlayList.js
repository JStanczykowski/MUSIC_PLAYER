import React, { useEffect, useState } from 'react';
import './AddPlayList.css';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';
import { Provider } from 'react-redux';
import AudioPlayer from '../audioplayer/AudioPlayer';
import jwt_decode from 'jwt-decode';
import api from '../../api/axiosConfig';

function AddPlayList({setCreate}) {
    const navigate = useNavigate();
    const [playlistApi, setPlayList] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const [name, setName] = useState('');

    const CreatePlayList = async () => {
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

            } else {

                console.log('Error create playlist');
            }
        } catch (error) {
            console.log(await error.text());
        }
    };


    return (
          <div>
              <form onSubmit={CreatePlayList}>
                  <div className="form-group3">
                      <label htmlFor="exampleInputEmail1">Create new PlayList</label>
                      <input className="form-control form-control-sm" type="text" placeholder="Enter name"
                      value={name}
                             onChange={(e) => setName(e.target.value)}/>
                          <small id="emailHelp" className="form-text text-muted">Make sure the name means something to you.</small>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </form>
          </div>
    );
}

export default AddPlayList;
