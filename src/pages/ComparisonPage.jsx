import React, { useState } from "react";
import CollapsibleRow from "./CollapsibleRow";

export default function ComparisonPage() {
  const [partNo1, setPartNo1] = useState("162990E010 - 00");
  const [partNo2, setPartNo2] = useState("364070K010 - 00");
  const [periode1, setPeriode1] = useState("2025");
  const [periode2, setPeriode2] = useState("2026");

  const totalCost1 = 368;
  const totalCost2 = 362.07;

  const materialsData = Array.from({ length: 10 }, (_, i) => ({
    name: `Material ${i + 1}`,
    value1: 24.0,
    value2: 11.06,
    detail: {
      partNo: `B027-0200${i + 1}`,
      code: `Paper Tape Merk Golda maishu`,
      qty: 0.2,
      price: 20700,
    },
  }));

  const labor = { total: 54.57, dl: 14, idl: 26, facility: 15 };
  const labor2 = { dl: 11.06, idl: 27, facility: 13 };

  const inland = { total: 91, inlandCost: 14, milkrunCost: 26 };
  const inland2 = { inlandCost: 11.06, milkrunCost: 27 };

  // Format function for numbers: keep 2 digits after decimal
  const fmt = (v) => {
    if (v === null || v === undefined || v === "") return "";
    const num = Number(v);
    if (isNaN(num)) return String(v);
    return num.toFixed(2);
  };

  const calcDiff = (v1, v2) => {
    if (v1 == null || v2 == null) return "";
    const n1 = Number(v1);
    const n2 = Number(v2);
    if (isNaN(n1) || isNaN(n2) || n1 === 0) return "";
    return `${(((n2 - n1) / n1) * 100).toFixed(2)}%`;
  };

  const fmtPrice = (v) =>
    `Rp ${Number(v).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // helper style for right-aligned numeric cells
  const right = { textAlign: "right", whiteSpace: "nowrap" };

  return (
    <div className="container mt-3">
      <h5>Packing Cost Comparison</h5>
      <table className="table table-bordered table-sm" style={{ fontSize: "0.85rem" }}>
        <thead style={{ backgroundColor: "#efefef" }}>
          <tr>
            <th>Part No</th>
            <th>
              <input
                value={partNo1}
                onChange={(e) => setPartNo1(e.target.value)}
                className="form-control form-control-sm"
              />
            </th>
            <th>
              <input
                value={partNo2}
                onChange={(e) => setPartNo2(e.target.value)}
                className="form-control form-control-sm"
              />
            </th>
            <th>Diff</th>
          </tr>
          <tr>
            <th>Periode</th>
            <th>
              <input
                value={periode1}
                onChange={(e) => setPeriode1(e.target.value)}
                className="form-control form-control-sm"
              />
            </th>
            <th>
              <input
                value={periode2}
                onChange={(e) => setPeriode2(e.target.value)}
                className="form-control form-control-sm"
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Part Info */}
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
            <td>TOTAL COST (Rp)</td>
            <td style={right}>{fmt(totalCost1)}</td>
            <td style={right}>{fmt(totalCost2)}</td>
            <td style={right}>{calcDiff(totalCost1, totalCost2)}</td>
          </tr>

          {/* Material Section */}
          <CollapsibleRow
            title="Material (Rp)"
            value1={fmt(materialsData.reduce((sum, m) => sum + m.value1, 0))}
            value2={fmt(materialsData.reduce((sum, m) => sum + m.value2, 0))}
            diff={calcDiff(
              materialsData.reduce((sum, m) => sum + m.value1, 0),
              materialsData.reduce((sum, m) => sum + m.value2, 0)
            )}
          >
            {/* Inner */}
            <CollapsibleRow
              title="Inner (Rp)"
              value1={fmt(materialsData.reduce((sum, m) => sum + m.value1, 0))}
              value2={fmt(materialsData.reduce((sum, m) => sum + m.value2, 0))}
              diff={calcDiff(
                materialsData.reduce((sum, m) => sum + m.value1, 0),
                materialsData.reduce((sum, m) => sum + m.value2, 0)
              )}
            >
              {materialsData.map((mat, i) => (
                <React.Fragment key={`inner-${i}`}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>Material {i + 1}</td>
                    <td style={right}>{fmt(mat.value1)}</td>
                    <td style={right}>{fmt(mat.value2)}</td>
                    <td style={right}>{calcDiff(mat.value1, mat.value2)}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "40px" }}>
                      <div>- Part No: {mat.detail.partNo}</div>
                      <div>- Code: {mat.detail.code}</div>
                      <div>- Qty: {fmt(mat.detail.qty)}</div>
                      <div>- Price: {fmtPrice(mat.detail.price)}</div>
                    </td>
                    <td style={right}></td>
                    <td style={right}></td>
                    <td style={right}></td>
                  </tr>
                </React.Fragment>
              ))}
            </CollapsibleRow>

            {/* Outer */}
            <CollapsibleRow
              title="Outer (Rp)"
              value1={fmt(materialsData.reduce((sum, m) => sum + m.value1, 0))}
              value2={fmt(materialsData.reduce((sum, m) => sum + m.value2, 0))}
              diff={calcDiff(
                materialsData.reduce((sum, m) => sum + m.value1, 0),
                materialsData.reduce((sum, m) => sum + m.value2, 0)
              )}
            >
              {materialsData.map((mat, i) => (
                <React.Fragment key={`outer-${i}`}>
                  <tr>
                    <td style={{ paddingLeft: "20px" }}>Material {i + 1}</td>
                    <td style={right}>{fmt(mat.value1)}</td>
                    <td style={right}>{fmt(mat.value2)}</td>
                    <td style={right}>{calcDiff(mat.value1, mat.value2)}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: "40px" }}>
                      <div>- Part No: {mat.detail.partNo}</div>
                      <div>- Code: {mat.detail.code}</div>
                      <div>- Qty: {fmt(mat.detail.qty)}</div>
                      <div>- Price: {fmtPrice(mat.detail.price)}</div>
                    </td>
                    <td style={right}></td>
                    <td style={right}></td>
                    <td style={right}></td>
                  </tr>
                </React.Fragment>
              ))}
            </CollapsibleRow>
          </CollapsibleRow>

          {/* Labor Section */}
          <CollapsibleRow
            title="Labor (Rp)"
            value1={fmt(labor.total)}
            value2={fmt(labor2.dl + labor2.idl + labor2.facility)}
            diff={calcDiff(labor.total, labor2.dl + labor2.idl + labor2.facility)}
          >
            <tr>
              <td style={{ paddingLeft: "20px" }}>- DL</td>
              <td style={right}>{fmt(labor.dl)}</td>
              <td style={right}>{fmt(labor2.dl)}</td>
              <td style={right}>{calcDiff(labor.dl, labor2.dl)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- IDL</td>
              <td style={right}>{fmt(labor.idl)}</td>
              <td style={right}>{fmt(labor2.idl)}</td>
              <td style={right}>{calcDiff(labor.idl, labor2.idl)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Facility/Others</td>
              <td style={right}>{fmt(labor.facility)}</td>
              <td style={right}>{fmt(labor2.facility)}</td>
              <td style={right}>{calcDiff(labor.facility, labor2.facility)}</td>
            </tr>
          </CollapsibleRow>

          {/* Inland Section */}
          <CollapsibleRow
            title="Inland (Rp)"
            value1={fmt(inland.total)}
            value2={fmt(inland2.inlandCost + inland2.milkrunCost)}
            diff={calcDiff(inland.total, inland2.inlandCost + inland2.milkrunCost)}
          >
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Inland Cost</td>
              <td style={right}>{fmt(inland.inlandCost)}</td>
              <td style={right}>{fmt(inland2.inlandCost)}</td>
              <td style={right}>{calcDiff(inland.inlandCost, inland2.inlandCost)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Milkrun Cost</td>
              <td style={right}>{fmt(inland.milkrunCost)}</td>
              <td style={right}>{fmt(inland2.milkrunCost)}</td>
              <td style={right}>{calcDiff(inland.milkrunCost, inland2.milkrunCost)}</td>
            </tr>
          </CollapsibleRow>
        </tbody>
      </table>
    </div>
  );
}
