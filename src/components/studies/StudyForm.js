import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const StudyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    disease: '',
    content: '',
    references: ''
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

    const newStudy = {
      id: Date.now(),
      ...formData,
      doctorId: user.id,
      doctorName: user.name,
      specialization: user.specialization,
      date: new Date().toISOString(),
      views: 0
    };

    // Save to localStorage
    const studies = JSON.parse(localStorage.getItem('medicalStudies') || '[]');
    studies.unshift(newStudy);
    localStorage.setItem('medicalStudies', JSON.stringify(studies));

    navigate('/studies');
  };

  return (
    <div className="form-container">
      <h1>Publish Medical Study</h1>
      
      <form onSubmit={handleSubmit} className="study-form">
        <div className="form-group">
          <label>Study Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
            required
          />
        </div>

        <div className="form-group">
          <label>Disease/Condition:</label>
          <input
            type="text"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="e.g., Diabetes, Hypertension"
            required
          />
        </div>

        <div className="form-group">
          <label>Study Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Describe the study findings, methodology, and conclusions..."
            rows="8"
            required
          />
        </div>

        <div className="form-group">
          <label>References (Optional):</label>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleChange}
            placeholder="Cite your sources and references..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/studies')} className="secondary-button">
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Publish Study
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudyForm;










