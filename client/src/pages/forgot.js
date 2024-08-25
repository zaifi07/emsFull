import React from 'react'
import Layout from '../components/layout/layout'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import { message } from 'antd';
function Forgot() {
    function validateGmail(mail) {
        const pattern = /^[A-Za-z0-9](?:[A-Za-z0-9._-]{5,29})@gmail\.com$/;
        if (pattern.test(mail)) {
            return true; // Valid 
        } else {
            return false; // Invalid 
        }
    }

    const [load, setLoad] = React.useState(false);
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')

    const verification = async () => {
        try {
            if (validateGmail(email)) {
                const data = {
                    email,
                }
                setLoad(true)
                const response = await fetch(`/api/v1/forgot`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                // const result = await response.json()
                if (response.status === 404) {
                    message.error("User isn't registered. Signup First");
                    navigate('/signup')
                }
                else if (response.status === 200) {
                    message.info("OTP has been sent to provided gmail. It will expire within 5 minutes. Make sure to check spam box!", 7)
                    navigate('/reset', { state: { data: data } });
                }

                else if (response.status === 505) {
                    message.error("Error in Registeration. Contact Devolper")
                    // console.log(result);
                }
            }
            else {
                message.warning("Email isn't valid");
            }

        } catch (error) {
            message.error("Contact Devolper!")
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
                            <h3 style={{ marginTop: '1rem', }}>Reset Password</h3>
                            <p style={{ textAlign: 'center', padding: '1rem' }}>Enter Your Email</p>
                            <p style={{ textAlign: 'center', padding: '0.3rem 2rem' }}>Emails with gmail.com are valid only</p>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <Link to={'/'}>Login</Link>
                            <button onClick={verification}>Verify</button>
                        </>
                }
            </div>
        </Layout>
    )
}

export default Forgot

