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
export function makeColGroup(innerCount = 0, outerCount = 0, isPseUser = false) {
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

  if (!isPseUser) {
    // Sub total costs (5)
    push("subInner", 120);
    push("subOuter", 120);
    push("subMaterial", 120);
    push("subLabor", 120);
    push("subInland", 120);
  
    // Diff
    push("diffPct", 100);
  }

  // Inner Materials (each has 4 subcolumns)
  for (let i = 0; i < innerCount; i++) {
    push(`in_matNo_${i}`, 100);
    push(`in_qty_${i}`, 50);
    if (!isPseUser) {
      push(`in_price_${i}`, 70);
      push(`in_sum_${i}`, 100);
    }
  }

  // Outer Materials
  for (let i = 0; i < outerCount; i++) {
    push(`out_matNo_${i}`, 100);
    push(`out_qty_${i}`, 50);
    if (!isPseUser) {
      push(`out_price_${i}`, 70);
      push(`out_sum_${i}`, 100);
    }
  }

  // Labor (Man Hour)
  if (!isPseUser) {
    push("lab_mh_receiving", 90);
    push("lab_mh_inspection", 90);
    push("lab_mh_deliveryCourse", 120);
    push("lab_mh_palletSupply", 110);
    push("lab_mh_binding", 90);
    push("lab_mh_sorting", 120);
    push("lab_mh_pickPacking", 120);
    push("lab_mh_vanning", 90);
    push("lab_mh_boxValetReturn", 120);
    push("lab_mh_mixVan", 90);
    push("lab_mh_lashing", 90);
    push("lab_mh_totalTimeReq", 110);
    push("lab_mh_others", 90);
  
    // Labor (Cost)
    push("lab_cost_direct", 90);
    push("lab_cost_indirect", 90);
    push("lab_cost_subTotal", 100);
    push("lab_cost_costPerPc", 110);
    
    // Inland
    push("inland_trucking", 150);
    push("inland_clp", 120);
    push("inland_delivery", 70);
    push("inland_total", 100);
  }

  const totalWidth = cols.reduce((sum, c) => sum + c.w, 0);

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