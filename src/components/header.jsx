// src/components/Header.jsx
import React from 'react'
import { useAuth } from '../auth'


export default function Header(){
const auth = useAuth()
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