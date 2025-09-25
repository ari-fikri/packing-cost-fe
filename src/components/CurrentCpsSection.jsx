// CurrentCpsSection.jsx
import React from "react";

import { InnerGroupHeaders, InnerLeafHeaders, InnerLeafCells } from "./CurrentCpsSection/InnerInfoColumns"
import { OuterGroupHeaders, OuterLeafHeaders, OuterLeafCells } from "./CurrentCpsSection/OuterInfoColumns";
import { SubTotalHeaders, SubTotalData } from "./CurrentCpsSection/SubTotalColumns";
import { LaborManHourHeaders, LaborCostHeaders, LaborManHourCells, LaborCostCells } from "./CurrentCpsSection/LaborInfoColumns";
import { InlandLeafHeaders, InlandLeafCells } from "./CurrentCpsSection/InlandColumns";

export default function CurrentCpsSection({ current = {}, scrollRef, onScroll }) {
  const INNER_COUNT = 10;
  const OUTER_COUNT = 10;

  const innerData = current.innerMaterials || [];
  const outerData = current.outerMaterials || [];

  const labor = current.labor || {};
  const inland = current.inland || {};

  // compute a reasonable minWidth based on leaf columns
  const leafColumns =
    1 + // action
    2 + // rec + cps
    7 + // part info fields
    5 + // sub totals (Inner/Outer/Material/Labor/Inland)
    1 + // diff
    INNER_COUNT * 4 +
    OUTER_COUNT * 4 +
    13 + // man hour leafs
    4 + // labor cost
    4; // inland leafs
  const approxColWidth = 90;
  const minWidthPx = Math.max(1200, leafColumns * approxColWidth);

  return (
    <div className="mb-3">
      <button type="button" className="btn btn-sm btn-link p-0">
        <i className="fas fa-chevron-down mr-2" />
        <strong>Current CPS (from New CPS modal)</strong>
      </button>

      <div className="card card-body mt-2 p-2">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="table-responsive"
          style={{ overflowX: "auto" }}
        >
          <table
            className="table table-sm table-bordered mb-0 text-center"
            style={{ minWidth: `${minWidthPx}px` }}
          >
            <thead>
              {/* row 1 */}
              <tr style={{ backgroundColor: "#696969", color: "white" }}>
                <th rowSpan={3} style={{width: '50px'}}></th>
                <th rowSpan={3} className="align-middle">Rec No</th>
                <th rowSpan={3} className="align-middle">CPS No</th>

                <th rowSpan={2} colSpan={7} className="align-middle">Part Info</th>

                <th rowSpan={2} colSpan={5} className="align-middle">Sub Total Costs</th>

                <th rowSpan={3} className="align-middle">Diff (%)</th>

                <th colSpan={INNER_COUNT * 4} className="align-middle">Inner Info</th>
                <th colSpan={OUTER_COUNT * 4} className="align-middle">Outer Info</th>

                <th colSpan={13 + 4} className="align-middle">Labor</th>

                <th colSpan={4} rowSpan={2} className="align-middle">Inland</th>
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
                <th className="align-middle" style={{width: '150px'}}>Part No</th>
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

                {/* labor man hour leaf headers */}
                <LaborManHourHeaders />

                {/* labor cost headers */}
                <LaborCostHeaders />

                {/* inland leaf headers */}
                <InlandLeafHeaders />
              </tr>
            </thead>

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
    </div>
  );
}
