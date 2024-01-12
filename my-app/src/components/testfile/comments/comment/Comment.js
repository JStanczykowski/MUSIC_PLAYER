import avatar from "../../avatar.png";
import CommentForm from "../CommentForm";
import {createCommentApi} from "../comments";
import {useState} from "react";
import "../comments.css";
import jwt_decode from "jwt-decode";

const Comment = ({ comment, replies,currentUserId,deleteComment,activeComment,setActiveComment,addComment,parentId= null ,updateComment}) => {
    const fiveMinutes = 300000;
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwt_decode(token);
    const username = decodedToken.sub;
    const isAdmin = username === 'admin'; // Sprawdzenie czy użytkownik to admin

    const timePassed = new Date() - new Date(comment.createAt)>fiveMinutes;
    const canReply = Boolean(currentUserId);
    const canEdit = (currentUserId === comment.owner && !timePassed) || isAdmin;
    const canDelete = (currentUserId === comment.owner && !timePassed) || isAdmin;
    const createAt = new Date(comment.createAt).toLocaleDateString();
    const isAllowed = comment.parentId.size!=0;
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const replyId = parentId ? parentId : comment.id;
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src={avatar} />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                <div className="comment-author">{comment.owner}</div>
                <div>{createAt}</div>
            </div>
            {!isEditing && <div className="comment-text">{comment.body}</div>}
            {isEditing && (
                <CommentForm submitLabel="Update" hasCancelButton initialText={comment.body} handleSubmit={(text)=> updateComment(text,comment.id)} handleCancel={() =>setActiveComment(null)}/>
            )}
            <div className="comment-actions">
                {canReply && <div className="comment-action"
                                  onClick={() =>
                                      setActiveComment({id:comment.id,type:"replying"})}>Replay</div>}
                {canEdit && <div className="comment-action"
                                 onClick={() =>
                                     setActiveComment({id:comment.id,type:"editing"})}>Edit</div>}
                {canDelete && <div className="comment-action"
                                   onClick={()=>deleteComment(comment.id)}>
                    Delete</div>}
            </div>
            {isReplying && (
                <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)}/>
            )}
            {

            }
            {comment && comment.parentId && (
                <div className="replies">
                    {replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            replies={reply.parentId || []}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                            parentId={comment.id}
                            addComment={addComment}
                            updateComment={updateComment}
                            activeComment = {activeComment}
                            setActiveComment={setActiveComment}/>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
};

export default Comment;