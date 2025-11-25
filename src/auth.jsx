// src/auth.js
import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROLES, DEPARTMENTS } from './config/cpsPageConfig'

const AuthContext = createContext(null)

// Dummy user database (username + password)
const USERS = [
  { username: 'khedi.asmoro', password: '1', department: DEPARTMENTS.PSE, role: ROLES.ADMIN },
  { username: 'ujang.jayadi', password: '1', department: DEPARTMENTS.PSE, role: ROLES.ENGINEER },
  { username: 'anton', password: '1', department: DEPARTMENTS.PSE, role: ROLES.ENGINEER },
  { username: 'hanifa', password: '2', department: DEPARTMENTS.PCD, role: ROLES.PROCUREMENT },
  { username: 'viewer.pse', password: '1', department: DEPARTMENTS.PSE, role: ROLES.VIEWER },
  { username: 'viewer.pcd', password: '1', department: DEPARTMENTS.PCD, role: ROLES.VIEWER },
]

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // login now expects (username, password)
  const login = (username, password) => {
    const found = USERS.find(u => u.username === username && u.password === password)
    if(found){
      // omit the password from user state
      const { password: _pw, ...userSafe } = found
      setUser(userSafe)
      navigate('/')
      return true
    } else {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}