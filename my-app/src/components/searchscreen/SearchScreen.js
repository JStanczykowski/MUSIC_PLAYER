import React, { useEffect, useState } from 'react';
import store from "../store/store";
import api from "../../api/axiosConfig";
import jwt_decode from "jwt-decode";
import "./searchscreem.css";
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
    const [selectedGenre, setSelectedGenre] = useState('');
    const [response, setResponse] = useState(null);
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSubmit = async (event) => {
        try {
            const response = await api.get("/api/v1/music/getMusicByGenre?genres=rap&genres=pop",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });

            const data = await response.json();

            // Przetwarzanie odpowiedzi z API
            setResponse(data);

        } catch (error) {
            console.log('Error:', error);
        }
    }
    return(

            <div className="searchScreenMain">
                    <form className="searchScreenMain" onSubmit={handleSubmit} >
                        <label>
                            Wybierz gatunek muzyki:
                            <select value={selectedGenre} onChange={handleGenreChange}>
                                <option value="">Wybierz...</option>
                                <option value="rock">Rock</option>
                                <option value="pop">Pop</option>
                                <option value="hip-hop">Hip Hop</option>
                                {/* Dodaj więcej opcji według potrzeb */}
                            </select>
                        </label>
                        <button type="submit">Wyślij</button>
                    </form>
            </div>
    // {/*    {response && (*/}
    // {/*        <div>*/}
    // {/*            <h2>Odpowiedź z API:</h2>*/}
    // {/*            <pre>{JSON.stringify(response, null, 2)}</pre>*/}
    // {/*            /!* Wyświetl odpowiedź z API *!/*/}
    // {/*        </div>*/}
    // {/*    )}*/}
    // {/*    <div className="search">*/}
    // {/*        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />*/}
    // {/*    </div>*/}
    // {/*    <div style={{ padding: 3 }}>*/}
    // {/*        {data.map((d) => (*/}
    // {/*            <div*/}
    // {/*                className="text"*/}
    // {/*                style={{*/}
    // {/*                    padding: 5,*/}
    // {/*                    justifyContent: "normal",*/}
    // {/*                    fontSize: 20,*/}
    // {/*                    color: "blue",*/}
    // {/*                    margin: 1,*/}
    // {/*                    width: "250px",*/}
    // {/*                    BorderColor: "green",*/}
    // {/*                    borderWidth: "10px"*/}
    // {/*                }}*/}
    // {/*                key={d.id}*/}
    // {/*            >*/}
    // {/*                <div>{d.tytul}</div>*/}
    // {/*            </div>*/}
    // {/*        ))}*/}
    // {/*    </div>*/}
    // {/*    <midSide/>*/}
    // {/*</div>*/}
    // {/*<div className="player">*/}
    // {/*    /!*<AudioPlayer ref={audioPlayerRef}/>*!/*/}
    // {/*</div>*/}


    )
};

export default SearchScreen;
