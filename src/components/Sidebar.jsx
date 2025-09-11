// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar({ onLogout } = {}) {
  const [masterOpen, setMasterOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const path = (location.pathname || '').toLowerCase()
    if (path.startsWith('/projects') || path.startsWith('/models') || path.startsWith('/parts')) {
      setMasterOpen(true)
    } else {
      setMasterOpen(false)
    }
  }, [location.pathname])

  const navLinkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '')

  function handleLogoutClick(e) {
    e.preventDefault()
    if (typeof onLogout === 'function') onLogout()
    // optional: clear storage / tokens here
    navigate('/login')
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ minHeight: '100vh' }}>
      {/* Brand */}
      <div className="brand-link">
        <NavLink to="/" className="d-block text-decoration-none">
          <span className="brand-text font-weight-light">My App</span>
        </NavLink>
      </div>

      <div className="sidebar d-flex flex-column" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <nav className="mt-2 flex-grow-1">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            role="menu"
            aria-orientation="vertical"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Dashboard */}
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass}>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </NavLink>
            </li>

            {/* Master expandable */}
            <li className={`nav-item has-treeview ${masterOpen ? 'menu-open' : ''}`}>
              <div
                role="button"
                onClick={() => setMasterOpen(v => !v)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMasterOpen(v => !v) }}
                tabIndex={0}
                aria-expanded={masterOpen}
                className={`nav-link d-flex align-items-center ${masterOpen ? 'active' : ''}`}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <i className="nav-icon fas fa-database" />
                <p className="flex-grow-1 mb-0 ml-2">Master</p>
                <i className={`right fas ${masterOpen ? 'fa-angle-down' : 'fa-angle-left'}`} />
              </div>

              <ul className="nav nav-treeview" style={{ display: masterOpen ? 'block' : 'none' }}>
                <li className="nav-item">
                  <NavLink to="/projects" className={navLinkClass}>
                    <i className="far fa-circle nav-icon" />
                    <p>Projects</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/models" className={navLinkClass}>
                    <i className="far fa-circle nav-icon" />
                    <p>Models</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/parts" className={navLinkClass}>
                    <i className="far fa-circle nav-icon" />
                    <p>Parts</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* spacer pushes logout to bottom */}
            <li style={{ marginTop: 'auto' }} />

            {/* Logout as a nav-item at the bottom */}
            <li className="nav-item" style={{ padding: '0.5rem 0' }}>
              <button
                type="button"
                onClick={handleLogoutClick}
                className="btn btn-block btn-outline-danger d-flex align-items-center"
                style={{ justifyContent: 'flex-start' }}
              >
                <i className="fas fa-sign-out-alt mr-2" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
