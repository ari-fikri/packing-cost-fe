// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/header.jsx'
import Dashboard from './pages/Dashboard'
import Login from './pages/login.jsx'
import { useAuth } from './auth'
import Projects from './pages/Projects'
import Models from './pages/Models'
import Parts from './pages/Parts'
import Suppliers from './pages/Suppliers'
import { BrowserRouter as Router } from 'react-router-dom'
import Cps from './pages/packing/Cps'
import Dpi from './pages/packing/Dpi'
import Calculate from './pages/packing/CalculatePackingCost'
import Comparison from './pages/ComparisonPage'
import Material from './pages/Material'  // Now using the properly named Material.jsx file
import Settings from './pages/Settings'
import Params from './pages/ParamsPanel'
import NotificationDetail from './pages/NotificationDetail';
import CostMovementPage from './pages/CostMovementPage';

//Data files
import DESTINATIONS from './data/destinations.js';

function ProtectedRoute({ children }){
  const auth = useAuth()
  if(!auth.user) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  const auth = useAuth()
  const location = useLocation()

  // hide the admin shell when on login page or when not authenticated
  const isLoginRoute = location.pathname === '/login'
  const showShell = !!auth.user && !isLoginRoute

  return (
    <div className="wrapper">
      {/* render header + sidebar only when authenticated */}
      {showShell && <Header />}
      {showShell && <Sidebar />}

      {/* If shell is visible, use AdminLTE's content-wrapper. 
          If not (login), render routes inside a plain container so login page fills properly */}
      <div className={showShell ? 'content-wrapper' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={<ProtectedRoute><Projects/></ProtectedRoute>} />
          <Route path="/models" element={<ProtectedRoute><Models/></ProtectedRoute>} />
          <Route path="/parts" element={<ProtectedRoute><Parts/></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers/></ProtectedRoute>} />
          <Route path="/packing/cps" element={<ProtectedRoute><Cps /></ProtectedRoute>} />
          <Route path="/packing/dpi" element={<ProtectedRoute><Dpi /></ProtectedRoute>} />
          <Route path="/packing/CalculatePackingCost" element={<ProtectedRoute><Calculate /></ProtectedRoute>} />
          <Route path="/packing/ComparisonPage" element={<ProtectedRoute><Comparison /></ProtectedRoute>} />
          <Route path="/module-type" element={<ProtectedRoute><Material /></ProtectedRoute>} />
          <Route path="/material" element={<ProtectedRoute><Material /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/params" element={<ProtectedRoute><Params /></ProtectedRoute>} />
          <Route path="/notification-detail" element={<ProtectedRoute><NotificationDetail /></ProtectedRoute>} />
          <Route path="/cost-movement" element={<ProtectedRoute><CostMovementPage /></ProtectedRoute>} />
        </Routes>
      </div>

      {/* footer only when shell is visible */}
      {showShell && (
        <footer className="main-footer">
          <div className="float-right d-none d-sm-block">
            <b>Version</b> 0.1.0
          </div>
          <strong>© {new Date().getFullYear()} My Company.</strong>
        </footer>
      )}
    </div>
  )
}

function Main(){
  const auth = useAuth()
  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Dashboard</h1>
              <small>User: {auth.user?.username} | Dept: {auth.user?.department} | Role: {auth.user?.role}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <Dashboard />
        </div>
      </section>
    </>
  )

  useEffect(() => {
    // Initialize localStorage for destination table if not already present
    if (!localStorage.getItem('destinationTable')) {
      localStorage.setItem('destinationTable', JSON.stringify(DESTINATIONS));
    }
  }, []);

  return (
    <div>
      <Material />
    </div>
  );  
}