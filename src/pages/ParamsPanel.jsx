// src/pages/ParametersPanel.jsx
import React, { useState } from "react";

// ParametersPanel (Bootstrap / Models.jsx style)
export default function ParametersPanel({ onSave }) {
  const tabs = ["Inland", "Labor Cost", "Man Hour", "History"];
  const [activeTab, setActiveTab] = useState("Inland");

  // Inland fields (defaults from your layout)
  const [period, setPeriod] = useState("02.2025");
  const [containerM3, setContainerM3] = useState("47.7");
  const [rent40ft, setRent40ft] = useState("86.177");
  const [rent20ft, setRent20ft] = useState("86.177");
  const [milkrunRate, setMilkrunRate] = useState("60.577");
  const [milkrunEff, setMilkrunEff] = useState("64");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const payload = {
      activeTab,
      period,
      containerM3: Number(containerM3.toString().replace(/[^0-9.-]+/g, "")),
      rent40ft: Number(rent40ft.toString().replace(/[^0-9.-]+/g, "")),
      rent20ft: Number(rent20ft.toString().replace(/[^0-9.-]+/g, "")),
      milkrunRate: Number(milkrunRate.toString().replace(/[^0-9.-]+/g, "")),
      milkrunEff: Number(milkrunEff.toString().replace(/[^0-9.-]+/g, "")),
    };

    setSaved(true);
    if (typeof onSave === "function") onSave(payload);

    // small feedback
    setTimeout(() => setSaved(false), 1400);
  };

  const handleCancel = () => {
    setPeriod("02.2025");
    setContainerM3("47.7");
    setRent40ft("86.177");
    setRent20ft("86.177");
    setMilkrunRate("60.577");
    setMilkrunEff("64");
  };

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Parameters</b></h3>

          <div className="card-tools ml-auto d-flex align-items-center">
            {/* Tabs as small buttons (acts like tab control) */}
            <div className="btn-group btn-group-sm mr-3" role="group" aria-label="Tabs">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`btn btn-sm ${activeTab === t ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleSave}>
              <i className="fas fa-save mr-1" /> Save
            </button>

            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleCancel}>
              <i className="fas fa-undo mr-1" /> Reset
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Tab content — uses same Bootstrap form layout as Models.jsx */}
          {activeTab === "Inland" && (
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="small mb-1">Period</label>
                <input
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="small mb-1">Container Volume M3</label>
                <input
                  value={containerM3}
                  onChange={e => setContainerM3(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="small mb-1">40 feet container rent rate</label>
                <input
                  value={rent40ft}
                  onChange={e => setRent40ft(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="small mb-1">20 feet container rent rate</label>
                <input
                  value={rent20ft}
                  onChange={e => setRent20ft(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="small mb-1">Milkrun rate (per m3)</label>
                <input
                  value={milkrunRate}
                  onChange={e => setMilkrunRate(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="small mb-1">Milkrun efficiency rate (%)</label>
                <input
                  value={milkrunEff}
                  onChange={e => setMilkrunEff(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          )}

          {activeTab === "Labor Cost" && (
            <div className="alert alert-secondary small">Labor Cost configuration will be here (placeholder)</div>
          )}

          {activeTab === "Man Hour" && (
            <div className="alert alert-secondary small">Man Hour configuration will be here (placeholder)</div>
          )}

          {activeTab === "History" && (
            <div className="alert alert-secondary small">History / change log will be shown here (placeholder)</div>
          )}
        </div>

        <div className="card-footer text-right">
          <button type="button" className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      {saved && <div className="mt-3 text-success small">Parameters saved</div>}
    </div>
  );
}
