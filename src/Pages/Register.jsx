import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const navigate = useNavigate()
    // name, username, email, password
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegister = async(e) =>{
        // prevent default behavior
        // check everything if user entered every field or not
        // save all data in a constant
        // try catch
        // loading
        // send data to the backend (use axios) in save it in const response
        // check if response.status(200) is true then return alert success and navigate to the login page
        // if failed then alert failed message
        // catch 
        // finally set loading false

        e.preventDefault();
        if(!userName && !name && !email && !password){
            alert('please enter all field')
            return
        }else if(!userName ){
            alert('Please enter User Name')
            return
        }else if(!name ){
            alert('Please enter name')
            return
        }else if(!password ){
            alert('Please enter Password')
            return
        }else if(!email ){
            alert('Please enter Email')
            return
        }
        // will see later if confirm password is needed or not
        // else if(password !== confirmPassword){
        //     toast.error('Passwords do not match')
        //     return
        // }

        const userData = {
            userName: userName,
            name: name,
            password: password,
            email: email
        }

        try{
            setLoading(true)

            const response = await axios.post('http://localhost:8000/api/auth/register', userData)
            if(response.status===200){
                alert('Registration successful')
                navigate('/Login')
            }else{
                alert('Registration failed')
            }
        }catch(error){
            console.error('Error registering user', error)
            alert('An error occured during registration')
        }finally{
            setLoading(false)
        }




    }


    return (
        <div>
            <div>
                <h1>Register</h1>
                <button
                    onClick={() => navigate('/')}
                >
                    Landing
                </button>
                <button
                    onClick={() => navigate('/Login')}
                >
                    Login
                </button>
            </div>
            <div>

                <form >
                    <label htmlFor="reg-Name">Name</label>
                    <input
                        type="text"
                        id="reg-Name"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> <br />
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
                    onClick={handleRegister}
                    disabled={loading}
                    >
                        {
                            loading? 'Please wait...': 'Regisrer'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register