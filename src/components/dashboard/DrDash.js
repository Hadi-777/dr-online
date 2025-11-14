import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [myStudies, setMyStudies] = useState([]);
  const [myTopics, setMyTopics] = useState([]);

  useEffect(() => {
    const studies = JSON.parse(localStorage.getItem('medicalStudies') || '[]');
    const discussions = JSON.parse(localStorage.getItem('discussions') || '[]');
    
    // Filter user's content
    const userStudies = studies.filter(study => study.doctorId === user.id);
    const userTopics = discussions.filter(topic => topic.authorId === user.id);
    
    setMyStudies(userStudies.slice(0, 3));
    setMyTopics(userTopics.slice(0, 3));
  }, [user]);

  return (
    <div className="doctor-dashboard">
      <h1>Doctor Dashboard</h1>
      <p className="welcome-message">Welcome, Dr. {user.name} ({user.specialization})</p>
      
      <div className="dashboard-grid">
        
        <div className="dashboard-card">
          <h2>My Recent Studies</h2>
          {myStudies.length > 0 ? (
            <div className="study-list">
              {myStudies.map(study => (
                <div key={study.id} className="study-item">
                  <h4>{study.title}</h4>
                  <p>{study.disease} • {study.views} views</p>
                  <small>{new Date(study.date).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't published any studies yet.</p>
          )}
          <div className="action-buttons">
            <Link to="/studies/new" className="action-button primary">
              Publish New Study
            </Link>
            <Link to="/studies" className="action-button secondary">
              View All Studies
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>My Discussion Topics</h2>
          {myTopics.length > 0 ? (
            <div className="discussion-list">
              {myTopics.map(topic => (
                <div key={topic.id} className="discussion-item">
                  <h4>{topic.title}</h4>
                  <p>{topic.comments} comments</p>
                  <small>{new Date(topic.date).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't started any discussions yet.</p>
          )}
          <div className="action-buttons">
            <Link to="/discussions/new" className="action-button primary">
              Start New Discussion
            </Link>
            <Link to="/discussions" className="action-button secondary">
              View All Discussions
            </Link>
          </div>
        </div>

        <div className="dashboard-card stats-card">
          <h2>Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Total Studies</h3>
              <p>{JSON.parse(localStorage.getItem('medicalStudies') || '[]').length}</p>
            </div>
            <div className="stat-item">
              <h3>Total Discussions</h3>
              <p>{JSON.parse(localStorage.getItem('discussions') || '[]').length}</p>
            </div>
            <div className="stat-item">
              <h3>My Publications</h3>
              <p>{myStudies.length}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;