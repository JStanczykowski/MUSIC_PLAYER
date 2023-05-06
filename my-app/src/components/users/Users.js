import React, {useEffect, useState} from "react";
import api from "../../api/axiosConfig";
import "./xd2.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
const Users = () =>{
    const [users,setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await api.get("api/auth/user",{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                } });
            console.log(response.data)
            setUsers(response.data);

        } catch (error) {
            console.log('Error:', error);
        }
    };
    const active = async (username) => {
        try {
            const response = await api.put(`/api/auth/user/active/${username}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            if (response.status === 200) {
                console.log("success set ");
                window.location.reload();
            } else {
                console.log('Error delete playlist');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const block = async (username) => {
        try {
            const response = await api.put(`/api/auth/user/unactive/${username}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            if (response.status === 200) {
                console.log("success set ");
                window.location.reload();
            } else {
                console.log('Error delete playlist');
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUsers();

    }, []);
    const navigate = useNavigate();
    const back =async()=>{
       navigate('/admin');
    }
    return(
        <div className="xd2" ><div className="container2">
            <ArrowBackIcon onClick={()=>{
                back();
            }}/>
            <table className="table table-bordered table-dark">
                <thead>
                <tr>
                    <th scope="col">ObjectId</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Role</th>
                    <th scope="col">isActive</th>
                    <th scope="col">Block</th>
                    <th scope="col">Active</th>
                </tr>
                </thead>
                <tbody>

                    {users.map((user)=>{
                        return(   <tr>
                            <th scope="row" key={user}>{user.id}</th>
                        <td key={user}>{user.username}</td>
                        <td key={user}>{user.roles.map((role)=>{
                            return(
                                <p>{role.name}</p>
                            )
                        })}</td>
                        <td key={user}>{user.active.toString()}</td>
                        <td>
                            <button type="button" className="btn btn-danger"
                            onClick={()=>{
                                block(user.username);
                            }}>set Block</button>
                          </td>
                        <td>   <button type="button" className="btn btn-success"
                                       onClick={()=>{
                                           active(user.username);
                                       }}>set Active</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table></div>
        </div>
    )
}

export default Users;