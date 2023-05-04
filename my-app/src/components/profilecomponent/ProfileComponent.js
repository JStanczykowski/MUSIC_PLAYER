import React, { useEffect, useState } from "react";
import "./ProfileComponent.css"
import DropdownButton from "react-bootstrap/DropdownButton";
import {FaPlusCircle} from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import prof from "../../musicElement/png/img_1.png";
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import {Alert, AlertTitle, Modal} from "@mui/material";
import ProfileInfo from "../profileinfo/ProfileInfo";
const ProfileComponent =(props)=>{
    const navigate = useNavigate();
    const logOut = async (event)=>{
        localStorage.removeItem('accessToken');
        navigate('/login');
        window.location.reload();

    }
    const wsparcie = async (event)=>{

        navigate('/app/message');


    }
    const profile = async (event)=>{

        navigate(`/app/${props.name}`);


    }

    return(
        <div className="profile">
            <img src={prof} className="profProfil" alt="alt"/>
            <NavDropdown
                id="nav-dropdown-dark-example"
                menuVariant="dark"
                title={props.name}
            className="navdropProf">
                <NavDropdown.Item onClick={()=>{
                    profile()
                }}>Profil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Ustawienia
                </NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{
                    wsparcie()
                }}>Wsparcia</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {
                    logOut()
                }}>
                    Wyloguj
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}

export default ProfileComponent;