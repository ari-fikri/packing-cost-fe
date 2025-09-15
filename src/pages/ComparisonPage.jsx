import React, { useState } from "react";
import CollapsibleRow from "./CollapsibleRow";

export default function ComparisonPage() {
  const [partNo1, setPartNo1] = useState("162990E010 - 00");
  const [partNo2, setPartNo2] = useState("364070K010 - 00");
  const [periode1, setPeriode1] = useState("2025");
  const [periode2, setPeriode2] = useState("2026");

  // Example data
  const materials = Array.from({ length: 10 }, (_, i) => ({
    name: `Material ${i + 1}`,
    value1: 14.0,
    value2: 11.06,
  }));

  const inner = { value1: 222, value2: 203 };
  const outer = { value1: 222, value2: 203 };
  const labor = { total: 54.57, dl: 14, idl: 26, facility: 15 };
  const inland = { total: 91, inlandCost: 14, milkrunCost: 26 };

  const calcDiff = (v1, v2) => {
    if (!v1 || !v2) return "";
    return `${(((v2 - v1) / v1) * 100).toFixed(2)}%`;
  };

  const fmt = (v) => (v !== null && v !== undefined ? v : "");

  return (
    <div className="container mt-3">
      <h4>Packing Cost Comparison</h4>
      <table className="table table-bordered table-sm" style={{ fontSize: "0.85rem" }}>
        <thead style={{ backgroundColor: "#efefef" }}>
          <tr>
            <th>Part No</th>
            <th>
              <input value={partNo1} onChange={(e) => setPartNo1(e.target.value)} className="form-control form-control-sm" />
            </th>
            <th>
              <input value={partNo2} onChange={(e) => setPartNo2(e.target.value)} className="form-control form-control-sm" />
            </th>
            <th>Diff</th>
          </tr>
          <tr>
            <th>Periode</th>
            <th>
              <input value={periode1} onChange={(e) => setPeriode1(e.target.value)} className="form-control form-control-sm" />
            </th>
            <th>
              <input value={periode2} onChange={(e) => setPeriode2(e.target.value)} className="form-control form-control-sm" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Part Name</td>
            <td>HOSE, WATER BY-PASS, NO.13</td>
            <td>HOSE SUB-ASSY, TRANSFER BREATHER</td>
            <td></td>
          </tr>
          <tr>
            <td>Supplier</td>
            <td>IRC INOAC INDONESIA (RUBBER - IRI)</td>
            <td>TOKAI RUBBER AUTO HOSE INDONESIA</td>
            <td></td>
          </tr>
          <tr>
            <td>TOTAL COST</td>
            <td>{368}</td>
            <td>{362.07}</td>
            <td>{calcDiff(368, 362.07)}</td>
          </tr>

          {/* Material Section */}
          <CollapsibleRow title={`Material : ${inner.value1}`}>
            {/* Inner */}
            <CollapsibleRow title={`Inner : ${inner.value1}`}>
              {materials.map((m, idx) => (
                <tr key={idx}>
                  <td style={{ paddingLeft: "20px" }}>{m.name}</td>
                  <td>{fmt(m.value1)}</td>
                  <td>{fmt(m.value2)}</td>
                  <td>{calcDiff(m.value1, m.value2)}</td>
                </tr>
              ))}
            </CollapsibleRow>
            {/* Outer */}
            <CollapsibleRow title={`Outer : ${outer.value1}`}>
              {materials.map((m, idx) => (
                <tr key={idx}>
                  <td style={{ paddingLeft: "20px" }}>{m.name}</td>
                  <td>{fmt(m.value1)}</td>
                  <td>{fmt(m.value2)}</td>
                  <td>{calcDiff(m.value1, m.value2)}</td>
                </tr>
              ))}
            </CollapsibleRow>
          </CollapsibleRow>

          {/* Labor Section */}
          <CollapsibleRow title={`Labor : ${labor.total}`}>
            <tr>
              <td style={{ paddingLeft: "20px" }}>DL</td>
              <td>{labor.dl}</td>
              <td>{11.06}</td>
              <td>{calcDiff(labor.dl, 11.06)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>IDL</td>
              <td>{labor.idl}</td>
              <td>{27}</td>
              <td>{calcDiff(labor.idl, 27)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>Facility/Others</td>
              <td>{labor.facility}</td>
              <td>{13}</td>
              <td>{calcDiff(labor.facility, 13)}</td>
            </tr>
          </CollapsibleRow>

          {/* Inland Section */}
          <CollapsibleRow title={`Inland : ${inland.total}`}>
            <tr>
              <td style={{ paddingLeft: "20px" }}>Inland Cost</td>
              <td>{inland.inlandCost}</td>
              <td>{11.06}</td>
              <td>{calcDiff(inland.inlandCost, 11.06)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>Milkrun Cost</td>
              <td>{inland.milkrunCost}</td>
              <td>{27}</td>
              <td>{calcDiff(inland.milkrunCost, 27)}</td>
            </tr>
          </CollapsibleRow>
        </tbody>
      </table>
    </div>
  );
}
