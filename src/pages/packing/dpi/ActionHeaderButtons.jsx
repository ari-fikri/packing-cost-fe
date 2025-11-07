import React from 'react';

export default function ActionHeaderButtons({
  onUpload,
  onTemplate,
  onCreateDpi,
  onCreatePci,
}) {
  return (
    <div className="card-tools ml-auto">
      <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={onUpload} title="Upload">
        <i className="fas fa-cloud-upload-alt" /> Upload
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={onTemplate} title="Template">
        <i className="fas fa-cloud-download-alt" /> Template
      </button>
      <button type="button" className="btn btn-sm btn-success mr-2" onClick={onCreateDpi}>
        <i className="fas fa-file mr-1" /> Add DPI
      </button>
      <button type="button" className="btn btn-sm btn-primary" onClick={onCreatePci}>
        <i className="fas fa-file-alt mr-1" /> Create PCI
      </button>
    </div>
  );
}