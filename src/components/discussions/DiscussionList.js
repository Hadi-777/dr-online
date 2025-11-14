import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';
import CommentSection from './CommentSection';

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const savedDiscussions = JSON.parse(localStorage.getItem('discussions') || '[]');
    setDiscussions(savedDiscussions);
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToList = () => {
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    return (
      <CommentSection 
        topic={selectedTopic} 
        onBack={handleBackToList} 
      />
    );
  }

  return (
    <div className="discussion-list-container">
      <div className="page-header">
        <h1>Medical Discussions</h1>
        {user && (
          <Link to="/discussions/new" className="primary-button">
            Start New Discussion
          </Link>
        )}
      </div>

      <div className="discussions-grid">
        {discussions.map(topic => (
          <div 
            key={topic.id} 
            className="discussion-card"
            onClick={() => handleTopicClick(topic)}
          >
            <div className="discussion-header">
              <h3>{topic.title}</h3>
              <span className="category-tag">{topic.category}</span>
            </div>
            
            <p className="discussion-preview">
              {topic.content.substring(0, 100)}...
            </p>

            <div className="discussion-meta">
              <p><strong>Started by:</strong> {topic.author}</p>
              <p><strong>Date:</strong> {new Date(topic.date).toLocaleDateString()}</p>
            </div>

            <div className="discussion-stats">
              <span className="comments-count">{topic.comments} comments</span>
              {user?.id === topic.authorId && (
                <span className="your-topic">Your Topic</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {discussions.length === 0 && (
        <div className="empty-state">
          <p>No discussions yet. Start the first one!</p>
        </div>
      )}
    </div>
  );
};

export default DiscussionList;





