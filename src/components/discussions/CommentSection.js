import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/Authcontext';

const CommentSection = ({ topic, onBack }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments_${topic.id}`) || '[]');
    setComments(savedComments);
  }, [topic.id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: user.name,
      authorRole: user.role,
      date: new Date().toISOString(),
      topicId: topic.id
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setNewComment('');

    // Save to localStorage
    localStorage.setItem(`comments_${topic.id}`, JSON.stringify(updatedComments));

    // Update comment count in discussions
    const discussions = JSON.parse(localStorage.getItem('discussions') || '[]');
    const updatedDiscussions = discussions.map(d => 
      d.id === topic.id ? { ...d, comments: (d.comments || 0) + 1 } : d
    );
    localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));
  };

  return (
    <div className="comment-section">
      <button onClick={onBack} className="back-button">← Back to Discussions</button>
      
      <div className="topic-detail">
        <h1>{topic.title}</h1>
        <div className="topic-meta">
          <span>By {topic.author}</span>
          <span>•</span>
          <span>{new Date(topic.date).toLocaleDateString()}</span>
          <span>•</span>
          <span className="category">{topic.category}</span>
        </div>
        <p className="topic-content">{topic.content}</p>
      </div>

      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>
        
        {user ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows="3"
              required
            />
            <button type="submit" className="primary-button">
              Post Comment
            </button>
          </form>
        ) : (
          <p>Please log in to comment.</p>
        )}

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <strong>{comment.author}</strong>
                <span className={`role-tag ${comment.authorRole}`}>
                  {comment.authorRole}
                </span>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="empty-comments">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;



