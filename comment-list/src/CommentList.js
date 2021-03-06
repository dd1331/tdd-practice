import Comment from './Comment';

function CommentList({ comments }) {
	return (
		<div>
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>
						<Comment comment={comment}></Comment>
					</li>
				))}
			</ul>
		</div>
	);
}

export default CommentList;