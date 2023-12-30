import React from "react";
import ProfileComponent from "../profilecomponent/ProfileComponent";
import "./ProfileInfo.css";
import { BiSolidEdit } from "react-icons/bi";
import { FaSquareFacebook,FaLinkedin,FaTiktok  } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";

import jwt_decode from "jwt-decode";
const ProfileInfo = () => {
    const email = localStorage.getItem('emailUser');

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    return (
        <div className="fullContainer">
            <ProfileComponent name={username} />
            <div className="xd">
                <div className="container-profile">
                    <div className="left-side-profile">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                             alt="Avatar" className="img-fluid my-5" id="avatar-profil" />
                        <h1 className="username-text">{username}</h1>
                        <h2 className="username-edit-icon"><BiSolidEdit/></h2>
                    </div>
                    <div className="right-side-profile">
                        <h1 className="information-text">Information</h1>
                        <hr/>
                        <div className="email-content-profile">
                        <h2>Email</h2>
                            <p className="email-paragraph">{email}</p>
                        </div>
                        <h1 className="information-text">Social media</h1>
                        <hr/>
                        <div className="email-content-profile">
                            <div className="social-context">
                                <FaSquareFacebook className="icon-solo"/>
                                <GrInstagram className="icon-solo"/>
                                <FaLinkedin className="icon-solo"/>
                                <FaTiktok className="icon-solo"/></div>
                        </div>
                        </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
