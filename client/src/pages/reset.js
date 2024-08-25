import React from 'react';
import Layout from '../components/layout/layout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from './../components/loader';
import { message } from 'antd';

function Reset() {
    const location = useLocation();
    const navigate = useNavigate();
    const [code, setCode] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [load, setLoad] = React.useState(false);

    // Provide a default value for data if it's null
    const { data } = location.state || {};

    // Functions for the validation of inputs
    function validation(code, password) {
        if (code && password) {
            if (/^\d{6}$/.test(code)) {
                return true;
            } else {
                message.warning("OTP is a 6 digit number");
                return false;
            }
        } else {
            message.warning("Please Fill all the Fields");
            return false;
        }
    }

    async function resendOTP() {
        try {
            setLoad(true)
            const userData = {
                email: data.email
            };
            const response = await fetch('/api/v1/resendOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.status === 200) {
                message.success('OTP has been sent again. Make sure to check Spam box')
            }
            else {
                message.error("Can't resend OTP again. Try later")
            }
        } catch (error) {
            message.error("Can't send OTP Again")
        }
        finally {
            setCode('');
            setPassword('')
            setLoad(false)
        }
    }

    async function submission() {
        try {
            if (validation(code, password)) {
                setLoad(true);
                // Create an object with the data to send
                const userData = {
                    code,
                    password,
                    email: data.email
                };

                const response = await fetch('/api/v1/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.status === 200) {
                    message.success("Password is updated");
                    navigate('/');
                } else if (response.status === 404) {
                    message.error("OTP is Expired, Try Again");
                    navigate('/forgot');
                } else if (response.status === 401) {
                    message.error('Invalid OTP, Try Again');
                } else if (response.status === 505) {
                    message.error("Can't update right now. Contact the Devolper");
                } else {
                    message.error("Contact the Devolper!");
                }
            }
        } catch (error) {
            message.warning("There's an error in registration. Please check your Internet connection and try again.", 5);
        }
        finally {
            setLoad(false);
        }
    }

    return (
        <Layout>
            <div className='login' style={{ border: '1px dashed darkblue', maxWidth: '400px' }}>
                {
                    load ? <Loader /> :
                        data ? (
                            <>
                                <h4 style={{ padding: '03rem 3rem' }}>Reset Password</h4>
                                <p style={{ padding: '0rem 1rem', textAlign: 'center' }}>Enter the OTP sent to {data.email}</p>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        name="code"
                                        placeholder="123456"
                                        value={code}
                                        onChange={(e) => { setCode(e.target.value) }}
                                    />
                                    <label htmlFor="floatingInput">Enter OTP</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    <label htmlFor="floatingPassword">New Password</label>
                                </div>
                                <p style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} onClick={resendOTP}>Resend</p>
                                <Link to={'/'}>Login</Link>
                                <button onClick={submission}>Update</button>
                            </>
                        ) : <p>Data isn't available</p>
                }
            </div>
        </Layout>
    )
}

export default Reset;
