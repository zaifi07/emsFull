import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import { message } from 'antd';

function Login() {
    const navigate = useNavigate();

    const validateGmail = (mail) => {
        const pattern = /^[A-Za-z0-9](?:[A-Za-z0-9._-]{5,29})@gmail\.com$/;
        return pattern.test(mail);
    };

    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('alnasar');
        if (auth) {
            navigate('/home');
        } else if (!alertShown) {
            alert("For Testing Use Email: zaifitest@gmail.com & Password: 123");
            setAlertShown(true);
        }
    }, [alertShown, navigate]);

    const testing = async () => {
        await fetch('/api/v1/login/testing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page: 2, str: "HELLO" }),
        });
    };

    const submission = async () => {
        setLoad(true);
        try {
            if (validateGmail(email)) {
                const userData = { email, password };

                const response = await fetch('/api/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();
                if (response.status === 200) {
                    const { name } = data.dataToSend;
                    const { token } = data;
                    const resultObject = { name, token };

                    if (resultObject) {
                        localStorage.setItem('alnasar', JSON.stringify(resultObject));
                        navigate('/home');
                    } else {
                        message.error("Error in login. Contact for help");
                    }
                } else if (response.status === 401) {
                    message.warning("Credentials didn't match");
                } else {
                    message.warning("User isn't registered!");
                    navigate('/signup');
                }
            } else {
                message.error('Not a valid Gmail');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoad(false);
        }
    };

    return (
        <Layout>
            <div className='login' style={{ border: '1px dashed darkblue' }}>
                {load ? <Loader /> : (
                    <>
                        <h1>Login</h1>
                        <p style={{ textAlign: 'center', padding: '0.3rem 2rem' }}>Emails with gmail.com are valid only</p>
                        <form>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setMail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <br />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <p>No Account? <Link to={'/signup'}>SignUP</Link></p>
                                <br />
                                <button type="button" onClick={submission}>Login</button>
                                <button type="button" onClick={testing}>TEST</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default Login;
