import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all saved data?")) {
      localStorage.clear(); // removes everything from localStorage
      alert("All data cleared!");
      navigate("/"); // optionally go back to dashboard
    }
  };

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header">
          <h3 className="card-title mb-0"><b>Settings</b></h3>
        </div>
        <div className="card-body">
          <button className="btn btn-danger" onClick={handleClearData}>
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
