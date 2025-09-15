// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { useAuth } from './auth'
import Projects from './pages/Projects'
import Models from './pages/Models'
import Parts from './pages/Parts'
import { BrowserRouter as Router } from 'react-router-dom'
import Cps from './pages/packing/Cps'
import Dpi from './pages/packing/Dpi'
import Calculate from './pages/packing/CalculatePackingCost'
import Comparison from './pages/ComparisonPage'
import ModuleType from './pages/ModuleType'
import Settings from './pages/Settings'

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
          <Route path="/packing/cps" element={<Cps />} />
          <Route path="/packing/dpi" element={<Dpi />} />
          <Route path="/packing/CalculatePackingCost" element={<Calculate />} />
          <Route path="/packing/ComparisonPage" element={<Comparison />} />
          <Route path="/module-type" element={<ModuleType />} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
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
}
