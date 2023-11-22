import React, { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Provider } from 'react-redux';
import store from "../store/store";
import AudioPlayer from "../audioplayer/AudioPlayer";

const SearchBar =({setSearchQuery})=>{

    return(

                 <div className="input-group">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"  id="search-bar"
                       onInput={(e) => {
                           setSearchQuery(e.target.value);
                       }}
                   aria-describedby="search-addon"/>
            <span className="input-group-text border-0" id="search-addon">
             <i className="fas fa-search"></i>
            </span>
        </div>

    )
}
export default SearchBar;