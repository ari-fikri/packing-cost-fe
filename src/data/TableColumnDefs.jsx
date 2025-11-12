// src/components/TableColumnDefs.jsx
import React from "react";

export const DEFAULT_INNER = 10;
export const DEFAULT_OUTER = 10;

/**
 * Generates a <colgroup> and a totalWidth (px) for a table that has:
 * - action
 * - recNo, cpsNo
 * - part info (7 columns)
 * - sub total (5)
 * - diff
 * - innerCount * (MatNo, Qty, Price, Sum)
 * - outerCount * (MatNo, Qty, Price, Sum)
 * - labor man-hour (13 cols)
 * - labor cost (4 cols)
 * - inland (4 cols)
 *
 * Returns: { colGroup: JSX, totalWidth: number, cols: Array }
 */
export function makeColGroup(innerCount = DEFAULT_INNER, outerCount = DEFAULT_OUTER) {
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
    push(`in_matNo_${i}`, 100);
    push(`in_qty_${i}`, 50);
    push(`in_price_${i}`, 70);
    push(`in_sum_${i}`, 100);
  }

  // Outer Materials
  for (let i = 0; i < outerCount; i++) {
    push(`out_matNo_${i}`, 100);
    push(`out_qty_${i}`, 50);
    push(`out_price_${i}`, 70);
    push(`out_sum_${i}`, 100);
  }

  // Labor - Man Hour Requirement (13 cols)
  //const laborMhCols = [;
    push("receiving",90);
    push("inspection",90);
    push("deliveryCourse",150);
    push("palletSupply",90);
    push("binding",90);
    push("sorting",90);
    push("pickPacking",90);
    push("vanning",90);
    push("boxValetReturn",90);
    push("mixVan",90);
    push("lashing",90);
    push("totalTimeReq",90);
    push("others",90);
  //];
  //laborMhCols.forEach((name, idx) => push(`lab_mh_${idx}`, 190));

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
  );

  return { colGroup, totalWidth, cols };
}
