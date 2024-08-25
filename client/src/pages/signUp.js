import React from 'react'
import Layout from '../components/layout/layout'
import { Link, useNavigate } from 'react-router-dom';
import Loader from './../components/loader';
import { message } from 'antd';


function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = React.useState('');
    const [email, setMail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [retypePassword, setRetypePassword] = React.useState('');
    const [load, setLoad] = React.useState(false);

    React.useEffect(() => {
        const auth = localStorage.getItem('alnasar');
        if (auth) {
            navigate('/home')
        }
    })

    //Functions for the validation of inputs;

    function validateRetypePassword() {
        return password === retypePassword;
    }

    function validateGmail(mail) {
        const pattern = /^[A-Za-z0-9](?:[A-Za-z0-9._-]{5,29})@gmail\.com$/;
        if (pattern.test(mail)) {
            return true; // Valid 
        } else {
            return false; // Invalid 
        }
    }

    function validation(name, email, password, retypePassword) {
        if (name && email && password && retypePassword) {
            if (validateGmail(email)) {
                if (validateRetypePassword()) {
                    return true;
                } else {
                    message.error("Passwords do not match");
                }
            } else {
                message.error("Email isn't valid");
            }
        } else {
            message.warning("Please Fill all the Fields");
            return false;
        }
    }



    async function submission() {
        try {
            if (validation(name, email, password, retypePassword)) {
                setLoad(true)
                // Create an object with the data to send
                const userData = {
                    name,
                    email,
                    password,
                };

                const response = await fetch('/api/v1/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.status === 303) {
                    message.warning("User is Already Registered. Log in your Account");
                    navigate('/')
                }
                else if (response.status === 200) {
                    message.success('Your Account has been registered. Login and Enjoy!')
                    navigate('/')
                }
                else if (response.status === 505) {
                    message.error("Error in Registeration")
                }
                else {
                    message.error("Can't Register right Now")
                }
            }


        } catch (error) {
            // console.error('Error:', error);
            message.error("There's an error in registeration. Please check your Internet connection and try Again. Else contact the devolper", 10)
        }
        finally {
            setLoad(false)
        }
    }


    return (
        <Layout>

            <div className='login' style={{ border: '1px dashed darkblue' }}>
                {
                    load ? <Loader /> :
                        <>
                            <h1>Sign Up</h1>
                            <p style={{ textAlign: 'center', padding: '0.3rem 3rem' }}>Emails with gmail.com are valid only</p>
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        name="name"
                                        placeholder="John"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingEmailInput"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        value={email}
                                        onChange={(e) => { setMail(e.target.value) }}
                                    />
                                    <label htmlFor="floatingEmailInput">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingRetypePassword"
                                        name="retypePassword"
                                        placeholder="Retype Password"
                                        value={retypePassword}
                                        onChange={(e) => { setRetypePassword(e.target.value) }}
                                    />
                                    <label htmlFor="floatingRetypePassword">Retype Password</label>
                                </div>
                            </form>
                            <p>Alreay has account? <Link to={'/'}>Login</Link></p>
                            <button onClick={submission}>Register</button>
                        </>}
            </div>
        </Layout>
    )
}

export default SignUp
