// src/pages/ComparisonPage.jsx
import React, { useState } from "react";
import CollapsibleRow from "./CollapsibleRow";

// static part data (for combo boxes / display)
const parts = [
  { partNo: "162990E010", code: "00", name: "HOSE, WATER BY-PASS, NO.13", supplier: "IRC INOAC INDONESIA (RUBBER - IRI)" },
  { partNo: "364070K010", code: "00", name: "HOSE SUB-ASSY, TRANSFER BREATHER", supplier: "TOKAI RUBBER AUTO HOSE INDONESIA" },
];

// totals (dummy)
const totalCostLeft = 368;
const totalCostRight = 362.07;

// generator for 10 materials (used for both Inner and Outer)
const makeMaterials = () =>
  Array.from({ length: 10 }, (_, i) => ({
    name: `Material ${i + 1}`,
    value1: 24.0,
    value2: 11.06,
    detail: {
      partNo: `B027-0200${i + 1}`,
      code: "Paper Tape Merk Golda maishu",
      qty: 0.2,
      price: 20700,
    },
  }));

const innerMaterials = makeMaterials();
const outerMaterials = makeMaterials();

// labor / inland left & right (dummy)
const laborLeft = { dl: 14, idl: 26, facility: 15 };
const laborRight = { dl: 11.06, idl: 27, facility: 13 };

