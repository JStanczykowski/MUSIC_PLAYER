import React from 'react';
import "./AdminPanel.css";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const AdminPanel =()=>{
    const navigate = useNavigate();
    const uzytkownicy = async (event)=>{

        navigate("/admin/users");
    }
    const music = async (event)=>{

        navigate("/admin/music");
    }
    const addmusic = async (event)=>{

        navigate("/admin/add");
    }
    const message = async (event)=>{

        navigate("/admin/message");
    }
    const back =async()=>{
        localStorage.removeItem('accessToken');
        navigate('/login');
        window.location.reload();
    }
    return(
        <div className="xd">
            <ArrowBackIcon onClick={()=>{
                back();
            }}/>

    <div className="container-fluid h-100">
            <div className="row h-50">
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary"
                    onClick={()=>{
                        uzytkownicy();
                    }}>Użytkownicy</button>
                </div>
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary"
                    onClick={()=>{
                        music();
                    }}>Muzyka i komentarze</button>
                </div>
            </div>
            <div className="row h-50">
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary"
                            onClick={()=>{
                                addmusic();
                            }}>Add music</button>
                </div>
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary"
                            onClick={()=>{
                                message();
                            }}>Wiadomości</button>
                </div>
            </div>
        </div></div>
    )
}
export default AdminPanel;