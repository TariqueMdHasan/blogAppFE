import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('authToken')
                // console.log('token:', token)
                if (!token) {
                    setError('no token found')
                    return
                }
                const response = await axios.get('http://localhost:8000/api/auth/getUser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                setUserName(response.data.user.userName)
                setEmail(response.data.user.email)
                setName(response.data.user.name)

            } catch (error) {
                console.log('Error fetching data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    const handleLogout = () => {
        try{
            localStorage.removeItem('authToken')
            alert('logout sucessfully')
            console.log('logout successfully')
            navigate('/')
        }catch(error){
            console.error('error while logout', error.message)
            alert('error in logout')
        }
    }

    return (
        <div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <p>{name}</p>
                        <p>@ {userName}</p>
                        <p>{email}</p>
                    </>
                )}
            </div>
            <div>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile