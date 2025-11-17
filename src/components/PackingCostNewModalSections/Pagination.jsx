import React from 'react';

export default function Pagination({ page, totalPages, goToPage, perPage }) {
  return (
    <div className="d-flex align-items-center justify-content-between mt-2">
      <div>
        <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{"<<"}</button>
        <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{"<"}</button>
        {[...Array(totalPages).keys()].map((n) => (
          <button key={n} type="button" className={`btn btn-sm mr-1 ${page === n + 1 ? "btn-primary" : "btn-light"}`} onClick={() => goToPage(n + 1)}>{n + 1}</button>
        ))}
        <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(totalPages, page + 1))}>{">"}</button>
      </div>

      <div className="form-inline small">
        <span className="mr-3">{perPage} per page</span>
      </div>
    </div>
  );
}