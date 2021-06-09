import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { createComment, deletePost, setCurrentPost } from '../../../actions/postActions';
import Comment from '../comment/Comment'

const Post = ({post, postIndex}) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const {user, token} = useSelector(state => state.user);

    const createdByMe = user.id === post.user._id;

    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentText, setCommentText] = useState("")

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(createComment(user.id, token, post._id, commentText));

        setShowCommentForm(false);
    }

    return (
        <div className="card mb-5">
            <div className="card-body">
                <div className="card-header mb-2">
                    <h3 className="mb-3">Post #{postIndex + 1}</h3>

                    {
                        createdByMe &&
                        <div className="buttons">
                            <button className="btn btn-secondary" onClick={() => {
                                dispatch(setCurrentPost(post));
                                history.push(`/post/${post._id}`)
                            }}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-danger" onClick={() => {
                                let confirm = window.confirm("Are you sure you want to delete this post?")

                                if(confirm){
                                    dispatch(deletePost(user.id, token, post._id))
                                }
                            }}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    }
                </div>

                <strong className="badge bg-dark mb-2">{post.user.username}</strong>
                <p>
                    {post.text}
                </p>

                <hr />

                {
                    post.comments.length > 0 &&
                    <div className="card-list">
                        <h3 className="mb-3">Comments</h3>
                        
                        {post.comments.map(comment => (
                            <Comment key={comment._id} comment={comment} post={post} />
                        ))}
                    </div>
                }

                {!showCommentForm && <button className="btn btn-primary" onClick={() => setShowCommentForm(true)}>Comment</button>}

                {
                    showCommentForm &&
                    <form onSubmit={handleSubmit} className="comment-form">
                        <div className="mb-3">
                            <label className="form-label">Text</label>
                            <textarea 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your comment here..."
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button className="btn btn-primary" type="submit">Submit</button>
                        <button className="btn btn-secondary" onClick={() => setShowCommentForm(false)}>Cancel</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default Post
