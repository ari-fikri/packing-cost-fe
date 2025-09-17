// src/pages/ParametersPanel.jsx
import React, { useState } from "react";

// This page follows the same visual theme as Models.jsx (card, compact controls)
export default function ParametersPanel({ onSave }) {
  const [activeTab, setActiveTab] = useState("Inland");
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
      containerM3: Number(containerM3.replace(/[^0-9.-]+/g, "")),
      rent40ft: Number(rent40ft.replace(/[^0-9.-]+/g, "")),
      rent20ft: Number(rent20ft.replace(/[^0-9.-]+/g, "")),
      milkrunRate: Number(milkrunRate.replace(/[^0-9.-]+/g, "")),
      milkrunEff: Number(milkrunEff.replace(/[^0-9.-]+/g, "")),
    };

    setSaved(true);
    if (typeof onSave === "function") onSave(payload);

    setTimeout(() => setSaved(false), 1500);
  };

  const handleCancel = () => {
    setPeriod("02.2025");
    setContainerM3("47.7");
    setRent40ft("86.177");
    setRent20ft("86.177");
    setMilkrunRate("60.577");
    setMilkrunEff("64");
  };

  const inputClass = "w-full border rounded px-2 py-1 text-sm";
  const labelClass = "text-sm text-gray-700";

  const tabs = ["Inland", "Labor Cost", "Man Hour", "History"];

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-4 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Parameters</h3>
          <div className="flex gap-2 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1 rounded ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Inland" && (
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Period</label>
              <input className={inputClass} value={period} onChange={(e) => setPeriod(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>Container Volume M3</label>
              <input className={inputClass} value={containerM3} onChange={(e) => setContainerM3(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>40 feet container rent rate</label>
              <input className={inputClass} value={rent40ft} onChange={(e) => setRent40ft(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>20 feet container rent rate</label>
              <input className={inputClass} value={rent20ft} onChange={(e) => setRent20ft(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>Milkrun rate (per m3)</label>
              <input className={inputClass} value={milkrunRate} onChange={(e) => setMilkrunRate(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>Milkrun efficiency rate (%)</label>
              <input className={inputClass} value={milkrunEff} onChange={(e) => setMilkrunEff(e.target.value)} />
            </div>
          </div>
        )}

        {activeTab !== "Inland" && (
          <div className="p-6 text-gray-500 text-sm italic">{activeTab} form coming soon...</div>
        )}

        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            className="px-3 py-1 rounded border text-sm bg-white hover:bg-gray-50"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
        </div>

        {saved && <div className="mt-3 text-sm text-green-600">Parameters saved</div>}
      </div>
    </div>
  );
}
