import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updateComment, updatePost } from '../../actions/postActions';
import {useHistory} from 'react-router-dom'

const CommentForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const {user, token} = useSelector(state => state.user);
    const {currentPost, currentComment} = useSelector(state => state.post);

    const [text, setText] = useState(currentComment.text);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateComment(user.id, token, currentPost._id, currentComment._id, text));

        history.push("/dashboard")
    }

    return (
        <form className="max-height d-flex flex-column justify-content-center" onSubmit={handleSubmit}>

            <h3>
                {!currentPost ? "Create Post" : "Edit Post"}
            </h3>

            <div className="mb-3">
                <label className="form-label">Post Text</label>
                <textarea 
                    className="form-control" 
                    placeholder="Enter your comment text..." 
                    value={text} 
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
            </div>

            <button className="btn btn-primary">Submit</button>

        </form>
    )
}

export default CommentForm
