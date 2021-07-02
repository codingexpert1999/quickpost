import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { deleteComment, setCurrentComment, setCurrentPost } from '../../../actions/postActions';

const Comment = ({post, comment}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {user, token} = useSelector(state => state.user)

    console.log( comment.user._id, user.id)

    const createdByMe = user.id === comment.user._id;

    return (
        <div className="card mb-3">
            <div className="card-body">
                <strong className="badge bg-dark mb-2">testuser</strong>
                <p>{comment.text}</p>

                {
                    createdByMe &&
                    <>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => {
                                dispatch(setCurrentPost(post))
                                dispatch(setCurrentComment(comment))
                                history.push(`/comment/${comment._id}`);
                            }}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button 
                            className="btn btn-danger"
                            onClick={() => {
                                let confirm = window.confirm("Are you sure you want to delete this comment?");

                                if(confirm){
                                    dispatch(deleteComment(user.id, token, post._id, comment._id));
                                }
                            }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Comment
