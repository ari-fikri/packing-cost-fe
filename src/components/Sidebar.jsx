// src/components/Sidebar.jsx
import React from 'react'


export default function Sidebar(){
return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
<a href="#" className="brand-link">
<span className="brand-text font-weight-light">AdminLTE React</span>
</a>


<div className="sidebar">
<nav className="mt-2">
<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
<li className="nav-item">
<a href="#" className="nav-link active">
<i className="nav-icon fas fa-tachometer-alt" />
<p> Dashboard </p>
</a>
</li>
<li className="nav-item">
<a href="#" className="nav-link">
<i className="nav-icon fas fa-boxes" />
<p> Inventory </p>
</a>
</li>
</ul>
</nav>
</div>
</aside>
)
}