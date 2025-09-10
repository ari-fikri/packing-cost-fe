// src/pages/Login.jsx
import React, { useState } from 'react'
import { useAuth } from '../auth'

function Login() {
  const auth = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = auth.login(username, password)
    if (!ok) {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-page bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ width: '360px' }}>
        <div className="card-body">
          <h3 className="mb-4 text-center">Sign In</h3>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
