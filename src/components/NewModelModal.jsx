// === NEW MODEL MODAL COMPONENT ===
// Modal component for creating and editing model information with parts management
// Includes destination code auto-population functionality

import React, { useState, useEffect } from 'react'
import PartPickerModal from '../components/PartPickerModal'
import DESTINATIONS from '../data/destinations'

export default function NewModelModal({
  show,
  onClose,
  onSave,
  initialData
}) {
  // === FORM FIELD STATE VARIABLES ===
  const [projectCode, setProjectCode] = useState('')
  const [projectName, setProjectName] = useState('')
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newRemark, setNewRemark] = useState('')
  const [modelCfc, setModelCfc] = useState('')
  const [modelType, setModelType] = useState('')

  const [implementationPeriod, setImplementationPeriod] = useState('')
  const [destinationCode, setDestinationCode] = useState('')
  const [destinationCountryCode, setDestinationCountryCode] = useState('')
  const [country, setCountry] = useState('')

  // Katashiki Fields
  const [katashiki, setKatashiki] = useState([]) // [{string:'', number:0}]

  // === PARTS MANAGEMENT STATE ===
  const [parts, setParts] = useState([])
  const [showPartPicker, setShowPartPicker] = useState(false)
  const [projectsData, setProjectsData] = useState([])

  // === FORM INITIALIZATION EFFECT ===
  useEffect(() => {
    if (show) {
      if (initialData) {
        setProjectCode(initialData.project?.project_code || '')
        setProjectName(initialData.project?.project_name || '')
        setNewCode(initialData.model_code || '')
        setNewName(initialData.model_name || '')
        setNewRemark(initialData.model_remark || '')
        setImplementationPeriod(initialData.model_implementation_period || '')
        setDestinationCode(initialData.model_destination_code || '')
        setDestinationCountryCode(initialData.destinationCountryCode || '')
        setCountry(initialData.country || '')
        setParts(initialData.parts || [])
        setModelCfc(initialData.model_cfc || '')
        setModelType(initialData.model_type || '')
        setKatashiki(initialData.katashiki || [])
      } else {
        setProjectCode('')
        setProjectName('')
        setNewCode('')
        setNewName('')
        setNewRemark('')
        setImplementationPeriod('')
        setDestinationCode('')
        setDestinationCountryCode('')
        setCountry('')
        setParts([])
        setModelCfc('')
        setModelType('')
        setKatashiki([])
      }
      setShowPartPicker(false)
    }
  }, [show, initialData])

  useEffect(() => {
    const dataUrl = `${import.meta.env.BASE_URL}projects.json`
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => setProjectsData(data))
  }, [])

  useEffect(() => {
    if (projectCode) {
      const project = projectsData.find(p => p.project_code === projectCode)
      setProjectName(project ? project.project_name : '')
    } else {
      setProjectName('')
    }
  }, [projectCode, projectsData])

  // Auto-fill model code for new models
  useEffect(() => {
    if (!initialData) {
      const combined = `${projectCode}-${destinationCode}-${modelCfc}${modelType}${implementationPeriod}`
      setNewCode(combined)
    }
  }, [initialData, projectCode, destinationCode, modelCfc, modelType, implementationPeriod])

  // === EVENT HANDLERS ===
  function handleAddPartClick() {
    setShowPartPicker(true)
  }

  function handlePartPicked(selectedParts) {
    const newParts = selectedParts.map(p => ({
      partNo: p.partNo || '',
      suffix: '',
      name: p.partName || '',
      parent: p.parentPartNo || '',
      supplierId: p.supplierId || '',
      supplierName: p.supplierName || '',
      L: p.L || 0,
      W: p.W || 0,
      H: p.H || 0,
      wtPerPc: p.wtPerPc || 0,
      qty: 1,
      totalWt: p.wtPerPc ? (1 * p.wtPerPc).toFixed(2) : 0
    }))
    setParts(prev => [...prev, ...newParts])
    setShowPartPicker(false)
  }

  function handleRemovePart(idx) {
    setParts(prev => prev.filter((_, i) => i !== idx))
  }

  function handlePartDataChange(index, field, value) {
    const newParts = [...parts]
    const part = { ...newParts[index] }
    part[field] = value

    if (field === 'qty' || field === 'wtPerPc') {
      const qty = field === 'qty' ? value : part.qty
      const wtPerPc = field === 'wtPerPc' ? value : part.wtPerPc
      part.totalWt = (Number(qty) * Number(wtPerPc)).toFixed(2)
    }

    newParts[index] = part
    setParts(newParts)
  }

  function handleDestinationCodeChange(value) {
    const upperValue = value.toUpperCase()
    setDestinationCode(upperValue)

    const destination = DESTINATIONS.find(dest => dest.destCode === upperValue)
    if (destination) {
      setDestinationCountryCode(destination.code)
      setCountry(destination.country)
    } else {
      setDestinationCountryCode('')
      setCountry('')
    }
  }

  function handleSaveModel() {
    if (!newCode.trim()) {
      alert('Please enter Model Code')
      return
    }

    const payload = {
      ...(initialData || {}),
      model_code: newCode,
      model_name: newName,
      model_remark: newRemark,
      model_implementation_period: implementationPeriod,
      model_destination_code: destinationCode,
      destinationCountryCode,
      country,
      parts: parts.slice(),
      model_cfc: modelCfc,
      model_type: modelType,
      katashiki: katashiki.slice(),
      project: {
        ...(initialData?.project || {}),
        project_code: projectCode,
        project_name: projectName,
      }
    }

    console.log('Saving model:', payload)
    onSave(payload)
  }

  if (!show) return null

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="np-modal card card-outline card-success" style={{ maxWidth: 1200 }}>

        {/* HEADER */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0">
            <b>Model - {initialData ? 'Edit' : 'New'}</b>
          </h3>
          <div className="ml-2 text-muted small" style={{ marginLeft: 8 }}>|</div>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        {/* BODY */}
        <div className="card-body">

          {/* Row 1 */}
          <div className="row">
            <div className="col-md-6">
              <label className="small">Model Code <span style={{ color: 'red' }}>*</span></label>
              <input
                className="form-control form-control-sm mb-2"
                value={newCode}
                onChange={e => setNewCode(e.target.value.toUpperCase())}
                placeholder="Model Code"
                disabled={!initialData}
                style={!initialData ? { backgroundColor: '#f8f9fa' } : {}}
              />
            </div>
            <div className="col-md-6">
              <label className="small">Model Name</label>
              <input
                className="form-control form-control-sm mb-2"
                value={newName}
                onChange={e => setNewName(e.target.value.toUpperCase())}
                placeholder="Model Name"
              />
            </div>
          </div>

          {/* Row 1b */}
          <div className="row">
            <div className="col-md-6">
              <label className="small">CFC</label>
              <input className="form-control form-control-sm mb-2" value={modelCfc} onChange={e => setModelCfc(e.target.value.toUpperCase())} placeholder="CFC" />
            </div>
            <div className="col-md-6">
              <label className="small">Type</label>
              <select className="form-control form-control-sm mb-2" value={modelType} onChange={e => setModelType(e.target.value)}>
                <option value="">-- Select Type --</option>
                <option value="PxP">PxP</option>
                <option value="Lot">Lot</option>
                <option value="Engine">Engine</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-md-6">
              <label className="small">Project Code <span style={{ color: 'red' }}>*</span></label>
              <input className="form-control form-control-sm mb-2" value={projectCode} onChange={e => setProjectCode(e.target.value.toUpperCase())} placeholder="Project Code" />
            </div>
            <div className="col-md-6">
              <label className="small">Project Name</label>
              <input className="form-control form-control-sm mb-2" value={projectName} placeholder="Project Name" readOnly style={{ backgroundColor: '#f8f9fa' }} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="col-md-6">
              <label className="small">
                Implementation Period <span style={{ color: 'red' }}>*</span>{' '}
                <span className="text-muted ml-2"><i>e.g., 02.2025</i></span>
              </label>
              <input className="form-control form-control-sm mb-2" value={implementationPeriod} onChange={e => setImplementationPeriod(e.target.value.toUpperCase())} placeholder="Implementation Period" />
            </div>
            <div className="col-md-6">
              <label className="small">Destination Code <span style={{ color: 'red' }}>*</span></label>
              <div className="input-group input-group-sm mb-2">
                <input className="form-control form-control-sm" value={destinationCode} onChange={e => handleDestinationCodeChange(e.target.value)} placeholder="Destination Code" />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-map-marker-alt" /></span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="row">
            <div className="col-md-6">
              <label className="small">Destination Country Code</label>
              <input className="form-control form-control-sm mb-2" value={destinationCountryCode} readOnly placeholder="Auto-filled" style={{ backgroundColor: '#f8f9fa' }} />
            </div>
            <div className="col-md-6">
              <label className="small">Country</label>
              <input className="form-control form-control-sm mb-2" value={country} readOnly placeholder="Auto-filled" style={{ backgroundColor: '#f8f9fa' }} />
            </div>
          </div>

          {/* Row 5 */}
          <div className="row">
            <div className="col-md-12">
              <label className="small">Remark</label>
              <input className="form-control form-control-sm mb-2" value={newRemark} onChange={e => setNewRemark(e.target.value.toUpperCase())} placeholder="Remark" />
            </div>
          </div>

          {/* === KATASHIKI (FLEX, input vertical, plus nempel kanan) === */}
          {/* === KATASHIKI (FLEX, input vertical, plus nempel kanan) === */}
          <div className="kat-wrap mb-3">
            <div className="kat-title">Katashiki</div>

            <div className="kat-flex">
              <div className="kat-list">
                {katashiki.length === 0 ? (
                  <div className="kat-empty text-muted">
                    <span>No katashiki yet.</span>

                    <button
                      type="button"
                      className="kat-plus kat-plus--sm"
                      onClick={() => setKatashiki((prev) => [...prev, { string: "", number: 0 }])}
                      title="Add Katashiki"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  katashiki.map((k, idx) => (
                    <div className="kat-item" key={idx}>
                      <div className="kat-box">
                        <input
                          type="text"
                          className="kat-input"
                          placeholder="Code"
                          value={k.string}
                          onChange={(e) => {
                            const v = e.target.value.toUpperCase();
                            setKatashiki((prev) => {
                              const next = [...prev];
                              next[idx] = { ...next[idx], string: v };
                              return next;
                            });
                          }}
                        />

                        <input
                          type="number"
                          className="kat-input kat-input-num"
                          placeholder="0"
                          value={k.number}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            setKatashiki((prev) => {
                              const next = [...prev];
                              next[idx] = { ...next[idx], number: v };
                              return next;
                            });
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        className="kat-del"
                        onClick={() => setKatashiki((prev) => prev.filter((_, i) => i !== idx))}
                        title="Remove"
                      >
                        −
                      </button>
                    </div>
                  ))
                )}
                  {/* plus panjang hanya muncul kalau ada data */}
                  {katashiki.length > 0 && (
                    <button
                      type="button"
                      className="kat-plus"
                      onClick={() => setKatashiki((prev) => [...prev, { string: "", number: 0 }])}
                      title="Add Katashiki"
                    >
                      +
                    </button>
                  )}
              </div>

            </div>
          </div>


          {/* ACTION BUTTONS */}
          <div className="d-flex align-items-center mb-3">
            <button type="button" className="btn btn-sm btn-outline-primary mr-2" onClick={handleAddPartClick}>
              <i className="fas fa-file mr-1" /> Add Part
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={() => alert('Upload placeholder')}>
              <i className="fas fa-cloud-upload-alt mr-1" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => alert('Download template placeholder')}>
              <i className="fas fa-cloud-download-alt mr-1" /> Template
            </button>
          </div>

          {/* PARTS TABLE */}
          <div className="table-responsive">
            <table className="table table-sm table-bordered mb-2" style={{ fontSize: '0.8rem' }}>
              <thead className="thead-light">
                <tr>
                  <th style={{ width: 130, textAlign: 'center' }}>Part No</th>
                  <th style={{ width: 50, textAlign: 'center' }}>Suffix</th>
                  <th style={{ textAlign: 'center' }}>Name</th>
                  <th style={{ textAlign: 'center' }}>Parent</th>
                  <th style={{ width: 50, textAlign: 'center' }}>Supplier ID</th>
                  <th style={{ textAlign: 'center' }}>Supplier Name</th>
                  <th style={{ width: 60, textAlign: 'center' }}>L</th>
                  <th style={{ width: 60, textAlign: 'center' }}>W</th>
                  <th style={{ width: 60, textAlign: 'center' }}>H</th>
                  <th style={{ width: 60, textAlign: 'center' }}>Wt/pc</th>
                  <th style={{ width: 60, textAlign: 'center' }}>Qty</th>
                  <th style={{ width: 70, textAlign: 'center' }}>Total Wt</th>
                  <th style={{ width: 70, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {parts.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center text-muted">- No parts added yet -</td>
                  </tr>
                ) : (
                  parts.map((p, idx) => (
                    <tr key={idx}>
                      <td><input type="text" className="form-control form-control-sm" value={p.partNo} onChange={e => handlePartDataChange(idx, 'partNo', e.target.value.toUpperCase())} /></td>
                      <td><input type="text" className="form-control form-control-sm" value={p.suffix} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" value={p.name} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" value={p.parent} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" value={p.supplierId} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" value={p.supplierName} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" style={{ textAlign: 'right' }} value={p.L} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" style={{ textAlign: 'right' }} value={p.W} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" style={{ textAlign: 'right' }} value={p.H} readOnly /></td>
                      <td><input type="text" className="form-control form-control-sm" style={{ textAlign: 'right' }} value={p.wtPerPc} readOnly /></td>
                      <td><input type="number" className="form-control form-control-sm" style={{ textAlign: 'right' }} value={p.qty} onChange={e => handlePartDataChange(idx, 'qty', e.target.value)} /></td>
                      <td><input type="text" className="form-control form-control-sm" value={p.totalWt} readOnly /></td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemovePart(idx)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="card-footer text-right" style={{ marginTop: 8 }}>
          <button type="button" className="btn btn-primary mr-2" onClick={handleSaveModel}>
            <i className="fas fa-save mr-1" /> Save
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times mr-1" /> Cancel
          </button>
        </div>
      </div>

      {/* PART PICKER */}
      {showPartPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <PartPickerModal
            show={showPartPicker}
            onClose={() => setShowPartPicker(false)}
            onSelect={handlePartPicked}
          />
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .np-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .np-modal {
          width: 100%;
          z-index: 2001;
        }

        .table-sm td, .table-sm th {
          vertical-align: middle;
        }

        /* === KATASHIKI (flex, input vertical) === */
        .kat-wrap{
          border: 1px solid #dcdcdc;
          border-radius: 6px;
          padding: 10px;
          background: #fff;
        }

        .kat-title{
          font-weight: 600;
          margin-bottom: 8px;
        }

        .kat-flex{
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .kat-list{
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 14px 16px;
          align-items: flex-start;
        }

        .kat-empty{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 0;
        }

        .kat-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .kat-box{
          width: 180px;          /* ⬅️ sebelumnya 220px */
          border: 2px solid #000;
          border-radius: 8px;
          padding: 8px;
          background: #fff;

          display: flex;
          flex-direction: column;
          gap: 6px;
        }


        .kat-input{
          width: 100%;
          height: 28px;
          border: 1px solid #d0d0d0;
          border-radius: 6px;
          padding: 0 8px;
          font-size: 13px;
        }

        .kat-input-num{
          text-align: right;
        }

        .kat-del{
          width: 56px;
          height: 16px;                 /* sedikit lebih tinggi */
          border: 0;
          border-radius: 6px;
          background: #e60000;

          display: flex;                /* CENTERING */
          align-items: center;
          justify-content: center;

          color: #fff;                  /* PUTIH */
          font-weight: 700;
          font-size: 14px;
          line-height: 1;

          cursor: pointer;
        }


        /* tombol plus panjang (yang hijau) */
        .kat-plus{
          width: 22px;
          height: 110px;
          border: 0;
          border-radius: 4px;
          background: #13cc00;
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          line-height: 110px;
          text-align: center;
          flex: 0 0 auto;
          cursor: pointer;
        }

        .kat-plus:hover{
          background: #10b300;
        }

        /* versi kecil untuk empty state */
        .kat-plus--sm{
          width: 20px;
          height: 34px;
          line-height: 34px;
          font-size: 16px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
