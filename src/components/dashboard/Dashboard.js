import React from 'react';
import { useAuth } from '../../context/Authcontext';
import PatientDashboard from './PatientDash';
import DoctorDashboard from './DrDash';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {user?.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />}
    </div>
  );
};

export default Dashboard;