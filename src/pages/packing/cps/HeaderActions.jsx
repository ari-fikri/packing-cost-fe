import React from 'react';

const HeaderActions = ({ onNewCps, onUpload, onDownload }) => {
  return (
    <div className="ml-auto">
      <button type="button" className="btn btn-sm btn-success mr-2" onClick={onNewCps}>
        <i className="fas fa-plus mr-1"></i> Create CPS
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload" onClick={onUpload}>
        <i className="fas fa-cloud-upload-alt"></i>
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary" title="Download Template" onClick={onDownload}>
        <i className="fas fa-cloud-download-alt"></i>
      </button>
    </div>
  );
};

export default HeaderActions;