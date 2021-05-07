function Comment({ comment }) {
	return (
		<div>
			<input readOnly value={comment.content}></input>
			<div>{comment.author}</div>
			<div>{comment.createdTime.toString()}</div>
		</div>
	);
}

export default Comment;