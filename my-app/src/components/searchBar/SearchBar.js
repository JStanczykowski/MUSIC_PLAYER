import React, { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Provider } from 'react-redux';
import store from "../store/store";
import AudioPlayer from "../adioplayer/AudioPlayer";

const SearchBar =({setSearchQuery})=>{

    return(
                    <form>
                        <TextField
                            id="search-bar"
                            className="text"
                            onInput={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            label="Enter what you search"
                            variant="outlined"
                            placeholder="Search..."
                            size="mid"
                        />
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon style={{ fill: "blue" }} />
                        </IconButton>
                    </form>
    )
}
export default SearchBar;