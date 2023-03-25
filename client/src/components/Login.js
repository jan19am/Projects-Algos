import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState('');


    const onSubmitHandler = (e) => {

        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email,
            password
        }, {withCredentials: true})
        .then((res)=> {
            console.log('yay')
            navigate('/lightbulb')
        }).catch((err)=>{
            console.log('in axios')
            console.log('errors', err.response)
            setErrors(err.response.data.errors)

        })
    }

    return (
    <div>
        <div>
            <h1>Login</h1>
            <form style={{width: '200px'}} className='col-6 mx-auto' onSubmit={ onSubmitHandler }>
                <div>
                    <label>Email:</label>
                    <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div>
                    { errors ? <span className='text-danger'>{errors}</span> : null}
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <div>
                    <button type="submit" className='btn btn-info mt-3'>Login</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login