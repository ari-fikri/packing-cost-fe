// src/auth.js
import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

// Dummy user database (username + password)
const USERS = [
  { username: 'khedi.asmoro', password: '12345678', department: 'PSE', role: 'user' }
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
