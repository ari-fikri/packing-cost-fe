// src/components/ResultsSection.jsx
import React from "react";

import { InnerGroupHeaders, InnerLeafHeaders, InnerLeafCells } from "../CurrentCpsSection/InnerInfoColumns"
import { OuterGroupHeaders, OuterLeafHeaders, OuterLeafCells } from "../CurrentCpsSection/OuterInfoColumns";
import { SubTotalHeaders } from "../CurrentCpsSection/SubTotalColumns";
import { LaborManHourHeaders, LaborCostHeaders, LaborManHourCells, LaborCostCells } from "../CurrentCpsSection/LaborInfoColumns";
import { InlandLeafHeaders, InlandLeafCells } from "../CurrentCpsSection/InlandColumns";
import { makeColGroup } from "../../data/TableColumnDefs";

export default function ResultsSection({ filteredParts = [], onSelectPart, scrollRef, onScroll }) {
  const INNER_COUNT = 10;
  const OUTER_COUNT = 10;
  const { colGroup, totalWidth, cols } = makeColGroup(INNER_COUNT, OUTER_COUNT);

  return (
    <div className="mb-1">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="table-responsive"
        style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'auto' }}
      >
        <table
          className="table table-sm table-bordered mb-0 text-center table-font-size-10pt"
          style={{ minWidth: `${totalWidth}px`, tableLayout: 'fixed' }}
        >
          {colGroup}

          <tbody>
            {filteredParts.length === 0 ? (
              <tr><td colSpan={cols.length} className="text-center text-muted py-3">No results</td></tr>
            ) : filteredParts.map((p, idx) => (
              <tr key={idx}>
                <td className="align-middle">
                  <input type="checkbox" onChange={() => onSelectPart(p)} />
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