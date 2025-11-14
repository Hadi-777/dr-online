import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const TopicForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    content: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTopic = {
      id: Date.now(),
      ...formData,
      author: user.name,
      authorId: user.id,
      date: new Date().toISOString(),
      comments: 0
    };

    // Save to localStorage
    const discussions = JSON.parse(localStorage.getItem('discussions') || '[]');
    discussions.unshift(newTopic);
    localStorage.setItem('discussions', JSON.stringify(discussions));

    navigate('/discussions');
  };

  return (
    <div className="form-container">
      <h1>Start New Discussion</h1>
      
      <form onSubmit={handleSubmit} className="topic-form">
        <div className="form-group">
          <label>Topic Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a clear and descriptive title"
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="general">General Health</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="dermatology">Dermatology</option>
            <option value="mental-health">Mental Health</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </div>

        <div className="form-group">
          <label>Discussion Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your thoughts, questions, or insights..."
            rows="8"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/discussions')} className="secondary-button">
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Start Discussion
          </button>
        </div>
      </form>
    </div>
  );
};

export default TopicForm;



