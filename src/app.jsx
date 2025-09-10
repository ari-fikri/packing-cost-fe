// src/App.jsx
import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'


export default function App(){
return (
<div className="wrapper">
<Header />
<Sidebar />
<div className="content-wrapper">
<section className="content-header">
<div className="container-fluid">
<div className="row mb-2">
<div className="col-sm-6">
<h1>Dashboard</h1>
</div>
</div>
</div>
</section>


<section className="content">
<div className="container-fluid">
<Dashboard />
</div>
</section>
</div>


<footer className="main-footer">
<div className="float-right d-none d-sm-block">
<b>Version</b> 0.1.0
</div>
<strong>© {new Date().getFullYear()} My Company.</strong>
</footer>
</div>
)
}