import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const StudyList = () => {
  const [studies, setStudies] = useState([]);
  const [filter, setFilter] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const savedStudies = JSON.parse(localStorage.getItem('medicalStudies') || '[]');
    setStudies(savedStudies);
  }, []);

  const filteredStudies = studies.filter(study =>
    study.disease.toLowerCase().includes(filter.toLowerCase()) ||
    study.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="study-list-container">
      <div className="page-header">
        <h1>Medical Studies & Research</h1>
        {user?.role === 'doctor' && (
          <Link to="/studies/new" className="primary-button">
            Publish New Study
          </Link>
        )}
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by disease or title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="studies-grid">
        {filteredStudies.map(study => (
          <div key={study.id} className="study-card">
            <div className="study-header">
              <h3>{study.title}</h3>
              <span className="disease-tag">{study.disease}</span>
            </div>
            
            <div className="study-meta">
              <p><strong>Author:</strong> Dr. {study.doctorName}</p>
              <p><strong>Specialization:</strong> {study.specialization}</p>
              <p><strong>Published:</strong> {new Date(study.date).toLocaleDateString()}</p>
            </div>

            <div className="study-content">
              <p>{study.content.substring(0, 150)}...</p>
            </div>

            {study.references && (
              <div className="study-references">
                <strong>References:</strong>
                <p>{study.references}</p>
              </div>
            )}

            <div className="study-footer">
              <span className="views">{study.views} views</span>
              {user?.role === 'doctor' && user.id === study.doctorId && (
                <span className="your-study">Your Publication</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredStudies.length === 0 && (
        <div className="empty-state">
          <p>No studies found. {user?.role === 'doctor' && 'Be the first to publish one!'}</p>
        </div>
      )}
    </div>
  );
};

export default StudyList;


