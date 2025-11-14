import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [recentStudies, setRecentStudies] = useState([]);
  const [recentDiscussions, setRecentDiscussions] = useState([]);

  useEffect(() => {
    // Load mock data from localStorage
    const studies = JSON.parse(localStorage.getItem('medicalStudies') || '[]');
    const discussions = JSON.parse(localStorage.getItem('discussions') || '[]');
    
    setRecentStudies(studies.slice(0, 3));
    setRecentDiscussions(discussions.slice(0, 3));
  }, []);

  return (
    <div className="patient-dashboard">
      <h1>Patient Dashboard</h1>
      <div className="dashboard-grid">
        
        <div className="dashboard-card">
          <h2>Recent Medical Studies</h2>
          {recentStudies.length > 0 ? (
            <div className="study-list">
              {recentStudies.map(study => (
                <div key={study.id} className="study-item">
                  <h4>{study.title}</h4>
                  <p>By Dr. {study.doctorName} • {study.disease}</p>
                  <small>{new Date(study.date).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent studies available.</p>
          )}
          <Link to="/studies" className="view-all-link">View All Studies</Link>
        </div>

        <div className="dashboard-card">
          <h2>Recent Discussions</h2>
          {recentDiscussions.length > 0 ? (
            <div className="discussion-list">
              {recentDiscussions.map(topic => (
                <div key={topic.id} className="discussion-item">
                  <h4>{topic.title}</h4>
                  <p>By {topic.author} • {topic.comments} comments</p>
                  <small>{new Date(topic.date).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent discussions.</p>
          )}
          <Link to="/discussions" className="view-all-link">View All Discussions</Link>
        </div>

        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/studies" className="action-button">
              Browse Medical Studies
            </Link>
            <Link to="/discussions" className="action-button">
              Join Discussions
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;