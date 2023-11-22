import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import jsf from "./JSIFY.png";

function Register({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [reapPwd, setReapPwd] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Sprawdzenie poprawności danych
        if (password !== reapPwd) {
            setError('Passwords do not match');
            return;
        }

        if (!email.includes('@')) {
            setError('Invalid email address');
            return;
        }

        // Przykładowa walidacja dla loginu (ciągu znaków)
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
            setError('Username should contain only letters and numbers');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                // User is registered successfully
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                // Error registering user
                console.log('Error registering user');
            }
        } catch (error) {
            console.log(await error.text());
        }
    };

    return (
        <section className="vh-100" onScroll={false}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 text-black form-container">
                        <div className="px-5 ms-xl-4">
                            <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                            <img src={jsf} alt="xd" className="logoHe"/>
                        </div>
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>)}
                                <h3 className="fw-normal mb-3 pb-3">Register</h3>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form2Example19"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form2Example19">
                                        Email
                                    </label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="text"
                                        id="form2Example18"
                                        maxLength="20"
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
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form2Example29"
                                        className="form-control form-control-lg"
                                        value={reapPwd}
                                        onChange={(event) => setReapPwd(event.target.value)}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form2Example29">
                                        Reapet Password
                                    </label>
                                </div>
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-info btn-lg btn-block" type="submit">
                                        Register
                                    </button>
                                </div>
                                <p>

                                    <a href="/login" className="link-info">
                                        Login
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

export default Register;