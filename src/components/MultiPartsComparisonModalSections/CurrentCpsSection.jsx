// CurrentCpsSection.jsx
import React from "react";

import { InnerGroupHeaders, InnerLeafHeaders, InnerLeafCells } from "../CurrentCpsSection/InnerInfoColumns"
import { OuterGroupHeaders, OuterLeafHeaders, OuterLeafCells } from "../CurrentCpsSection/OuterInfoColumns";
import { SubTotalHeaders, SubTotalData } from "../CurrentCpsSection/SubTotalColumns";
import { LaborManHourHeaders, LaborCostHeaders, LaborManHourCells, LaborCostCells } from "../CurrentCpsSection/LaborInfoColumns";
import { InlandLeafHeaders, InlandLeafCells } from "../CurrentCpsSection/InlandColumns";
import { makeColGroup } from "../../data/TableColumnDefs";

export default function CurrentCpsSection({ current = {}, scrollRef, onScroll }) {
  const INNER_COUNT = 10;
  const OUTER_COUNT = 10;

  const innerData = current.innerMaterials || [];
  const outerData = current.outerMaterials || [];

  const labor = current.labor || {};
  const inland = current.inland || {};

  const { colGroup, totalWidth } = makeColGroup(INNER_COUNT, OUTER_COUNT);

  return (
    <div className="mb-3">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="table-responsive mt-2"
        style={{ overflowX: "auto", overflowY: "hidden" }}
      >
        <table
          className="table table-sm table-bordered mb-0 text-center"
          style={{ minWidth: `${totalWidth}px`, tableLayout: 'fixed' }}
        >
          {colGroup}
          <tbody>
            <tr>
              <td></td>
              {/* Rec & CPS */}
              <td className="align-middle">{current.recNo ?? "-"}</td>
              <td className="align-middle">{current.cpsNo ?? "-"}</td>

              {/* Part Info */}
              <td className="align-middle">{current.partNo ?? "-"}</td>
              <td className="align-middle">{current.partName ?? "-"}</td>
              <td className="align-middle">{current.parentNo ?? "-"}</td>
              <td className="align-middle">{current.supplierCode ?? "-"}</td>
              <td className="align-middle">{current.supplierName ?? "-"}</td>
              <td className="align-middle">{current.weightPerPc ?? "-"}</td>
              <td className="align-middle">{current.qtyPerBox ?? "-"}</td>

              {/* SubTotals */}
              <SubTotalData current={current} />

              {/* Diff (was already placed earlier in header as rowSpan 3) */}
              <td className="align-middle">{current.diffPct ?? "-"}</td>

              {/* Inner materials data cells */}
              <InnerLeafCells data={innerData} count={INNER_COUNT} />

              {/* Outer materials data cells */}
              <OuterLeafCells data={outerData} count={OUTER_COUNT} />

              {/* Labor man hour cells */}
              <LaborManHourCells labor={labor} />

              {/* Labor cost cells */}
              <LaborCostCells labor={labor} />

              {/* Inland cells */}
              <InlandLeafCells inland={inland} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}