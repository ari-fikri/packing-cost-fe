import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  Save,
  X,
} from 'lucide-react';
import Pagination from '../Pagination';
import MaterialCostDetail from './MaterialCostDetail';

/**
 * Formats a numeric value to two decimal places.
 * Returns an empty string for null, undefined, or empty values.
 * Returns the original value if it's not a number.
 * @param {*} v - The value to format.
 * @returns {string} The formatted value.
 */
const fmt = (v) => {
  if (v === null || v === undefined || v === "") return "";
  const num = Number(v);
  if (isNaN(num)) return String(v);
  return num.toFixed(2);
};

/**
 * Displays the results table for the Packing Cost New Modal.
 * Shows calculated part data with various cost breakdowns.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.visibleParts - The parts to display on the current page.
 * @param {object} props.selectedRows - An object tracking which rows are selected.
 * @param {function} props.handleCheckboxChange - Handler for checkbox changes.
 * @param {number} props.page - The current page number.
 * @param {number} props.perPage - The number of items per page.
 * @param {object} props.remarks - An object storing remarks for each part.
 * @param {function} props.handleRemarkChange - Handler for remark input changes.
 * @param {object} props.expandedRows - An object tracking which rows are expanded.
 * @param {function} props.handleToggleExpand - Handler to toggle the expanded state of a row.
 * @param {number} [props.threshold_percentage=5] - The percentage threshold to highlight differences.
 */
