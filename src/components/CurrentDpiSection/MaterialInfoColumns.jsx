// MaterialInfoColumns.jsx
import React from "react";

/**
 * Material leaf headers (Mat No / Qty / Price / Sum)
 */
export function MaterialLeafHeaders({ count = 1 }) {
  // returns sequence of <th> * count * 4
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={`matLeafHdr-${i}`}>
          {i === 0 ? (
            <>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Mat No</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Length</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Width</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Height</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Volume Inner</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Volume Outer</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Usage</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Source</th>
            </>
          ) : (
            <>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Mat No</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Usage</th>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Material leaf data cells (Mat No / Qty / Price / Sum)
 * innerArr is an array of material objects; if missing an entry, cells show '-'
 */
export function MaterialLeafCells({ arr = [], count = 1 }) {
  return (
    <>
      {arr.map((mat, i) => {
//        debugger
        return (
          <React.Fragment key={`matLeafCell-${i}`}>
            {i === 0 ? (
              <>
                <td>{mat.material_no || '-'}</td>
                <td>{mat.dimension_length || '-'}</td>
                <td>{mat.dimension_width || '-'}</td>
                <td>{mat.dimension_height || '-'}</td>
                <td>{mat.volume_inner || '-'}</td>
                <td>{mat.volume_outer || '-'}</td>
                <td>{mat.qty || '-'}</td>
                <td>{mat.source || '-'}</td>
              </>
            ) : (() => {
                //debugger;
                return (
                  <>
                    <td>{mat.material_no || '+'}</td>
                    <td>{mat.qty || '+'}</td>
                  </>
                );
              })()
            }
          </React.Fragment>
        );
      })}
    </>
  );
}