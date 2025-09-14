import React, { useRef, useEffect } from "react";
import InnerSubTable from "./InnerSubTable";
import OuterSubTable from "./OuterSubTable";
import LaborSubTable from "./LaborSubTable";
import InlandSubTable from "./InlandSubTable";
import TotalSummary from "./TotalSummary";

/**
 * PartsTableRow
 * props:
 *  - index (global index)
 *  - part
 *  - isExpanded
 *  - onToggleExpand
 *  - distributeAcross (helper)
 */
export default function PartsTableRow({ index, part, isExpanded, onToggleExpand, distributeAcross }) {
  const expandedRef = useRef(null);

  useEffect(() => {
    if (isExpanded && expandedRef.current && typeof expandedRef.current.scrollIntoView === "function") {
      expandedRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isExpanded]);

  const innerArr = distributeAcross(part.inner?.totalCost || 0, 10);
  const outerArr = distributeAcross(part.outer?.totalCost || 0, 10);

  return (
    <>
      <tr>
        <td className="text-center">
          <button type="button" className="btn btn-sm btn-light" onClick={() => onToggleExpand(index)}>
            <i className={`fas ${isExpanded ? "fa-chevron-down" : "fa-chevron-right"}`} />
          </button>
        </td>
        <td>{index + 1}</td>
        <td>{part.partNo}</td>
        <td>{part.suffix}</td>
        <td className="text-left">{part.partName}</td>
        <td>{part.parentPartNo}</td>
        <td>{part.supplierId}</td>
        <td>{part.supplierName}</td>
        <td>{part.L}</td>
        <td>{part.W}</td>
        <td>{part.H}</td>
        <td>{part.boxM3}</td>

        <td>{part.inner?.totalCost}</td>
        <td>{part.inner?.prevYear}</td>
        <td>{part.inner?.diff}</td>

        <td>{part.outer?.totalCost}</td>
        <td>{part.outer?.prevYear}</td>
        <td>{part.outer?.diff}</td>

        <td>{part.material?.totalCost}</td>
        <td>{part.material?.prevYear}</td>
        <td>{part.material?.diff}</td>

        <td>{part.labor?.totalCost}</td>
        <td>{part.labor?.prevYear}</td>
        <td>{part.labor?.diff}</td>

        <td>{part.inland?.totalCost}</td>
        <td>{part.inland?.prevYear}</td>
        <td>{part.inland?.diff}</td>

        <td>{part.total?.totalCost}</td>
        <td>{part.total?.prevYear}</td>
        <td>{part.total?.diff}</td>
      </tr>

      {isExpanded && (
        <tr ref={expandedRef}>
          <td colSpan={30} className="p-0">
            <div className="bg-white border-top p-3">
              <InnerSubTable part={part} innerArr={innerArr} />
              <OuterSubTable part={part} outerArr={outerArr} />
              <LaborSubTable part={part} labor={part.labor} />
              <InlandSubTable part={part} inland={part.inland} />
              <TotalSummary part={part} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
