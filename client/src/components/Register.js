import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {


    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState({});



    const onSubmitHandler = (e) => {

        e.preventDefault();

        axios.post('http://localhost:8000/api/register', {
            name,
            nickname,
            email,
            password,
            confirmPassword
        }, {withCredentials: true})
        .then((res)=> {
            navigate('/lightbulb')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
    <div>
        <div>
            <div>
                <h1>Please Register Here</h1>

                <form style={{width: '360px'}} className='col-6 mx-auto' onSubmit={ onSubmitHandler }>
                    <div>
                        <label>Name:</label>
                        <input type="text" className='form-control' onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <div>
                        { errors.name ? <span className='text-danger'>{errors.name.message}</span> : null}
                    </div>

                    <div>
                        <label>Nickname:</label>
                        <input type="text" className='form-control' onChange={(e) => setNickname(e.target.value)}></input>
                    </div>

                    <div>
                        { errors.nickname ? <span className='text-danger'>{errors.nickname.message}</span> : null}
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div>
                        { errors.email ? <span className='text-danger'>{errors.email.message}</span> : null}
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <div>
                        { errors.password ? <span className='text-danger'>{errors.password.message}</span> : null}
                    </div>

                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" className='form-control' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>

                    <div>
                        { errors.confirmPassword ? <span className='text-danger'>{errors.confirmPassword.message}</span> : null}
                    </div>

                    <div>
                        <button type="submit" className='btn btn-info mt-3'>Register</button>
                    </div>
                </form>
            </div>
            
            </div>
        </div>
    )
}

export default Register