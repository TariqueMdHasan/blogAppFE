import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
    const navigate = useNavigate()
  return (
    <div>
    <h1>landing</h1>
    <button 
        onClick={() => navigate('/Register')}
    >
        Register
    </button>
    <button
        onClick={() => navigate('/Login')}
    >
        Login
    </button>
    </div>
  )
}

export default Landing