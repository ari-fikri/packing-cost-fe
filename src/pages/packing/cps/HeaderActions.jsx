import React from 'react';

const HeaderActions = ({ onNewCps, onUpload, onDownload, onCreatePsi, onCreateEci, onComparePcs }) => {
  return (
    <div className="ml-auto">
      <button type="button" className="btn btn-sm btn-success mr-2" onClick={onNewCps}>
        <i className="fas fa-plus mr-1"></i> Create CPS
      </button>
      <button type="button" className="btn btn-sm btn-success mr-2" onClick={onCreatePsi}>
        <i className="fas fa-plus mr-1"></i> Create PSI
      </button>
      <button type="button" className="btn btn-sm btn-success mr-2" onClick={onCreateEci}>
        <i className="fas fa-plus mr-1"></i> Create ECI
      </button>
      <button type="button" className="btn btn-sm btn-info" onClick={onComparePcs}>
        <i className="fas fa-exchange-alt mr-1"></i> Compare PCS
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary ml-2" title="Upload" onClick={onUpload}>
          <i className="fas fa-cloud-upload-alt"></i>
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary ml-1" title="Download Template" onClick={onDownload}>
          <i className="fas fa-cloud-download-alt"></i>
      </button>
    </div>
  );
};

export default HeaderActions;