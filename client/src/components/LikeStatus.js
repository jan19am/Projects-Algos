import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

const LikeStatus = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [idea, setIdea] = useState({});

    // const [oneIdea, setOneIdea] = useState({});

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/ideas/user/${id}`,
    //     {withCredentials: true})
    //         .then((res) => {
    //             console.log(res.data);
    //             setOneIdea(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/idea/${id}`, 
        {withCredentials: true})
        .then((res) => {
            console.log(res)
            setIdea(res.data)
        }).catch((err) => {
            console.log(err)
        })
    },[id])

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
    <div>
        <div style={{margin: '20px'}}>
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

            <div style={{display: 'flex', marginBottom: '40px'}}>
                <div style={{display: 'flex', marginRight: '20px'}}>
                <Link to={`/users/${idea._id}`}><p style={{marginRight: '10px'}}>{idea.creator?.nickname}</p></Link>
                    <p>says:</p>
                </div>
                <div style={{border: 'solid 2px black', width: '300px', padding: '10px'}}>
                    <p>{idea.message}</p>
                </div>
            </div>

            <div className='col-7'>
                <table className='table table-striped table-bordered border-dark'>
                    <thead>
                        <tr className='bg-secondary'>
                            <th>Nickname</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                        <tbody>
                {
                    idea.likeUsers?.map((user, index) => (
                        <tr key={ index }>
                            <Link className="button" style={{color: 'var(--bs-link-color)'}}to={`/users/${user._id}`}><td>{ user.nickname }</td></Link>
                            <td>{ user.name }</td>
                        </tr>
                    ))
                }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default LikeStatus