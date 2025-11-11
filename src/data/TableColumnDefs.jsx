// src/components/TableColumnDefs.jsx
import React from "react";

export const DEFAULT_INNER = 10;
export const DEFAULT_OUTER = 10;

import {
  InnerGroupHeaders,
  InnerLeafHeaders,
} from "../components/CurrentCpsSection/InnerInfoColumns";
import {
  OuterGroupHeaders,
  OuterLeafHeaders,
} from "../components/CurrentCpsSection/OuterInfoColumns";
import { SubTotalHeaders } from "../components/CurrentCpsSection/SubTotalColumns";
import {
  LaborManHourHeaders,
  LaborCostHeaders,
} from "../components/CurrentCpsSection/LaborInfoColumns";
import { InlandLeafHeaders } from "../components/CurrentCpsSection/InlandColumns";

export function makeColGroup(
  innerCount = DEFAULT_INNER,
  outerCount = DEFAULT_OUTER
) {
  const cols = [];
  const push = (key, w) => cols.push({ key, w });

  // Action column
  push("action", 50);

  // Basic columns
  push("recNo", 80);
  push("cpsNo", 140);

  // Part Info (7)
  push("partNo", 160);
  push("partName", 260);
  push("parentNo", 140);
  push("supplierCode", 140);
  push("supplierName", 200);
  push("weightPerPc", 100);
  push("qtyPerBox", 100);

  // Sub total costs (5)
  push("subInner", 120);
  push("subOuter", 120);
  push("subMaterial", 120);
  push("subLabor", 120);
  push("subInland", 120);

  // Diff
  push("diffPct", 100);

  // Inner Materials (each has 4 subcolumns)
  for (let i = 0; i < innerCount; i++) {
    push(`in_matNo_${i}`, 120);
    push(`in_qty_${i}`, 30);
    push(`in_price_${i}`, 50);
    push(`in_sum_${i}`, 110);
  }

  // Outer Materials
  for (let i = 0; i < outerCount; i++) {
    push(`out_matNo_${i}`, 120);
    push(`out_qty_${i}`, 30);
    push(`out_price_${i}`, 50);
    push(`out_sum_${i}`, 110);
  }

  // Labor - Man Hour Requirement (10 cols)
  const laborMhCols = [
    "receiving",
    "inspection",
    "delivery_course",
    "pallet_supply",
    "binding",
    "non_pallet_supply",
    "pick_packing",
    "empty_box",
    "mix_van",
    "lashing",
  ];
  laborMhCols.forEach((name, idx) => push(`lab_mh_${idx}`, 90));

  // Labor Cost (4)
  push("labCostCurrent", 130);
  push("labCostDL", 130);
  push("labCostIDL", 130);
  push("labCostFacility", 130);

  // Inland (4)
  push("inland_packTime", 140);
  push("inland_costM3", 140);
  push("inland_diff", 120);
  push("inland_milkrun", 140);

  const totalWidth = cols.reduce((s, c) => s + c.w, 0);

  const colGroup = (
    <>
    {/*console.log("<<<<< --- entering TableColumnDefs.jsx")*/}
      <colgroup>
        {cols.map((c, i) => (
          <col
            key={`${c.key}-${i}`}
            style={{
              width: `${c.w}px`,
              minWidth: `${c.w}px`,
            }}
          />
        ))}
      </colgroup>
      <thead>
        {/* ROW 1 */}
        <tr>
          <th rowSpan={3} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Action</th>
          <th rowSpan={3} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Rec No</th>
          <th rowSpan={3} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>CPS No</th>
          <th colSpan={7} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Part Info</th>
          <th colSpan={5} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Sub Total</th>
          <th rowSpan={3} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Diff (%)</th>
          <th colSpan={innerCount * 4} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Inner Materials</th>
          <th colSpan={outerCount * 4} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Outer Materials</th>
          <th colSpan={10} rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Labor Man Hour Requirement</th>
          <th colSpan={4} rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Labor Cost</th>
          <th colSpan={4} rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#f8f9fa' }}>Inland</th>
        </tr>
        {/* ROW 2 */}
        <tr>
          {/* Part Info Headers */}
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Part No</th>
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Part Name</th>
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Parent Part No</th>
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Supplier Code</th>
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Supplier Name</th>
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Weight/Pc (kg)</th>
          <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>Qty/Box</th>
          
          {/* SubTotal Headers */}
          <SubTotalHeaders />

          {/* Inner/Outer Material Groups */}
          <InnerGroupHeaders count={innerCount} />
          <OuterGroupHeaders count={outerCount} />
        </tr>
        {/* ROW 3 */}
        <tr>
          <InnerLeafHeaders count={innerCount} />
          <OuterLeafHeaders count={outerCount} />
          <LaborManHourHeaders />
          <LaborCostHeaders />
          <InlandLeafHeaders />
        </tr>
      </thead>
    </>
  );

  return { colGroup, totalWidth, cols };
}