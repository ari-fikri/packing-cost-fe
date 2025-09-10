// src/pages/Dashboard.jsx
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const data = {
labels: ['Jan','Feb','Mar','Apr','May'],
datasets: [
{ label: 'Orders', data: [12,19,7,14,10], backgroundColor: '#007bff' }
]
}


export default function Dashboard(){
return (
<div className="row">
<div className="col-lg-6">
<div className="card">
<div className="card-header"><h3 className="card-title">Sales</h3></div>
<div className="card-body"><Bar data={data} /></div>
</div>
</div>


<div className="col-lg-6">
<div className="card">
<div className="card-header"><h3 className="card-title">Quick Stats</h3></div>
<div className="card-body">
<div className="info-box mb-3 bg-info">
<span className="info-box-icon"><i className="fas fa-shopping-cart"></i></span>
<div className="info-box-content">
<span className="info-box-text">Orders</span>
<span className="info-box-number">1,250</span>
</div>
</div>
</div>
</div>
</div>


<div className="col-12 mt-3">
<div className="card">
<div className="card-header"><h3 className="card-title">Recent Items</h3></div>
<div className="card-body p-0">
<table className="table table-striped">
<thead><tr><th>#</th><th>Part No</th><th>Name</th><th>Qty</th></tr></thead>
<tbody>
<tr><td>1</td><td>33504-BZ292-C1</td><td>Hose</td><td>10</td></tr>
<tr><td>2</td><td>122810Y110</td><td>Hanger</td><td>2</td></tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
)
}