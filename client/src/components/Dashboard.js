import React, { useState, useEffect } from 'react'
import {  useNavigate, Link } from 'react-router-dom'
import axios from 'axios'



const Dashboard = () => {

    const [user, setUser] = useState({});

    const [message, setMessage] = useState('');

    const [list, setList] = useState([]);

    const navigate = useNavigate();

// Count for the Like button
    const incrementCount = (id) => {
        axios.get(`http://localhost:8000/api/likepost/${id}`, {withCredentials: true})
        .then((res) => {
            setList(list.map((idea) => {
                if (idea._id == res.data._id)
                {
                    return res.data
                }
                return idea
            }))
        }).catch((err) =>{
            console.log(err)
        })
    };


    //Welcome User 
    useEffect(() => {
        axios.get('http://localhost:8000/api/user',
        {withCredentials: true})
        .then((res) => {
            console.log(res)
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        })
    },[])

// Delete
    const deletePost = (id) => {
        axios.delete(`http://localhost:8000/api/delete/${id}`,
        {withCredentials: true})
        .then((res) => {
            console.log(res.data);
            const newList = list.filter((idea, index) => idea._id !== id)
            setList(newList)
        })
        .catch((err) => {
            console.log(err);
        });
};

    // List of ideas
    useEffect(() => {
        axios.get('http://localhost:8000/api/ideas', 
        {withCredentials: true})
        .then((res) => {
            console.log(res.data)
            setList(res.data.idea)
        }).catch((err) => {
            console.log(err)
    });
    },[]);

    // Logout Link
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

// Post Idea
    const onSubmitHandler = (e) => {

        e.preventDefault();

        axios.post('http://localhost:8000/api/idea', {
            message
        },{withCredentials: true})
        .then((res) => {
            console.log(res)
            setList([...list,res.data.idea]);
            setMessage('')
        }).catch ((err) => {
            console.log(err)
        });
    };

    return (
    <div>
        <div style={{margin: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Welcome {user.nickname}!</h1>
                <button className='button' onClick={logout}>Logout</button>
            </div>
            <div>
                <form onSubmit={ onSubmitHandler }>
                    <div className='col-6 mx-auto' style={{display: 'flex', justifyContent: 'space-around'}}>
                        <div>
                            <input style={{width: '250px'}} className='form-control' type="text" value={ message } placeholder='Write Your Amazing Ideas Here'  onChange={(e) => setMessage(e.target.value)} />
                        </div>

                        <div style={{marginBottom: '40px'}}>
                            <button type='submit' className='btn btn-primary'>Post</button>
                        </div>
                    </div>
                </form>
                <div className='mx-auto'>
                    {
                        list.map((idea, index) => (
                            <div key={ index } style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div style={{display: 'flex', marginBottom: '20px', width: '500px'}}>
                                    <div style={{display: 'flex' }}>
                                        <Link style={{marginRight: '10px', width: '50px'}} to={`/users/${idea.creator._id}`}>{idea.creator.nickname}</Link>
                                        <p style={{marginRight: '10px'}}>says:</p>
                                    </div>
                                    <div style={{border: 'solid 2px black', width: '300px', padding: '10px'}}>
                                        <p>{idea.message}</p>
                                    </div>
                                    {
                                        user._id == idea.creator._id ?
                                        <div>
                                            <button className="btn btn-danger m-2"  onClick={() => deletePost(idea._id)}>delete</button>
                                        </div>
                                        : null
                                    }
                                    </div>
                                <div style={{display: 'flex', justifyContent: 'space-evenly', marginBottom: '40px'}}>
                                    <div style={{marginRight: '10px'}}>
                                        <button className='button' onClick={() => incrementCount(idea._id)}>Like</button>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <Link style={{marginRight: '10px'}} to={`/lightbulb/${idea._id}`}> {idea.likeUsers.length}people</Link>
                                        <p>liked this.</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>    
    </div>
    )
}

export default Dashboard