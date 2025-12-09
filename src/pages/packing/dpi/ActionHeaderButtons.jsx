import React from 'react';

export default function ActionHeaderButtons({
  onViewDpi,
  onUpload,
  onTemplate,
  onCreateDpi,
  onCreatePci,
  onToggleColumnSelector,
  viewDpiDisabled,
}) {
  return (
    <div className="card-tools ml-auto">
      <button type="button" className="btn btn-sm btn-success mr-2" onClick={onViewDpi} title="View DPI" disabled={viewDpiDisabled}>
        <i className="fas fa-eye" /> View DPI
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={onToggleColumnSelector} title="Select Columns">
        <i className="fas fa-cog" />
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={onUpload} title="Upload">
        <i className="fas fa-cloud-upload-alt" />
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={onTemplate} title="Template">
        <i className="fas fa-cloud-download-alt" />
      </button>
    </div>
  );
}