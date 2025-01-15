

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()
    // name, username, email, password
    const [loading, setLoading] = useState(false)
    // const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (e) => {
        // prevent default behavior
        // check everything if user entered every field or not
        // save all data in a constant
        // try catch
        // loading
        // send data to the backend (use axios) in save it in const response
        // check if response.status(200) is true then return alert success and navigate to the main page
        // if failed then alert failed message
        // catch 
        // finally set loading false

        e.preventDefault();
       if (!userName) {
            alert('Please enter User Name')
            return
        } else if (!password) {
            alert('Please enter Password')
            return
        } else if (!email) {
            alert('Please enter Email')
            return
        }

        const userData = {
            userName: userName,
            password: password,
            email: email
        }

        try {
            setLoading(true)

            const response = await axios.post('https://blogappbe-ol6g.onrender.com/api/auth/login', userData)
            if (response.status === 200) {
                alert('Login successful')
                localStorage.setItem('authToken', response.data.token)
                // navigate('/Login')
                navigate('/Home')
            } else {
                alert('Login failed')
            }
        } catch (error) {
            console.error('Error Login user', error.message)
            alert('An error occured during Login')
        } finally {
            setLoading(false)
        }




    }


    return (
        <div>
            <h1>Login</h1>
            <button
                onClick={() => navigate('/Register')}
            >
                Register
            </button>
            <button
                onClick={() => navigate('/')}
            >
                Landing
            </button>
            <div>

                <form >
                    <label htmlFor="reg-userName">User Name</label>
                    <input
                        type="text"
                        id="reg-userName"
                        placeholder='userName'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    /> <br />
                    <label htmlFor="reg-Email">Email</label>
                    <input
                        type="email"
                        id="reg-Email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br />
                    <label htmlFor="reg-Password">Password</label>
                    <input
                        type="password"
                        id="reg-Password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br />
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {
                            loading ? 'Please wait...' : 'Login'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login