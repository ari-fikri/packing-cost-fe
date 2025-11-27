// MaterialInfoColumns.jsx
import React from "react";

/**
 * Material leaf headers (Mat No / Qty / Price / Sum)
 */
export function MaterialLeafHeaders({ count = 1, visibleColumns }) {
  // returns sequence of <th> * count * 4
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={`matLeafHdr-${i}`}>
          {i === 0 ? (
            <>
              {visibleColumns.materialCode && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Mat No</th>}
              {visibleColumns.length && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Length</th>}
              {visibleColumns.width && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Width</th>}
              {visibleColumns.height && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Height</th>}
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Volume Inner</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Volume Outer</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Usage</th>
              <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Source</th>
            </>
          ) : (
            <>
              {visibleColumns.materialCode && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Mat No</th>}
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
export function MaterialLeafCells({ arr = [], count = 1, visibleColumns }) {
  return (
    <>
      {arr.map((mat, i) => {
//        debugger
        return (
          <React.Fragment key={`matLeafCell-${i}`}>
            {i === 0 ? (
              <>
                {visibleColumns.materialCode && <td>{mat.material_no || '-'}</td>}
                {visibleColumns.length && <td>{mat.dimension_length || '-'}</td>}
                {visibleColumns.width && <td>{mat.dimension_width || '-'}</td>}
                {visibleColumns.height && <td>{mat.dimension_height || '-'}</td>}
                <td>{mat.volume_inner || '-'}</td>
                <td>{mat.volume_outer || '-'}</td>
                <td>{mat.qty || '-'}</td>
                <td>{mat.source || '-'}</td>
              </>
            ) : (() => {
                //debugger;
                return (
                  <>
                    {visibleColumns.materialCode && <td>{mat.material_no || '+'}</td>}
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