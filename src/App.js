import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import Navbar from './components/shared/NavBar';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/Dashboard';
import StudyList from './components/studies/StudyList';
import StudyForm from './components/studies/StudyForm';
import DiscussionList from './components/discussions/DiscussionList';
import TopicForm from './components/discussions/TopicForm';
import './styles/App.css';

// Remove this line if you don't have mockData.js
// import { initialStudies, initialDiscussions } from './data/mockData';

function App() {
  // Initialize mock data if not exists
  useEffect(() => {
    if (!localStorage.getItem('medicalStudies')) {
      const initialStudies = [
        {
          id: 1,
          title: "Advances in Diabetes Management",
          disease: "Diabetes",
          content: "Recent studies show that continuous glucose monitoring significantly improves HbA1c levels in type 1 diabetes patients.",
          doctorName: "Sarah Johnson",
          doctorId: 101,
          specialization: "Endocrinology",
          date: "2024-01-15",
          views: 124,
          references: "American Diabetes Association. (2023). Clinical Diabetes Journal."
        }
      ];
      localStorage.setItem('medicalStudies', JSON.stringify(initialStudies));
    }
    
    if (!localStorage.getItem('discussions')) {
      const initialDiscussions = [
        {
          id: 1,
          title: "Managing Patient Anxiety During Procedures",
          category: "mental-health",
          content: "I've noticed many patients experience significant anxiety before medical procedures.",
          author: "Dr. Sarah Johnson",
          authorId: 101,
          date: "2024-01-20",
          comments: 5
        }
      ];
      localStorage.setItem('discussions', JSON.stringify(initialDiscussions));
    }
    
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/studies" element={
                <ProtectedRoute>
                  <StudyList />
                </ProtectedRoute>
              } />
              
              <Route path="/studies/new" element={
                <ProtectedRoute requiredRole="doctor">
                  <StudyForm />
                </ProtectedRoute>
              } />
              
              <Route path="/discussions" element={
                <ProtectedRoute>
                  <DiscussionList />
                </ProtectedRoute>
              } />
              
              <Route path="/discussions/new" element={
                <ProtectedRoute>
                  <TopicForm />
                </ProtectedRoute>
              } />
              
              {/* Default Route */}
              <Route path="/" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;