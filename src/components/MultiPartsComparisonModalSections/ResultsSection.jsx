// src/components/ResultsSection.jsx
import React from "react";

import { InnerGroupHeaders, InnerLeafHeaders, InnerLeafCells } from "../CurrentCpsSection/InnerInfoColumns"
import { OuterGroupHeaders, OuterLeafHeaders, OuterLeafCells } from "../CurrentCpsSection/OuterInfoColumns";
import { SubTotalHeaders, SubTotalData } from "../CurrentCpsSection/SubTotalColumns";
import { LaborManHourHeaders, LaborCostHeaders, LaborManHourCells, LaborCostCells } from "../CurrentCpsSection/LaborInfoColumns";
import { InlandLeafHeaders, InlandLeafCells } from "../CurrentCpsSection/InlandColumns";
import { makeColGroup } from "../../data/TableColumnDefs";
import { PartInfoCells } from "./PartInfoColumns";

export default function ResultsSection({ filteredParts = [], onSelectPart, scrollRef, onScroll, isPseUser, innerCount, outerCount }) {
  const { colGroup, totalWidth, cols } = makeColGroup(innerCount, outerCount, isPseUser);

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
                <PartInfoCells part={p} />

                {/* SubTotals */}
                {!isPseUser && <SubTotalData data={p} />}

                {/* Diff */}
                {!isPseUser && <td className="align-middle">{p.diffPct ?? "-"}</td>}

                {/* Inner materials data cells */}
                <InnerLeafCells data={p.inner} count={innerCount} isPseUser={isPseUser} />

                {/* Outer materials data cells */}
                <OuterLeafCells data={p.outer} count={outerCount} isPseUser={isPseUser} />

                {/* Labor cells */}
                {!isPseUser && <LaborManHourCells labor={p.labor} />}
                {!isPseUser && <LaborCostCells labor={p.labor} />}

                {/* Inland cells */}
                {!isPseUser && <InlandLeafCells inland={p.inland} />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}