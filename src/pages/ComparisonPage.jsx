// src/pages/ComparisonPage.jsx
import React, { useState, useEffect } from "react";
import CollapsibleRow from "./CollapsibleRow";

// helpers
const fmt = (v) => {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  if (isNaN(n)) return String(v);
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const fmtPrice = (v) =>
  `Rp ${Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const calcDiff = (v1, v2) => {
  if (v1 == null || v2 == null) return "";
  const n1 = Number(v1);
  const n2 = Number(v2);
  if (isNaN(n1) || isNaN(n2) || n1 === 0) return "";
  return `${(((n2 - n1) / n1) * 100).toFixed(2)}%`;
};

const right = { textAlign: "right", whiteSpace: "nowrap" };

export default function ComparisonPage() {
  // selectors for parts
  const [partIndexLeft, setPartIndexLeft] = useState(0);
  const [partIndexRight, setPartIndexRight] = useState(1);

  const [periodeLeft, setPeriodeLeft] = useState("2025");
  const [periodeRight, setPeriodeRight] = useState("2026");

  const [comparisonData, setComparisonData] = useState([]);
  const [cpsComparisonData, setCpsComparisonData] = useState([]);

  useEffect(() => {
    const comparisonUrl = `${import.meta.env.BASE_URL}comparison.json`;
    const cpsComparisonUrl = `${import.meta.env.BASE_URL}cpsComparison.json`
    fetch(comparisonUrl)
      .then(res => res.json())
      .then(data => setComparisonData(data));
    
    fetch(cpsComparisonUrl)
      .then(res => res.json())
      .then(data => setCpsComparisonData(data));
  }, []);

  if (comparisonData.length === 0) {
    return <div>Loading...</div>;
  }

  // Get selected parts
  const partLeft = comparisonData[partIndexLeft];
  const partRight = comparisonData[partIndexRight];

  // derived totals
  const innerTotalLeft = partLeft.materials.inner.reduce((s, m) => s + m.value, 0);
  const innerTotalRight = partRight.materials.inner.reduce((s, m) => s + m.value, 0);
  const outerTotalLeft = partLeft.materials.outer.reduce((s, m) => s + m.value, 0);
  const outerTotalRight = partRight.materials.outer.reduce((s, m) => s + m.value, 0);
  const materialTotalLeft = innerTotalLeft + outerTotalLeft;
  const materialTotalRight = innerTotalRight + outerTotalRight;

  const laborTotalLeft = partLeft.labor.dl + partLeft.labor.idl + partLeft.labor.facility;
  const laborTotalRight = partRight.labor.dl + partRight.labor.idl + partRight.labor.facility;

  const inlandTotalLeft = partLeft.inland.inlandCost + partLeft.inland.milkrunCost;
  const inlandTotalRight = partRight.inland.inlandCost + partRight.inland.milkrunCost;

  return (
    <div className="container mt-3">
      <h5>Packing Cost Comparison</h5>

      <table className="table table-bordered table-sm" style={{ fontSize: "0.85rem" }}>
        <thead style={{ backgroundColor: "#efefef" }}>
          <tr>
            <th>Part No</th>
            <th>
              <select className="form-control form-control-sm" value={partIndexLeft} onChange={(e) => setPartIndexLeft(Number(e.target.value))}>
                {comparisonData.map((p, i) => <option key={i} value={i}>{p.partNo} - {p.code}</option>)}
              </select>
            </th>
            <th>
              <select className="form-control form-control-sm" value={partIndexRight} onChange={(e) => setPartIndexRight(Number(e.target.value))}>
                {comparisonData.map((p, i) => <option key={i} value={i}>{p.partNo} - {p.code}</option>)}
              </select>
            </th>
            <th>Diff</th>
          </tr>

          <tr>
            <th>Periode</th>
            <th><input value={periodeLeft} onChange={e => setPeriodeLeft(e.target.value)} className="form-control form-control-sm" /></th>
            <th><input value={periodeRight} onChange={e => setPeriodeRight(e.target.value)} className="form-control form-control-sm" /></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {/* Part Info */}
          <tr>
            <td>Part Name</td>
            <td>{partLeft?.name || ""}</td>
            <td>{partRight?.name || ""}</td>
            <td></td>
          </tr>
          <tr>
            <td>Supplier</td>
            <td>{partLeft?.supplier || ""}</td>
            <td>{partRight?.supplier || ""}</td>
            <td></td>
          </tr>

          {/* TOTAL COST */}
          <tr style={{ fontWeight: "bold" }}>
            <td>TOTAL COST (Rp)</td>
            <td style={right}>{fmt(partLeft?.totalCost)}</td>
            <td style={right}>{fmt(partRight?.totalCost)}</td>
            <td style={right}>{calcDiff(partLeft?.totalCost, partRight?.totalCost)}</td>
          </tr>

          {/* MATERIAL */}
          <CollapsibleRow
            title="Material (Rp)"
            value1={fmt(materialTotalLeft)}
            value2={fmt(materialTotalRight)}
            diff={calcDiff(materialTotalLeft, materialTotalRight)}
          >
            {/* INNER */}
            <CollapsibleRow
              title="Inner (Rp)"
              value1={fmt(innerTotalLeft)}
              value2={fmt(innerTotalRight)}
              diff={calcDiff(innerTotalLeft, innerTotalRight)}
              style={{ paddingLeft: "15px" }}
            >
              {partLeft.materials.inner.map((mat, i) => {
                const matRight = partRight.materials.inner[i];
                return (
                  <React.Fragment key={`inner-${i}`}>
                    <tr>
                      <td style={{ paddingLeft: "20px" }}>{mat.name}</td>
                      <td style={right}>{fmt(mat.value)}</td>
                      <td style={right}>{fmt(matRight?.value)}</td>
                      <td style={right}>{calcDiff(mat.value, matRight?.value)}</td>
                    </tr>

                    {/* details moved to 2nd & 3rd columns */}
                    <tr>
                      <td></td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Material No: {mat.detail.partNo}</div>
                        <div>- Code: {mat.detail.code}</div>
                        <div>- Qty: {fmt(mat.detail.qty)}</div>
                        <div>- Price: {fmtPrice(mat.detail.price)}</div>
                        <div>- Subtotal: {fmt(mat.detail.qty * mat.detail.price)}</div>
                      </td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Material No: {matRight?.detail.partNo}</div>
                        <div>- Code: {matRight?.detail.code}</div>
                        <div>- Qty: {fmt(matRight?.detail.qty)}</div>
                        <div>- Price: {fmtPrice(matRight?.detail.price)}</div>
                        <div>- Subtotal: {fmt(matRight?.detail.qty * matRight?.detail.price)}</div>
                      </td>
                      <td></td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </CollapsibleRow>

            {/* OUTER */}
            <CollapsibleRow
              title="Outer (Rp)"
              value1={fmt(outerTotalLeft)}
              value2={fmt(outerTotalRight)}
              diff={calcDiff(outerTotalLeft, outerTotalRight)}
              style={{ paddingLeft: "15px" }}
            >
              {partLeft.materials.outer.map((mat, i) => {
                const matRight = partRight.materials.outer[i];
                return (
                  <React.Fragment key={`outer-${i}`}>
                    <tr>
                      <td style={{ paddingLeft: "20px" }}>{mat.name}</td>
                      <td style={right}>{fmt(mat.value)}</td>
                      <td style={right}>{fmt(matRight?.value)}</td>
                      <td style={right}>{calcDiff(mat.value, matRight?.value)}</td>
                    </tr>

                    <tr>
                      <td></td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Part No: {mat.detail.partNo}</div>
                        <div>- Code: {mat.detail.code}</div>
                        <div>- Qty: {fmt(mat.detail.qty)}</div>
                        <div>- Price: {fmtPrice(mat.detail.price)}</div>
                        <div>- Subtotal: {fmt(mat.detail.qty * mat.detail.price)}</div>
                      </td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Part No: {matRight?.detail.partNo}</div>
                        <div>- Code: {matRight?.detail.code}</div>
                        <div>- Qty: {fmt(matRight?.detail.qty)}</div>
                        <div>- Price: {fmtPrice(matRight?.detail.price)}</div>
                        <div>- Subtotal: {fmt(matRight?.detail.qty * matRight?.detail.price)}</div>
                      </td>
                      <td></td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </CollapsibleRow>
          </CollapsibleRow>

          {/* LABOR */}
          <CollapsibleRow
            title="Labor (Rp)"
            value1={fmt(laborTotalLeft)}
            value2={fmt(laborTotalRight)}
            diff={calcDiff(laborTotalLeft, laborTotalRight)}
          >
            <tr>
              <td style={{ paddingLeft: "20px" }}>- DL</td>
              <td style={right}>{fmt(partLeft.labor.dl)}</td>
              <td style={right}>{fmt(partRight.labor.dl)}</td>
              <td style={right}>{calcDiff(partLeft.labor.dl, partRight.labor.dl)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- IDL</td>
              <td style={right}>{fmt(partLeft.labor.idl)}</td>
              <td style={right}>{fmt(partRight.labor.idl)}</td>
              <td style={right}>{calcDiff(partLeft.labor.idl, partRight.labor.idl)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Facility/Others</td>
              <td style={right}>{fmt(partLeft.labor.facility)}</td>
              <td style={right}>{fmt(partRight.labor.facility)}</td>
              <td style={right}>{calcDiff(partLeft.labor.facility, partRight.labor.facility)}</td>
            </tr>
          </CollapsibleRow>

          {/* INLAND */}
          <CollapsibleRow
            title="Inland (Rp)"
            value1={fmt(inlandTotalLeft)}
            value2={fmt(inlandTotalRight)}
            diff={calcDiff(inlandTotalLeft, inlandTotalRight)}
          >
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Inland Cost</td>
              <td style={right}>{fmt(partLeft.inland.inlandCost)}</td>
              <td style={right}>{fmt(partRight.inland.inlandCost)}</td>
              <td style={right}>{calcDiff(partLeft.inland.inlandCost, partRight.inland.inlandCost)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Milkrun Cost</td>
              <td style={right}>{fmt(partLeft.inland.milkrunCost)}</td>
              <td style={right}>{fmt(partRight.inland.milkrunCost)}</td>
              <td style={right}>{calcDiff(partLeft.inland.milkrunCost, partRight.inland.milkrunCost)}</td>
            </tr>
          </CollapsibleRow>
        </tbody>
      </table>
    </div>
  );
}