const inlandLeft = { inlandCost: 14, milkrunCost: 26 };
const inlandRight = { inlandCost: 11.06, milkrunCost: 27 };

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

  // derived totals
  const innerTotalLeft = innerMaterials.reduce((s, m) => s + m.value1, 0);
  const innerTotalRight = innerMaterials.reduce((s, m) => s + m.value2, 0);
  const outerTotalLeft = outerMaterials.reduce((s, m) => s + m.value1, 0);
  const outerTotalRight = outerMaterials.reduce((s, m) => s + m.value2, 0);
  const materialTotalLeft = innerTotalLeft + outerTotalLeft;
  const materialTotalRight = innerTotalRight + outerTotalRight;

  const laborTotalLeft = laborLeft.dl + laborLeft.idl + laborLeft.facility;
  const laborTotalRight = laborRight.dl + laborRight.idl + laborRight.facility;

  const inlandTotalLeft = inlandLeft.inlandCost + inlandLeft.milkrunCost;
  const inlandTotalRight = inlandRight.inlandCost + inlandRight.milkrunCost;

  return (
    <div className="container mt-3">
      <h5>Packing Cost Comparison</h5>

      <table className="table table-bordered table-sm" style={{ fontSize: "0.85rem" }}>
        <thead style={{ backgroundColor: "#efefef" }}>
          <tr>
            <th>Part No</th>
            <th>
              <select className="form-control form-control-sm" value={partIndexLeft} onChange={(e) => setPartIndexLeft(Number(e.target.value))}>
                {parts.map((p, i) => <option key={i} value={i}>{p.partNo} - {p.code}</option>)}
              </select>
            </th>
            <th>
              <select className="form-control form-control-sm" value={partIndexRight} onChange={(e) => setPartIndexRight(Number(e.target.value))}>
                {parts.map((p, i) => <option key={i} value={i}>{p.partNo} - {p.code}</option>)}
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
            <td>{parts[partIndexLeft]?.name || ""}</td>
            <td>{parts[partIndexRight]?.name || ""}</td>
            <td></td>
          </tr>
          <tr>
            <td>Supplier</td>
            <td>{parts[partIndexLeft]?.supplier || ""}</td>
            <td>{parts[partIndexRight]?.supplier || ""}</td>
            <td></td>
          </tr>

          {/* TOTAL COST */}
          <tr style={{ fontWeight: "bold" }}>
            <td>TOTAL COST (Rp)</td>
            <td style={right}>{fmt(totalCostLeft)}</td>
            <td style={right}>{fmt(totalCostRight)}</td>
            <td style={right}>{calcDiff(totalCostLeft, totalCostRight)}</td>
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
            >
              {innerMaterials.map((mat, i) => {
                const subtotal = mat.detail.qty * mat.detail.price;
                return (
                  <React.Fragment key={`inner-${i}`}>
                    <tr>
                      <td style={{ paddingLeft: "20px" }}>{mat.name}</td>
                      <td style={right}>{fmt(subtotal)}</td>
                      <td style={right}>{fmt(subtotal)}</td>
                      <td></td>
                    </tr>

                    {/* details moved to 2nd & 3rd columns */}
                    <tr>
                      <td></td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Part No: {mat.detail.partNo}</div>
                        <div>- Code: {mat.detail.code}</div>
                        <div>- Qty: {fmt(mat.detail.qty)}</div>
                        <div>- Price: {fmtPrice(mat.detail.price)}</div>
                        <div>- Subtotal: {fmt(subtotal)}</div>
                      </td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Part No: {mat.detail.partNo}</div>
                        <div>- Code: {mat.detail.code}</div>
                        <div>- Qty: {fmt(mat.detail.qty)}</div>
                        <div>- Price: {fmtPrice(mat.detail.price)}</div>
                        <div>- Subtotal: {fmt(subtotal)}</div>
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
            >
              {outerMaterials.map((mat, i) => {
                const subtotal = mat.detail.qty * mat.detail.price;
                return (
                  <React.Fragment key={`outer-${i}`}>
                    <tr>
                      <td style={{ paddingLeft: "20px" }}>{mat.name}</td>
                      <td style={right}>{fmt(subtotal)}</td>
                      <td style={right}>{fmt(subtotal)}</td>
                      <td></td>
                    </tr>

                    <tr>
                      <td></td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Part No: {mat.detail.partNo}</div>
                        <div>- Code: {mat.detail.code}</div>
                        <div>- Qty: {fmt(mat.detail.qty)}</div>
                        <div>- Price: {fmtPrice(mat.detail.price)}</div>
                        <div>- Subtotal: {fmt(subtotal)}</div>
                      </td>
                      <td style={{ paddingLeft: "40px", verticalAlign: "top" }}>
                        <div>- Part No: {mat.detail.partNo}</div>
                        <div>- Code: {mat.detail.code}</div>
                        <div>- Qty: {fmt(mat.detail.qty)}</div>
                        <div>- Price: {fmtPrice(mat.detail.price)}</div>
                        <div>- Subtotal: {fmt(subtotal)}</div>
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
            <tr><td style={{ paddingLeft: "20px" }}>(Rp)</td><td></td><td></td><td></td></tr>

            <tr>
              <td style={{ paddingLeft: "20px" }}>- DL</td>
              <td style={right}>{fmt(laborLeft.dl)}</td>
              <td style={right}>{fmt(laborRight.dl)}</td>
              <td style={right}>{calcDiff(laborLeft.dl, laborRight.dl)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- IDL</td>
              <td style={right}>{fmt(laborLeft.idl)}</td>
              <td style={right}>{fmt(laborRight.idl)}</td>
              <td style={right}>{calcDiff(laborLeft.idl, laborRight.idl)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Facility/Others</td>
              <td style={right}>{fmt(laborLeft.facility)}</td>
              <td style={right}>{fmt(laborRight.facility)}</td>
              <td style={right}>{calcDiff(laborLeft.facility, laborRight.facility)}</td>
            </tr>
          </CollapsibleRow>

          {/* INLAND */}
          <CollapsibleRow
            title="Inland (Rp)"
            value1={fmt(inlandTotalLeft)}
            value2={fmt(inlandTotalRight)}
            diff={calcDiff(inlandTotalLeft, inlandTotalRight)}
          >
            <tr><td style={{ paddingLeft: "20px" }}>(Rp)</td><td></td><td></td><td></td></tr>

            <tr>
              <td style={{ paddingLeft: "20px" }}>- Inland Cost</td>
              <td style={right}>{fmt(inlandLeft.inlandCost)}</td>
              <td style={right}>{fmt(inlandRight.inlandCost)}</td>
              <td style={right}>{calcDiff(inlandLeft.inlandCost, inlandRight.inlandCost)}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: "20px" }}>- Milkrun Cost</td>
              <td style={right}>{fmt(inlandLeft.milkrunCost)}</td>
              <td style={right}>{fmt(inlandRight.milkrunCost)}</td>
              <td style={right}>{calcDiff(inlandLeft.milkrunCost, inlandRight.milkrunCost)}</td>
            </tr>
          </CollapsibleRow>
        </tbody>
      </table>
    </div>
  );
}