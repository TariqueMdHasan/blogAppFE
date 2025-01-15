import React from 'react'
import {useNavigate} from 'react-router-dom'
// import axios from 'axios'



function Home() {
    const navigate = useNavigate();

// useEffect(() => {
//     const fetchBlog = async() =>{
        
//     }
// })


  return (
    <div>
        <button
            onClick={() => navigate('/Profile')}
        
        >
            Profile
        </button>
    </div>
  )
}

export default Home