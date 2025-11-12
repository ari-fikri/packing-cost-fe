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
          className="table table-sm table-bordered mb-0 text-center table-font-size-10pt"
          style={{ minWidth: `${totalWidth}px`, tableLayout: 'fixed' }}
        >
          {colGroup}
          <thead>
            {/* row 1 */}
            <tr>
              <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap"></th>
              <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">No</th>
              <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">CPS No</th>

              <th rowSpan={2} colSpan={7} className="align-middle border text-center tbl-row1-hdr text-nowrap">Part Info</th>
              <th rowSpan={2} colSpan={5} className="align-middle border text-center tbl-row1-hdr text-nowrap">Sub Total Costs</th>

              <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">Diff (%)</th>

              <th colSpan={INNER_COUNT * 4} className="align-middle border text-center tbl-row1-hdr text-nowrap">Inner Info</th>
              <th colSpan={OUTER_COUNT * 4} className="align-middle border text-center tbl-row1-hdr text-nowrap">Outer Info</th>

              <th colSpan={13 + 4} className="align-middle border text-center tbl-row1-hdr text-nowrap">Labor</th>

              <th colSpan={4} rowSpan={2} className="align-middle border text-center tbl-row1-hdr text-nowrap">Inland</th>
            </tr>

            {/* row 2 */}
            <tr>
              <InnerGroupHeaders count={INNER_COUNT} />
              <OuterGroupHeaders count={OUTER_COUNT} />

              <th colSpan={13} className="align-align-middle border text-center tbl-row1-hdr text-nowrap">Man Hour Requirement</th>
              <th colSpan={4} className="align-align-middle border text-center tbl-row1-hdr text-nowrap">Labor Cost</th>
            </tr>

            {/* row 3 */}
            <tr>
              {/* Part Info subheaders (7 columns) */}
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Part No</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Part Name</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Parent No</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Supplier Code</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Supplier Name</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Weight/pc</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Qty/Box</th>

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
  );
}