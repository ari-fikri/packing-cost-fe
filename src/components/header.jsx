// src/components/Header.jsx
import React from 'react'
import { useAuth } from '../auth'
import { useNavigate } from 'react-router-dom';


export default function Header(){
const auth = useAuth()
const navigate = useNavigate();

const handleSeeDetail = () => {
  navigate('/notification-detail');
};

return (
<nav className="main-header navbar navbar-expand navbar-white navbar-light">
<ul className="navbar-nav">
<li className="nav-item">
<a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
</li>
<li className="nav-item d-none d-sm-inline-block">
<a href="#" className="nav-link">Home</a>
</li>
</ul>


<ul className="navbar-nav ml-auto">
      {/* Notification Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell"></i>
          <span className="badge badge-warning navbar-badge">2</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">2 Notifications</span>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item">
            <p style={{fontWeight: 'bold'}}>Date : 20 Feb 2025 13:15</p>
            <p className="text-sm">You have new form request to review.</p>
            <p className="text-sm text-muted">From : Jonathan Hairi at 20 Feb 2025 13:10</p>
            <p className="text-sm text-muted">Dept : PPMD</p>
            <button className="btn btn-primary btn-sm" onClick={handleSeeDetail}>See Detail</button>
          </div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item">
            <p style={{fontWeight: 'bold'}}>Date : 19 Feb 2025 12:15</p>
            <p className="text-sm">Your form submission has been rejected by :</p>
            <p className="text-sm text-muted">By : Jonathan Hairi at 19 Feb 2025 13:10</p>
            <p className="text-sm text-muted">Dept : PPMD</p>
            <p className="text-sm text-muted">Comment: Sheet tersebut sudah tidak ada di pasaran dan akan diganti sheet yg sama dari supplier lain.</p>
            <button className="btn btn-primary btn-sm" onClick={handleSeeDetail}>See Detail</button>
          </div>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button"><i className="fas fa-expand-arrows-alt"></i></a>
      </li>
      {auth.user && (
        <li className="nav-item d-none d-sm-inline-block">
          <span className="nav-link">{auth.user.username}</span>
        </li>
      )}
    </ul>
</nav>
)
}