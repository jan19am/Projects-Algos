import React, { useState, useEffect } from "react";
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from "axios";

const UserProfile = (props) => {

    const{ id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`,
        {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
            axios.get(`http://localhost:8000/api/ideas/user/${id}`,
        {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                setIdeas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const logout = (e) => {
        axios.get('http://localhost:8000/api/logout',
        {withCredentials: true})
        .then((res) => {
            navigate('/main')
            console.log('logged out')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
    <div style={{margin: '40px'}}>
        <div style={{display: 'flex', marginBottom: '40px', justifyContent: 'flex-end'}}>
            <div style={{display: 'flex'}}>
                <div style={{marginRight: '10px'}}>
                    <Link to={'/lightbulb'}>Lightbulb</Link>
                </div>
                <div>
                    <button className='button' onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
        <div>
            <p>Name: {user.name}</p>
            <p>Nickname: {user.nickname}</p>
            <p>Email: {user.email}</p>
        </div>
        <div style={{borderBottom: 'solid 2px #1f1f77', width: '500px'}}></div>
        <div>
            <p>Total Posts: {ideas.length}</p>
        </div>
    </div>
    )
}

export default UserProfile