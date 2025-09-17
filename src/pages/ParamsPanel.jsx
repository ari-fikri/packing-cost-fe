// src/pages/ParametersPanel.jsx
import React, { useState } from "react";

export default function ParametersPanel({ onSave }) {
  const [activeTab, setActiveTab] = useState("inland");

  // Inland tab state
  const [period, setPeriod] = useState("02.2025");
  const [containerM3, setContainerM3] = useState("47.7");
  const [rent40ft, setRent40ft] = useState("86.177");
  const [rent20ft, setRent20ft] = useState("86.177");
  const [milkrunRate, setMilkrunRate] = useState("60.577");
  const [milkrunEff, setMilkrunEff] = useState("64");

  // Labor Cost tab state
  const [dlRate, setDlRate] = useState("86.177");
  const [idlRate, setIdlRate] = useState("106.835");
  const [facilityRate, setFacilityRate] = useState("63.249");

  // Man Hour tab state
  const [receiving, setReceiving] = useState("1");
  const [inspection, setInspection] = useState("0,31");
  const [deliveryCourse, setDeliveryCourse] = useState("6");
  const [supplyPallet, setSupplyPallet] = useState("0,31");
  const [sortingSupply, setSortingSupply] = useState("5,83");
  const [pickPacking, setPickPacking] = useState("");
  const [vanning, setVanning] = useState("0,60");
  const [emptyBox, setEmptyBox] = useState("5");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const payload = {
      tab: activeTab,
      inland: { period, containerM3, rent40ft, rent20ft, milkrunRate, milkrunEff },
      labor: { period, dlRate, idlRate, facilityRate },
      manHour: { period, receiving, inspection, deliveryCourse, supplyPallet, sortingSupply, pickPacking, vanning, emptyBox },
    };
    setSaved(true);
    if (typeof onSave === "function") onSave(payload);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleCancel = () => {
    // Reset all tabs to defaults
    setPeriod("02.2025");
    setContainerM3("47.7");
    setRent40ft("86.177");
    setRent20ft("86.177");
    setMilkrunRate("60.577");
    setMilkrunEff("64");

    setDlRate("86.177");
    setIdlRate("106.835");
    setFacilityRate("63.249");

    setReceiving("1");
    setInspection("0,31");
    setDeliveryCourse("6");
    setSupplyPallet("0,31");
    setSortingSupply("5,83");
    setPickPacking("");
    setVanning("0,60");
    setEmptyBox("5");
  };

  const inputClass = "form-control form-control-sm";

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Parameters</b></h3>
          <div className="ml-auto btn-group btn-group-sm">
            {["inland", "labor", "manHour", "history"].map((tab) => (
              <button
                key={tab}
                className={`btn btn-sm ${activeTab === tab ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "inland" && "Inland"}
                {tab === "labor" && "Labor Cost"}
                {tab === "manHour" && "Man Hour"}
                {tab === "history" && "History"}
              </button>
            ))}
          </div>
        </div>

        <div className="card-body">
          {activeTab === "inland" && (
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Period</label>
                <input className={inputClass} value={period} onChange={(e) => setPeriod(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Container Volume M3</label>
                <input className={inputClass} value={containerM3} onChange={(e) => setContainerM3(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>40 feet container rent rate</label>
                <input className={inputClass} value={rent40ft} onChange={(e) => setRent40ft(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>20 feet container rent rate</label>
                <input className={inputClass} value={rent20ft} onChange={(e) => setRent20ft(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Milkrun rate (per m3)</label>
                <input className={inputClass} value={milkrunRate} onChange={(e) => setMilkrunRate(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Milkrun efficiency rate (%)</label>
                <input className={inputClass} value={milkrunEff} onChange={(e) => setMilkrunEff(e.target.value)} />
              </div>
            </div>
          )}

          {activeTab === "labor" && (
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Period</label>
                <input className={inputClass} value={period} onChange={(e) => setPeriod(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Direct Labor Rate (DL) Rp/Hour</label>
                <input className={inputClass} value={dlRate} onChange={(e) => setDlRate(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Indirect Labor Rate (IDL) Rp/M3</label>
                <input className={inputClass} value={idlRate} onChange={(e) => setIdlRate(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Facility Others Rate</label>
                <input className={inputClass} value={facilityRate} onChange={(e) => setFacilityRate(e.target.value)} />
              </div>
            </div>
          )}

          {activeTab === "manHour" && (
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Period</label>
                <input className={inputClass} value={period} onChange={(e) => setPeriod(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Receiving</label>
                <input className={inputClass} value={receiving} onChange={(e) => setReceiving(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Inspection</label>
                <input className={inputClass} value={inspection} onChange={(e) => setInspection(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Delivery Course</label>
                <input className={inputClass} value={deliveryCourse} onChange={(e) => setDeliveryCourse(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Supply (Pallet)</label>
                <input className={inputClass} value={supplyPallet} onChange={(e) => setSupplyPallet(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Sorting & Supply (Non Pallet)</label>
                <input className={inputClass} value={sortingSupply} onChange={(e) => setSortingSupply(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Pick & Packing</label>
                <input className={inputClass} value={pickPacking} onChange={(e) => setPickPacking(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Vanning</label>
                <input className={inputClass} value={vanning} onChange={(e) => setVanning(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Empty Box/Pallet Return</label>
                <input className={inputClass} value={emptyBox} onChange={(e) => setEmptyBox(e.target.value)} />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="text-center text-muted py-4">
              History tab content will appear here.
            </div>
          )}
        </div>

        <div className="card-footer text-right">
          <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          {saved && <span className="ml-3 text-success">Parameters saved</span>}
        </div>
      </div>
    </div>
  );
}
