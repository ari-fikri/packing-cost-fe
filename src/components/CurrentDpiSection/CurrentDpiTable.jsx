import React from "react";

import {
  InnerGroupHeaders,
  InnerLeafHeaders,
  InnerLeafCells,
} from "./InnerInfoColumns";
import {
  OuterGroupHeaders,
  OuterLeafHeaders,
  OuterLeafCells,
} from "./OuterInfoColumns";
import {
  SubTotalHeaders,
  SubTotalData,
} from "../CurrentCpsSection/SubTotalColumns";
import {
  LaborManHourHeaders,
  LaborCostHeaders,
  LaborManHourCells,
  LaborCostCells,
} from "../CurrentCpsSection/LaborInfoColumns";
import {
  InlandLeafHeaders,
  InlandLeafCells,
} from "../CurrentCpsSection/InlandColumns";

export default function CurrentDpiTable({ current = {} }) {
  const innerCount = current.innerMaterials?.length || 1;
  const outerCount = current.outerMaterials?.length || 1;

  const innerData = current.innerMaterials || [];
  const outerData = current.outerMaterials || [];

  const labor = current.labor || {};
  const inland = current.inland || {};

  return (
    <div
      className="table-responsive mt-2"
      style={{ overflowX: "auto", overflowY: "hidden" }}
    >
      <table
        className="table table-sm table-bordered mb-0 text-center"
        style={{ tableLayout: "fixed", width: "3000px" }}
      >
        <thead style={{ fontSize: '8pt' }}>
          <tr>
            <th rowSpan={3} className="align-middle">
              No
            </th>
            <th rowSpan={3} className="align-middle">
              Rec No
            </th>
            <th rowSpan={3} className="align-middle">
              CPS No
            </th>
            <th colSpan={7} className="align-middle">
              Part Information
            </th>
            <th colSpan={4} className="align-middle">
              Sub Total (USD)
            </th>
            <th rowSpan={3} className="align-middle">
              Diff (%)
            </th>
            <th colSpan={innerCount > 0 ? innerCount * 2 + 6 : 0}>Inner Materials</th>
            <th colSpan={outerCount > 0 ? outerCount * 2 + 6 : 0}>Outer Materials</th>
            <th colSpan={5}>Labor Man Hour</th>
            <th colSpan={5}>Labor Cost</th>
            <th colSpan={2}>Inland Trucking Cost</th>
          </tr>
          <tr>
            <th rowSpan={2} className="align-middle">
              Part No
            </th>
            <th rowSpan={2} className="align-middle">
              Part Name
            </th>
            <th rowSpan={2} className="align-middle">
              Parent Part
            </th>
            <th rowSpan={2} className="align-middle">
              Supplier Code
            </th>
            <th rowSpan={2} className="align-middle">
              Supplier Name
            </th>
            <th rowSpan={2} className="align-middle">
              Weight/Pc (Kg)
            </th>
            <th rowSpan={2} className="align-middle">
              Qty/Box
            </th>

            <SubTotalHeaders />

            <InnerGroupHeaders count={innerCount} />
            <OuterGroupHeaders count={outerCount} />

            <LaborManHourHeaders />
            <LaborCostHeaders />

            <InlandLeafHeaders />
          </tr>
          <tr>
            <InnerLeafHeaders count={innerCount} />
            <OuterLeafHeaders count={outerCount} />
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
            <InnerLeafCells data={innerData} count={innerCount} />

            {/* Outer materials data cells */}
            <OuterLeafCells data={outerData} count={outerCount} />

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
  );
}