import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'

const LoginRegistration = () => {


    const navigate = useNavigate()


    return (
    <div>
        <div className='navbar_wrapper'>
            <div style={{display: 'flex', justifyContent: 'space-around'}} className='top-navbar'>
                <h1>Welcome</h1>
                <h1>To</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}className='bottom-navbar'>
                <h1>Lightbulb</h1>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}} className='container'>
            <Register/>
            <Login/>
        </div>
    </div>
    )
}

export default LoginRegistration