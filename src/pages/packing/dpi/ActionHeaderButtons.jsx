import React from 'react';

export default function ActionHeaderButtons({
  onUpload,
  onTemplate,
}) {
  return (
    <div className="card-tools ml-auto">
      <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={onUpload} title="Upload">
        <i className="fas fa-cloud-upload-alt" /> Upload
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={onTemplate} title="Template">
        <i className="fas fa-cloud-download-alt" /> Template
      </button>
    </div>
  );
}