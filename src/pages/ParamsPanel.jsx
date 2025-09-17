// src/pages/ParametersPanel.jsx
import React, { useState } from 'react';

export default function ParametersPanel({ onSave }) {
  const [activeTab, setActiveTab] = useState('inland');

  const [period, setPeriod] = useState('02.2025');
  // Inland fields
  const [containerM3, setContainerM3] = useState('47.7');
  const [rent40ft, setRent40ft] = useState('86.177');
  const [rent20ft, setRent20ft] = useState('86.177');
  const [milkrunRate, setMilkrunRate] = useState('60.577');
  const [milkrunEff, setMilkrunEff] = useState('64');

  // Labor fields
  const [dlRate, setDlRate] = useState('86.177');
  const [idlRate, setIdlRate] = useState('106.835');
  const [facilityRate, setFacilityRate] = useState('63.249');

  const handleSave = () => {
    let payload = { period };
    if(activeTab === 'inland') {
      payload = { ...payload, containerM3, rent40ft, rent20ft, milkrunRate, milkrunEff };
    } else if(activeTab === 'labor') {
      payload = { ...payload, dlRate, idlRate, facilityRate };
    }
    if(onSave) onSave(payload);
    alert('Parameters saved (placeholder)');
  };

  const handleCancel = () => {
    setPeriod('02.2025');
    setContainerM3('47.7');
    setRent40ft('86.177');
    setRent20ft('86.177');
    setMilkrunRate('60.577');
    setMilkrunEff('64');

    setDlRate('86.177');
    setIdlRate('106.835');
    setFacilityRate('63.249');
  };

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Parameters</b></h3>
          <div className="card-tools ml-auto">
            {/* Tabs */}
            <div className="btn-group btn-group-sm">
              <button className={`btn btn-sm ${activeTab==='inland'?'btn-primary':'btn-outline-secondary'}`} onClick={()=>setActiveTab('inland')}>Inland</button>
              <button className={`btn btn-sm ${activeTab==='labor'?'btn-primary':'btn-outline-secondary'}`} onClick={()=>setActiveTab('labor')}>Labor Cost</button>
              <button className={`btn btn-sm ${activeTab==='manhour'?'btn-primary':'btn-outline-secondary'}`} onClick={()=>setActiveTab('manhour')}>Man Hour</button>
              <button className={`btn btn-sm ${activeTab==='history'?'btn-primary':'btn-outline-secondary'}`} onClick={()=>setActiveTab('history')}>History</button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="form-row">
            {activeTab === 'inland' && (
              <>
                <div className="form-group col-md-6">
                  <label>Period</label>
                  <input type="text" className="form-control form-control-sm" value={period} onChange={e=>setPeriod(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>Container Volume M3</label>
                  <input type="text" className="form-control form-control-sm" value={containerM3} onChange={e=>setContainerM3(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>40 feet container rent rate</label>
                  <input type="text" className="form-control form-control-sm" value={rent40ft} onChange={e=>setRent40ft(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>20 feet container rent rate</label>
                  <input type="text" className="form-control form-control-sm" value={rent20ft} onChange={e=>setRent20ft(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>Milkrun rate (per m3)</label>
                  <input type="text" className="form-control form-control-sm" value={milkrunRate} onChange={e=>setMilkrunRate(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>Milkrun efficiency rate (%)</label>
                  <input type="text" className="form-control form-control-sm" value={milkrunEff} onChange={e=>setMilkrunEff(e.target.value)} />
                </div>
              </>
            )}

            {activeTab === 'labor' && (
              <>
                <div className="form-group col-md-6">
                  <label>Period</label>
                  <input type="text" className="form-control form-control-sm" value={period} onChange={e=>setPeriod(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>Direct Labor Rate (DL) Rp/Hour</label>
                  <input type="text" className="form-control form-control-sm" value={dlRate} onChange={e=>setDlRate(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>Indirect Labor Rate (IDL) Rp/M3</label>
                  <input type="text" className="form-control form-control-sm" value={idlRate} onChange={e=>setIdlRate(e.target.value)} />
                </div>

                <div className="form-group col-md-6">
                  <label>Facility Others Rate</label>
                  <input type="text" className="form-control form-control-sm" value={facilityRate} onChange={e=>setFacilityRate(e.target.value)} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card-footer text-right">
          <button className="btn btn-primary btn-sm mr-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
