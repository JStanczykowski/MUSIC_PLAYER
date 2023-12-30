import {useState} from "react";
import "./comments.css";
const CommentForm = ({  handleSubmit,
                         submitLabel,
                         hasCancelButton = false,
                         handleCancel,
                         initialText = "",}) =>{
    const [text, setText] = useState(initialText);
    const isTextareDisabled = text.length ===0;
    const onSubmit = event =>{
        event.preventDefault();
        if (handleSubmit && typeof handleSubmit === 'function') {
            handleSubmit(text);
        }
        setText("");
    }
    return(
        <form onSubmit={onSubmit} className="comment-form-review">
      <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
      />
            <button className="comment-form-button" disabled={isTextareDisabled}>
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button"
                    className="comment-form-button comment-form-cancel-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    )
}
export default CommentForm;