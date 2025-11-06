import React from 'react';

/**
 * Section for displaying and editing outer packing information.
 * @param {object} props - Component props.
 * @param {string} props.outerModuleType - The type of the outer module.
 * @param {function} props.setOuterModuleType - Function to set the outer module type.
 * @param {string} props.outerMaterialName - The name of the outer material.
 * @param {object} props.outerDimension - The dimensions (L, W, H) of the outer packing.
 * @param {string} props.innerVolume - The calculated inner volume.
 * @param {string} props.outerVolume - The calculated outer volume.
 * @param {function} props.openMaterialPicker - Function to open the material picker modal.
 */
export default function PackingOuterSection(props) {
  const {
    outerModuleType,
    setOuterModuleType,
    outerMaterialName,
    outerDimension,
    innerVolume,
    outerVolume,
    openMaterialPicker,
  } = props;

  return (
    <div className="row mt-2">
      <div className="col-md-6">
        <label className="small">Module Type (Outer)</label>
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-sm"
            value={outerModuleType}
            onChange={(e) => setOuterModuleType(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => openMaterialPicker("module")}
            >
              <i className="fas fa-search" />
            </button>
          </div>
        </div>

        <div className="form-row mt-2">
          <div className="col">
            <label className="small">Dimension (cm)</label>
            <div className="d-flex">
              <input
                className="form-control form-control-sm"
                value={outerDimension.L}
                placeholder="L"
                readOnly
              />
              <input
                className="form-control form-control-sm mx-1"
                value={outerDimension.W}
                placeholder="W"
                readOnly
              />
              <input
                className="form-control form-control-sm"
                value={outerDimension.H}
                placeholder="H"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <label className="small">Material Name</label>
        <input
          className="form-control form-control-sm"
          value={outerMaterialName}
          readOnly
        />
        <div className="form-row mt-2">
          <div className="col">
            <label className="small">Inner (m³)</label>
            <input
              className="form-control form-control-sm"
              value={innerVolume}
              readOnly
            />
          </div>
          <div className="col">
            <label className="small">Outer (m³)</label>
            <input
              className="form-control form-control-sm"
              value={outerVolume}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}