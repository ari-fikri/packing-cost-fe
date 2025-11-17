import React from 'react';

const threshold_percentage = 5; // 5%

const fmt = (v) => {
  if (v === null || v === undefined || v === "") return "";
  const num = Number(v);
  if (isNaN(num)) return String(v);
  return num.toFixed(2);
};

export default function ResultSection({ visibleParts, selectedRows, handleCheckboxChange, page, perPage, remarks, handleRemarkChange }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm text-center w-100" style={{ fontSize: '8pt' }}>
        <thead>
          <tr style={{ backgroundColor: "#f7fbff" }}>
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
            <th rowSpan={2}>Supplier ID</th>
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
          <tr style={{ backgroundColor: "#dee2e6" }}>
            {[...Array(6)].map((_, i) => (
              <React.Fragment key={i}>
                <th>Total Cost</th>
                <th>Prev Year</th>
                <th>Diff</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {visibleParts.length === 0 ? (
            <tr>
              <td colSpan={32} className="text-center py-4 text-muted">No Data Found</td>
            </tr>
          ) : (
            visibleParts.map((p, i) => {
              const globalIndex = (page - 1) * perPage + i;

              const totalCost = Number(p.total?.totalCost ?? 0);
              const prevYear = Number(p.total?.prevYear ?? 0);
              const diffPerc = prevYear ? ((totalCost - prevYear) / prevYear) * 100 : 0;
              const showRemark = diffPerc > threshold_percentage;

              return (
                <tr key={globalIndex}>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!selectedRows[globalIndex]}
                      onChange={e => {
                        const newSelectedRows = { ...selectedRows, [globalIndex]: e.target.checked };
                        handleCheckboxChange(newSelectedRows);
                      }}
                    />
                  </td>
                  <td></td>
                  <td>{globalIndex + 1}</td>
                  <td>{p.partNo}</td>
                  <td>{p.suffix}</td>
                  <td>{p.partName}</td>
                  <td>{p.parentPartNo}</td>
                  <td>{p.supplierId}</td>
                  <td>{p.supplierName}</td>
                  <td>{fmt(p.L)}</td>
                  <td>{fmt(p.W)}</td>
                  <td>{fmt(p.H)}</td>
                  <td>{fmt(p.boxM3)}</td>
                  <td>{fmt(p.inner?.totalCost)}</td>
                  <td>{fmt(p.inner?.prevYear)}</td>
                  <td>{fmt(p.inner?.diff)}</td>
                  <td>{fmt(p.outer?.totalCost)}</td>
                  <td>{fmt(p.outer?.prevYear)}</td>
                  <td>{fmt(p.outer?.diff)}</td>
                  <td>{fmt(p.material?.totalCost)}</td>
                  <td>{fmt(p.material?.prevYear)}</td>
                  <td>{fmt(p.material?.diff)}</td>
                  <td>{fmt(p.labor?.totalCost)}</td>
                  <td>{fmt(p.labor?.prevYear)}</td>
                  <td>{fmt(p.labor?.diff)}</td>
                  <td>{fmt(p.inland?.totalCost)}</td>
                  <td>{fmt(p.inland?.prevYear)}</td>
                  <td>{fmt(p.inland?.diff)}</td>
                  <td>{fmt(p.total?.totalCost)}</td>
                  <td>{fmt(p.total?.prevYear)}</td>
                  <td
                    style={{
                      color: diffPerc > threshold_percentage ? 'red' : undefined,
                      fontWeight: diffPerc > threshold_percentage ? 'bold' : undefined,
                    }}
                  >
                    {fmt(p.total?.diff)}
                  </td>
                  <td>
                    {showRemark ? (
                      <textarea
                        className="form-control form-control-sm"
                        style={{ minWidth: 220, width: '100%' }}
                        value={remarks[globalIndex] || ""}
                        onChange={e => handleRemarkChange(globalIndex, e.target.value)}
                        placeholder="Enter remark"
                        rows={3}
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}