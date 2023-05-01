import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import jwt_decode from 'jwt-decode';
import jsf from "./JSIFY.png";
function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const admin = ['ROLE_ADMIN'];
                localStorage.setItem('accessToken', data.accessToken);
                const token = localStorage.getItem('accessToken');
                const decodedToken = jwt_decode(data.accessToken);
                if (data.roles && Array.isArray(data.roles)) {
                        if(admin.every(role => data.roles.includes(role))){
                            console.log("zgadza sie")
                            setIsLoggedIn(true);
                            navigate('/admin');
                        }
                    else{
                            setIsLoggedIn(true);
                            navigate('/app');
                        }


                }


            } else {
                console.log('Login failed.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    const reg = async (event)=>{
        navigate('/register');
    }
    return (
        <section className="vh-100" onScroll="false">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 text-black form-container">
                        <div className="px-5 ms-xl-4">
                            <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                          <img src={jsf} alt="xd" className="logoHe"/>
                        </div>
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                           <form onSubmit={handleSubmit}>
                                <h3 className="fw-normal mb-3 pb-3">Log in</h3>
                                <div className="form-outline mb-4">
                                    <input
                                        type="username"
                                        id="form2Example18"
                                        className="form-control form-control-lg"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form2Example18">
                                        UserName
                                    </label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form2Example28"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form2Example28">
                                        Password
                                    </label>
                                </div>
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-info btn-lg btn-block" type="submit">
                                        Login
                                    </button>
                                </div>
                                <p className="small mb-5 pb-lg-2">
                                    <a className="text-muted" href="#!">
                                        Forgot password?
                                    </a>
                                </p>
                                <p>
                                    Don't have an account?{" "}
                                    <a className="link-info" onClick={reg}>
                                        Register here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block img-container">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                            alt="Login image"
                            className="w-100 vh-100"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;