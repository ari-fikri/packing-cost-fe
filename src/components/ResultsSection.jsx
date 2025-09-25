// src/components/ResultsSection.jsx
import React from "react";

import { InnerGroupHeaders, InnerLeafHeaders, InnerLeafCells } from "./CurrentCpsSection/InnerInfoColumns"
import { OuterGroupHeaders, OuterLeafHeaders, OuterLeafCells } from "./CurrentCpsSection/OuterInfoColumns";
import { SubTotalHeaders } from "./CurrentCpsSection/SubTotalColumns";
import { LaborManHourHeaders, LaborCostHeaders, LaborManHourCells, LaborCostCells } from "./CurrentCpsSection/LaborInfoColumns";
import { InlandLeafHeaders, InlandLeafCells } from "./CurrentCpsSection/InlandColumns";

export default function ResultsSection({ filteredParts = [], onSelectPart, scrollRef, onScroll }) {
  const INNER_COUNT = 10;
  const OUTER_COUNT = 10;

  const leafColumns =
    1 + // action
    2 + // rec + cps
    7 + // part info fields
    5 + // sub totals (Inner/Outer/Material/Labor/Inland)
    1 + // diff
    INNER_COUNT * 4 +
    OUTER_COUNT * 4 +
    13 + // Labor Man Hour
    4 + // Labor Cost
    4; // Inland
  const approxColWidth = 90;
  const minWidthPx = Math.max(1200, leafColumns * approxColWidth);

  return (
    <div className="mb-1">
      <h6 className="mb-2">Search Results</h6>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="table-responsive"
        style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'auto' }}
      >
        <table
          className="table table-sm table-bordered mb-0 text-center"
          style={{ minWidth: `${minWidthPx}px` }}
        >
          <thead>
            {/* row 1 */}
            <tr style={{ backgroundColor: "#696969", color: "white" }}>
              <th rowSpan={3} className="align-middle">Action</th>
              <th rowSpan={3} className="align-middle">Rec No</th>
              <th rowSpan={3} className="align-middle">CPS No</th>
              <th rowSpan={2} colSpan={7} className="align-middle">Part Info</th>
              <th rowSpan={2} colSpan={5} className="align-middle">Sub Total Costs</th>
              <th rowSpan={3} className="align-middle">Diff (%)</th>
              <th colSpan={INNER_COUNT * 4} className="align-middle">Inner Info</th>
              <th colSpan={OUTER_COUNT * 4} className="align-middle">Outer Info</th>
              <th colSpan={17} className="align-middle">Labor Info</th>
              <th rowSpan={2} colSpan={4} className="align-middle">Inland</th>
            </tr>

            {/* row 2 */}
            <tr style={{ backgroundColor: "#969696", color: "black" }}>
              <InnerGroupHeaders count={INNER_COUNT} />
              <OuterGroupHeaders count={OUTER_COUNT} />
              <th colSpan={13} className="align-middle">Man Hour Requirement</th>
              <th colSpan={4} className="align-middle">Labor Cost</th>
            </tr>

            {/* row 3 */}
            <tr style={{ backgroundColor: "#D8D8D8", color: "black" }}>
              {/* Part Info subheaders (7 columns) */}
              <th className="align-middle">Part No</th>
              <th className="align-middle">Part Name</th>
              <th className="align-middle">Parent No</th>
              <th className="align-middle">Supplier Code</th>
              <th className="align-middle">Supplier Name</th>
              <th className="align-middle">Weight/pc</th>
              <th className="align-middle">Qty/Box</th>

              {/* Sub totals */}
              <SubTotalHeaders />

              {/* inner leaf headers */}
              <InnerLeafHeaders count={INNER_COUNT} />

              {/* outer leaf headers */}
              <OuterLeafHeaders count={OUTER_COUNT} />

              {/* labor leaf headers */}
              <LaborManHourHeaders />
              <LaborCostHeaders />

              {/* inland leaf headers */}
              <InlandLeafHeaders />
            </tr>
          </thead>

          <tbody>
            {filteredParts.length === 0 ? (
              <tr><td colSpan={leafColumns} className="text-center text-muted py-3">No results</td></tr>
            ) : filteredParts.map((p, idx) => (
              <tr key={idx}>
                <td className="align-middle">
                  <div className="btn-group btn-group-sm" role="group">
                    <button className="btn btn-outline-primary" onClick={() => onSelectPart(p)}>Select</button>
                    <button className="btn btn-outline-secondary" onClick={() => alert(`View ${p.partNo}`)}>View</button>
                  </div>
                </td>

                {/* Rec & CPS */}
                <td className="align-middle">{p.recNo ?? "-"}</td>
                <td className="align-middle">{p.cpsNo ?? "-"}</td>

                {/* Part Info */}
                <td className="align-middle">{p.partNo ?? "-"}</td>
                <td className="align-.middle">{p.name ?? "-"}</td>
                <td className="align-middle">{p.parentNo ?? "-"}</td>
                <td className="align-middle">{p.supplierCode ?? "-"}</td>
                <td className="align-middle">{p.supplierName ?? "-"}</td>
                <td className="align-middle">{p.weightPerPc ?? "-"}</td>
                <td className="align-middle">{p.qtyPerBox ?? "-"}</td>

                {/* SubTotals */}
                <td className="align-middle">{p.subTotalInner ?? "-"}</td>
                <td className="align-middle">{p.subTotalOuter ?? "-"}</td>
                <td className="align-middle">{p.subTotalMaterial ?? "-"}</td>
                <td className="align-middle">{p.subTotalLabor ?? "-"}</td>
                <td className="align-middle">{p.subTotalInland ?? "-"}</td>

                {/* Diff */}
                <td className="align-middle">{p.diffPct ?? "-"}</td>

                {/* Inner materials data cells */}
                <InnerLeafCells data={p.innerMaterials} count={INNER_COUNT} />

                {/* Outer materials data cells */}
                <OuterLeafCells data={p.outerMaterials} count={OUTER_COUNT} />

                {/* Labor cells */}
                <LaborManHourCells labor={p.labor} />
                <LaborCostCells labor={p.labor} />

                {/* Inland cells */}
                <InlandLeafCells inland={p.inland} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}