import React, { useEffect, useState } from 'react';
import SearchBar from "../searchBar/SearchBar";
import TextField from "@mui/material/TextField";
import { Provider } from 'react-redux';
import store from "../store/store";
import AudioPlayer from "../adioplayer/AudioPlayer";
import api from "../../api/axiosConfig";
import { useSelector } from 'react-redux';
import ProfileComponent from "../profilecomponent/ProfileComponent";
import jwt_decode from "jwt-decode";
const SearchScreen =()=>{
    const audioPlayerRef = store.getState().audioPlayerRef;
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    console.log(audioPlayerRef);
    const getMusic = async () => {
        try {
            const response = await api.get("/api/v1/music",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });

            const musicData = response.data.map((item) => ({
                tytul: item.artysta+" - "+item.tytul,
            }));

            setData(musicData.filter((d) => typeof d.tytul === 'string' && d.tytul.toLowerCase().includes(searchQuery)));

        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        getMusic();
    }, [searchQuery]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    return(

            <div className="fullContainer"><ProfileComponent name={username}/>
                <div className="xd">

                    <div className="search">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
                    <div style={{ padding: 3 }}>
                        {data.map((d) => (
                            <div
                                className="text"
                                style={{
                                    padding: 5,
                                    justifyContent: "normal",
                                    fontSize: 20,
                                    color: "blue",
                                    margin: 1,
                                    width: "250px",
                                    BorderColor: "green",
                                    borderWidth: "10px"
                                }}
                                key={d.id}
                            >
                                <div>{d.tytul}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="player">
                    {/*<AudioPlayer ref={audioPlayerRef}/>*/}
                </div>
            </div>

    )
};

export default SearchScreen;
