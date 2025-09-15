// src/components/packing/LaborSubTable.jsx
import React from "react";

/**
 * LaborSubTable
 * props:
 *  - part: part object (used for partNo / boxM3 if needed)
 *  - labor: { totalCost, prevYear, diff } (optional)
 *
 * This component renders:
 *  - a left-aligned "LABOR" title row
 *  - a second header row with many columns (Receiving, Inspection, Delivery Course, (Pallet) Supply, Binding,
 *    Sorting & Supply, Pick & Packing, Vanning, Box/Valet Return, Mix Van, Lashing, Total Time, Requirement,
 *    Current, DL, IDL, Facility Others)
 *  - a single data row with simple derived values from labor.totalCost so the UI isn't empty.
 */
export default function LaborSubTable({ part = {}, labor = { totalCost: 0 } }) {
  const total = Number(labor.totalCost || 0);

  // Simple allocation heuristics (so cells contain values). Replace with your real formulas.
  const receiving = Math.round(total * 0.12);
  const inspection = Math.round(total * 0.08);
  const deliveryCourse = Math.round(total * 0.10);
  const palletSupply = Math.round(total * 0.06);
  const binding = Math.round(total * 0.05);
  const sortingSupply = Math.round(total * 0.10);
  const pickPack = Math.round(total * 0.18);
  const vanning = Math.round(total * 0.12);
  const boxValet = Math.round(total * 0.06);
  const mixVan = Math.round(total * 0.05);
  const lashing = Math.round(total * 0.05);

  const totalTime = receiving + inspection + deliveryCourse + palletSupply + binding + sortingSupply + pickPack + vanning + boxValet + mixVan + lashing;

  // Requirement / Current / DL / IDL / Facility Others - small heuristics
  const requirement = 1; // e.g. man count
  const current = Math.round(totalTime / Math.max(1, requirement));
  const dl = Math.round(current * 0.6);
  const idl = Math.round(current * 0.4);
  const facilityOthers = Math.round(total * 0.02);

  const fmt = (v) => (v === null || v === undefined || v === 0 ? (v === 0 ? "0" : "") : String(v));

  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          {/* Title row: left aligned LABOR */}
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={17} className="text-left">
              <strong>LABOR</strong>
            </th>
          </tr>

          {/* Detailed header row */}
          <tr style={{ backgroundColor: "#efefef" }}>
            <th>Receiving</th>
            <th>Inspection</th>
            <th>Delivery Course</th>
            <th>(Pallet) Supply</th>
            <th>Binding</th>
            <th>Sorting & Supply</th>
            <th>Pick & Packing</th>
            <th>Vanning</th>
            <th>Box/Valet Return</th>
            <th>Mix Van</th>
            <th>Lashing</th>
            <th>Total Time</th>
            <th>Requirement</th>
            <th>Current</th>
            <th>DL</th>
            <th>IDL</th>
            <th>Facility Others</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{fmt(receiving)}</td>
            <td>{fmt(inspection)}</td>
            <td>{fmt(deliveryCourse)}</td>
            <td>{fmt(palletSupply)}</td>
            <td>{fmt(binding)}</td>
            <td>{fmt(sortingSupply)}</td>
            <td>{fmt(pickPack)}</td>
            <td>{fmt(vanning)}</td>
            <td>{fmt(boxValet)}</td>
            <td>{fmt(mixVan)}</td>
            <td>{fmt(lashing)}</td>

            <td>{fmt(totalTime)}</td>
            <td>{fmt(requirement)}</td>
            <td>{fmt(current)}</td>
            <td>{fmt(dl)}</td>
            <td>{fmt(idl)}</td>
            <td>{fmt(facilityOthers)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