export default function ResultSection({
  visibleParts,
  selectedRows,
  handleCheckboxChange,
  page,
  perPage,
  remarks,
  handleRemarkChange,
  expandedRows,
  handleToggleExpand,
  threshold_percentage = 5,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm text-center w-100" style={{ fontSize: '8pt' }}>
        {/* Table Header */}
        <thead>
          <tr style={{ backgroundColor: "#f7fbff" }}>
            {/* Checkbox for selecting all visible rows */}
            <th rowSpan={2} style={{ width: 40 }}>
              <input
                type="checkbox"
                checked={
                  visibleParts.length > 0 &&
                  visibleParts.every((_, i) => selectedRows[(page - 1) * perPage + i])
                }
                onChange={e => {
                  const checked = e.target.checked;
                  const newSelectedRows = { ...selectedRows };
                  visibleParts.forEach((_, i) => {
                    newSelectedRows[(page - 1) * perPage + i] = checked;
                  });
                  handleCheckboxChange(newSelectedRows);
                }}
              />
            </th>
            <th rowSpan={2} style={{ width: 40 }}></th>
            <th rowSpan={2} style={{ width: 40 }}>No</th>
            <th rowSpan={2}>Part No</th>
            <th rowSpan={2}>Suffix</th>
            <th rowSpan={2}>Part Name</th>
            <th rowSpan={2}>Parent Part No</th>
            <th rowSpan={2}>Supplier Code</th>
            <th rowSpan={2}>Supplier Name</th>
            <th rowSpan={2}>L</th>
            <th rowSpan={2}>W</th>
            <th rowSpan={2}>H</th>
            <th rowSpan={2}>Box M3</th>
            <th colSpan={3}>INNER</th>
            <th colSpan={3}>OUTER</th>
            <th colSpan={3}>MATERIAL</th>
            <th colSpan={3}>LABOR</th>
            <th colSpan={3}>INLAND</th>
            <th colSpan={3}>TOTAL</th>
            <th rowSpan={2}>Remark</th>
          </tr>
          {/* Sub-headers for cost breakdowns */}
          <tr style={{ backgroundColor: "#dee2e6" }}>
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <th>Prev</th>
                <th>Current</th>
                <th>Diff</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {visibleParts.length === 0 ? (
            // Display when no data is available
            <tr>
              <td colSpan={32} className="text-center py-4 text-muted">No Data Found</td>
            </tr>
          ) : (
            // Map through visible parts to create table rows
            visibleParts.map((p, i) => {
              debugger;
              // Ensure part data 'p' is not null or undefined before rendering
              if (!p) return null;

              const globalIndex = (page - 1) * perPage + i;
              const isExpanded = expandedRows && expandedRows[globalIndex];

              // Calculate difference percentage for highlighting
              const totalCost = Number(p.subtotals?.total?.total ?? 0);
              const prevYear = Number(p.subtotals?.total?.prev_year ?? 0);
              const diffPerc = Number(p.subtotals?.total?.diff ?? 0);
              const showRemark = diffPerc > threshold_percentage;
              debugger;  
              return (
                <React.Fragment key={globalIndex}>
                  <tr>
                    {/* Row checkbox */}
                    <td>
                      <input
                        type="checkbox"
                        checked={!!(selectedRows && selectedRows[globalIndex])}
                        onChange={e => {
                          const newSelectedRows = { ...selectedRows, [globalIndex]: e.target.checked };
                          handleCheckboxChange(newSelectedRows);
                        }}
                      />
                    </td>
                    {/* Expand/collapse button */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-xs btn-link"
                        onClick={() => handleToggleExpand(globalIndex)}
                      >
                        <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                      </button>
                    </td>
                    <td>{globalIndex + 1}</td>
                    <td>{p.partNo}</td>
                    <td>{p.suffix}</td>
                    <td>{p.partName}</td>
                    <td>{p.parentPartNo}</td>
                    <td>{p.supplierCode}</td>
                    <td>{p.supplierName}</td>
                    <td>{fmt(p.L)}</td>
                    <td>{fmt(p.W)}</td>
                    <td>{fmt(p.H)}</td>
                    <td>{fmt(p.boxM3)}</td>
                    <td>{fmt(p.subtotals?.inner?.prev_year)}</td>
                    <td>{fmt(p.subtotals?.inner?.total)}</td>
                    <td>{fmt(p.subtotals?.inner?.diff)}</td>
                    <td>{fmt(p.subtotals?.outer?.prev_year)}</td>
                    <td>{fmt(p.subtotals?.outer?.total)}</td>
                    <td>{fmt(p.subtotals?.outer?.diff)}</td>
                    <td>{fmt(p.subtotals?.material?.prev_year)}</td>
                    <td>{fmt(p.subtotals?.material?.total)}</td>
                    <td>{fmt(p.subtotals?.material?.diff)}</td>
                    <td>{fmt(p.subtotals?.labor?.prev_year)}</td>
                    <td>{fmt(p.subtotals?.labor?.total)}</td>
                    <td>{fmt(p.subtotals?.labor?.diff)}</td>
                    <td>{fmt(p.subtotals?.inland?.prev_year)}</td>
                    <td>{fmt(p.subtotals?.inland?.total)}</td>
                    <td>{fmt(p.subtotals?.inland?.diff)}</td>
                    <td>{fmt(p.subtotals?.total?.prev_year)}</td>
                    <td>{fmt(p.subtotals?.total?.total)}</td>
                    {/* Difference cell with conditional styling */}
                    <td
                      style={{
                        color: diffPerc > threshold_percentage ? 'red' : undefined,
                        fontWeight: diffPerc > threshold_percentage ? 'bold' : undefined,
                      }}
                    >
                      {fmt(p.subtotals?.total?.diff)}
                    </td>
                    {/* Remark textarea, shown conditionally */}
                    <td>
                      {showRemark ? (
                        <textarea
                          className="form-control form-control-sm"
                          style={{ minWidth: 220, width: '100%' }}
                          value={(remarks && remarks[globalIndex]) || ""}
                          onChange={e => handleRemarkChange(globalIndex, e.target.value)}
                          placeholder="Enter remark"
                          rows={3}
                        />
                      ) : null}
                    </td>
                  </tr>
                  {/* Expanded row with details */}
                  {isExpanded && (
                    <tr className="expandable-row">
                      <MaterialCostDetail part={p} />
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}