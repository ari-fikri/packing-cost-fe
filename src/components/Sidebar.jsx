// src/components/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth'


export default function Sidebar(){
const auth = useAuth()
return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
<a href="#" className="brand-link">
<span className="brand-text font-weight-light">AdminLTE React</span>
</a>


<div className="sidebar">
<nav className="mt-2">
<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
<li className="nav-item">
<NavLink to="/" className={({isActive})=>"nav-link" + (isActive?" active":"")} end>
<i className="nav-icon fas fa-tachometer-alt" />
<p> Dashboard </p>
</NavLink>
</li>
<li className="nav-item">
<a href="#" className="nav-link">
<i className="nav-icon fas fa-boxes" />
<p> Inventory </p>
</a>
</li>


{auth.user ? (
<li className="nav-item">
<button className="nav-link btn btn-link text-left" onClick={()=>auth.logout()}>
<i className="nav-icon fas fa-sign-out-alt" />
<p> Logout </p>
</button>
</li>
) : null}


</ul>
</nav>
</div>
</aside>
)
}