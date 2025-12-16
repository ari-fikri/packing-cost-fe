import React, { useState, useEffect } from 'react';

const ProjectModal = ({ show, onHide, onAdd, field = 'code' }) => {
  const [projectCode, setProjectCode] = useState('');
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('All');
  const [projectManager, setProjectManager] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const allProjects = [
    { code: '024J', name: 'Front Bumper Model', status: 'Active', manager: 'Prototype 2025' },
    { code: '286W', name: 'Rear Bumper Model', status: 'Draft', manager: 'Production 2024' },
    { code: '332W', name: 'Hood Model', status: 'Inactive', manager: 'Prototype 2023' },
    { code: '385W', name: 'Fender Model', status: 'Active', manager: 'Production 2022' },
    { code: '388W', name: 'Grille Model', status: 'Active', manager: 'Prototype 2021' },
  ];

  const [results, setResults] = useState(allProjects);

  useEffect(() => {
    if (show) {
      handleClear();
      setSelectedProjects([]);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleSearch = () => {
    let filteredResults = allProjects;

    if (projectCode) {
      filteredResults = filteredResults.filter(p => p.code.toLowerCase().includes(projectCode.toLowerCase()));
    }
    if (projectName) {
      filteredResults = filteredResults.filter(p => p.name.toLowerCase().includes(projectName.toLowerCase()));
    }
    if (status && status !== 'All') {
      filteredResults = filteredResults.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (projectManager) {
      filteredResults = filteredResults.filter(p => p.manager.toLowerCase().includes(projectManager.toLowerCase()));
    }

    setResults(filteredResults);
  };

  const handleClear = () => {
    setProjectCode('');
    setProjectName('');
    setStatus('All');
    setProjectManager('');
    setResults(allProjects);
    setSelectedProjects([]);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProjects(results.map(p => p.code));
    } else {
      setSelectedProjects([]);
    }
  };

  const modalBodyStyle = {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><b>Select Project</b></h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body" style={modalBodyStyle}>
            {/* Search Section */}
            <div className="card card-outline card-secondary mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="small mb-1">Project Code</label>
                    <input type="text" className="form-control form-control-sm" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="small mb-1">Project Name</label>
                    <input type="text" className="form-control form-control-sm" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="small mb-1">Status</label>
                    <select className="form-control form-control-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option>All</option>
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="small mb-1">Project Manager</label>
                    <input type="text" className="form-control form-control-sm" value={projectManager} onChange={(e) => setProjectManager(e.target.value)} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary btn-sm mr-2" onClick={handleSearch}><i className="fas fa-search mr-1"></i> Search</button>
                    <button className="btn btn-secondary btn-sm" onClick={handleClear}><i className="fas fa-times mr-1"></i> Clear</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Section */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th style={{width: '30px'}}><input type="checkbox" checked={selectedProjects.length === results.length && results.length > 0} onChange={(e) => handleSelectAll(e.target.checked)} /></th>
                    <th>Project Code</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Project Mgr</th>
                  </tr>
                </thead>
                <tbody>
                  {results.length > 0 ? (
                    results.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center"><input type="checkbox" checked={selectedProjects.includes(item.code)} onChange={() => {
                          if (selectedProjects.includes(item.code)) {
                            setSelectedProjects(prev => prev.filter(c => c !== item.code));
                          } else {
                            setSelectedProjects(prev => [...prev, item.code]);
                          }
                        }} /></td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.manager}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No projects found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
             <button type="button" className="btn btn-primary btn-sm" onClick={() => {
               if (onAdd && selectedProjects.length > 0) {
                 const selected = selectedProjects.map(code => allProjects.find(p => p.code === code));
                 onAdd(selected, field);
               }
               onHide();
             }}>Add</button>
             <button type="button" className="btn btn-secondary btn-sm" onClick={onHide}>Close</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;