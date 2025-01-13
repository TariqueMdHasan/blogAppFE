// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// function Profile() {
//     const navigate = useNavigate()
//     const [name, setName] = useState('')
//     const [userName, setUserName] = useState('')
//     const [email, setEmail] = useState('')
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true)
//                 const token = localStorage.getItem('authToken')
              
//                 if (!token) {
//                     setError('no token found')
//                     return
//                 }
//                 const response = await axios.get('http://localhost:8000/api/auth/getUser', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 console.log(response.data)
//                 setUserName(response.data.user.userName)
//                 setEmail(response.data.user.email)
//                 setName(response.data.user.name)

//             } catch (error) {
//                 console.log('Error fetching data', error)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchData();
//     }, [])

//     const handleLogout = () => {
//         try{
//             localStorage.removeItem('authToken')
//             alert('logout sucessfully')
//             console.log('logout successfully')
//             navigate('/')
//         }catch(error){
//             console.error('error while logout', error.message)
//             alert('error in logout')
//         }
//     }

//     return (
//         <div>
//             <div>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : error ? (
//                     <p>{error}</p>
//                 ) : (
//                     <>
//                         <p>{name}</p>
//                         <p>@ {userName}</p>
//                         <p>{email}</p>
//                     </>
//                 )}
//             </div>
//             <div>
//                 <button onClick={handleLogout}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Profile










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    // Fetch user data including the profile picture
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError('No token found');
                    return;
                }
                const response = await axios.get('http://localhost:8000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserName(response.data.userName);
                setEmail(response.data.email);
                setName(response.data.name);
                setProfilePicture(response.data.profilePicture || 'uploads/default-profile.jpg');
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload profile picture
    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Authentication token not found');
                return;
            }

            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await axios.post(
                'http://localhost:8000/api/auth/profile/upload',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setProfilePicture(response.data.profilePicture);
            alert('Profile picture updated successfully');
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            alert('Error uploading profile picture');
        }
    };

    // Logout handler
    const handleLogout = () => {
        try {
            localStorage.removeItem('authToken');
            alert('Logout successfully');
            navigate('/');
        } catch (error) {
            console.error('Error while logout:', error.message);
            alert('Error in logout');
        }
    };

    return (
        <div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <img
                            src={`http://localhost:8000/${profilePicture}`}
                            alt="Profile"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                        <p>{name}</p>
                        <p>@ {userName}</p>
                        <p>{email}</p>
                    </>
                )}
            </div>
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
