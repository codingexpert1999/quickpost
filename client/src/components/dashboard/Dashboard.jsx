import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../actions/postActions'
import Post from './post/Post'

const Dashboard = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user)
    const {posts, loadingPosts} = useSelector(state => state.post);

    const [currentPosts, setCurrentPosts] = useState([])

    useEffect(() => {
        dispatch(fetchPosts(user.id, token));
    }, [])

    useEffect(() => {
        setCurrentPosts(posts);
    }, [posts])

    return (
        <div className="container dashboard">
            {
                loadingPosts &&
                <div className="loading-spinner d-flex align-items-center justify-content-center">
                    <div className="spinner-border"></div>
                    <span>Loading...</span>
                </div>
            }

            {
                !loadingPosts &&
                <div className="card-list">
                    {currentPosts.map((post, index) => (
                        <Post key={post._id} post={post} postIndex={index}/>
                    ))}
                </div>
            }
        </div>
    )
}

export default Dashboard
