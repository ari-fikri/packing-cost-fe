import React, { useState } from 'react';
import ProjectModal from '../ProjectModal';
import ModelPickerModal from '../ModelPickerModal';

export default function SearchSection({
  code, setCode,
  name, setName,
  models, setModels,
  manager, setManager,
  statuses, setStatuses,
  handleSearch,
  clearFilters,
  handleOpenNew
}) {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [currentField, setCurrentField] = useState('code');

  function handleSelectProjects(selected, field) {
    if (field === 'code') {
      const projectCodes = selected.map(p => p.code).join('; ');
      setCode(projectCodes);
    } else if (field === 'name') {
      const projectNames = selected.map(p => p.name).join('; ');
      setName(projectNames);
    }
    setShowProjectModal(false);
  }

  function toggleStatus(key) {
    if (key === 'all') {
      const newVal = !statuses.all;
      setStatuses({ all: newVal, draft: false, active: false, onhold: false, completed: false });
    } else {
      setStatuses(prev => ({ ...prev, [key]: !prev[key], all: false }));
    }
  }

  function handleSelectModels(selected) {
    const modelCodes = selected.map(m => m.model_code).join('; ');
    setModels(modelCodes);
    setShowModelPicker(false);
  }

  return (
    <div className="card-body">
      {/* First Row: Project Code and Project Name */}
      <div className="row">
        {/* Project Code Input Field */}
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">Project Code</label>
            <div className="input-group input-group-sm">
              <input value={code} onChange={e => setCode(e.target.value)} className="form-control form-control-sm" placeholder="Code" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search code" onClick={() => { setCurrentField('code'); setShowProjectModal(true); }}><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        {/* Project Name Input Field */}
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">Project Name</label>
            <div className="input-group input-group-sm">
              <input value={name} onChange={e => setName(e.target.value)} className="form-control form-control-sm" placeholder="Project name" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search name" onClick={() => { setCurrentField('name'); setShowProjectModal(true); }}><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Second Row: Related Models and Project Manager */}
      <div className="row">
        {/* Related Models Input Field */}
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">Related Models</label>
            <div className="input-group input-group-sm">
              <input value={models} onChange={e => setModels(e.target.value)} className="form-control form-control-sm" placeholder="Model code / name" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Select Model" onClick={() => setShowModelPicker(true)}><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        {/* Project Manager Input Field */}
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">Project Manager</label>
            <div className="input-group input-group-sm">
              <input value={manager} onChange={e => setManager(e.target.value)} className="form-control form-control-sm" placeholder="Manager name" />
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-user" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Third Row: Status Filter Checkboxes */}
      <div className="row">
        {/* Status Filter Section */}
        <div className="col-12 col-md-6">
          <label className="small mb-1 d-block">Status</label>
          {/* Status Checkbox Group */}
          <div className="form-inline flex-wrap">
            {/* Dynamic Status Checkboxes */}
            {['all', 'draft', 'active', 'onhold', 'completed'].map(key => {
              const id = `status-${key}`;
              return (
                <div className="form-check mr-3" key={key}>
                  <input id={id} type="checkbox" className="form-check-input" checked={statuses[key]} onChange={() => toggleStatus(key)} />
                  <label className="form-check-label small ml-1" htmlFor={id}>{key === 'onhold' ? 'On Hold' : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Fourth Row: Action Buttons */}
      <div className="row mt-2">
        {/* Button Container - Right Aligned */}
        <div className="col-12 d-flex justify-content-end">
          {/* Filter Button */}
          <button type="button" className="btn btn-primary btn-sm mr-2" onClick={handleSearch}><i className="fas fa-search mr-1"></i> Search</button>
          {/* Clear Filter Button */}
          <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}><i className="fas fa-times mr-1"></i> Clear</button>
        </div>
      </div>
      <ProjectModal show={showProjectModal} onHide={() => setShowProjectModal(false)} onAdd={handleSelectProjects} field={currentField} />
      <ModelPickerModal
        show={showModelPicker}
        onClose={() => setShowModelPicker(false)}
        onAdd={handleSelectModels}
      />
    </div>
  );
}