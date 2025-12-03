import React from 'react';

export default function NotificationDetail() {
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Notification Detail</h3>
        </div>
        <div className="card-body">
          <p><strong>Date :</strong> 20 Feb 2025 13:10</p>
          <p><strong>From :</strong> Jonathan Hairi</p>
          <p><strong>Dept :</strong> PPMD</p>
          <hr />
          <p>Harus diganti Qty menjadi 2</p>
          <p>Agar lebih aman ketika dikirim ke supplier lain</p>
          <p>dan diganti Material No nya dengan Mat No : #12312312 00</p>
          <p>dari supplier Materindo Indigo</p>
        </div>
      </div>
    </div>
  );
}