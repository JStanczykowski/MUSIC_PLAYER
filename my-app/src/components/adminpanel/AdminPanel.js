import React from 'react';
import "./AdminPanel.css";
import {useNavigate} from "react-router-dom";
const AdminPanel =()=>{
    const navigate = useNavigate();
    const uzytkownicy = async (event)=>{

        navigate("/admin/users");
    }
    return(
        <div className="xd">
        <button className="btn btn-primary">back</button>

    <div className="container-fluid h-100">
            <div className="row h-50">
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary"
                    onClick={()=>{
                        uzytkownicy();
                    }}>Użytkownicy</button>
                </div>
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary">Muzyka</button>
                </div>
            </div>
            <div className="row h-50">
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary">Komentarze</button>
                </div>
                <div className="col-sm-6 d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary">Wiadomości</button>
                </div>
            </div>
        </div></div>
    )
}
export default AdminPanel;