// src/components/NewCpsModal.jsx
import React, { useEffect, useState } from 'react'

export default function NewCpsModal({ show = false, onClose = () => {}, onSave = () => {}, onSubmit = () => {} }) {
  // Top-level fields (all empty by default)
  const [cpsNo, setCpsNo] = useState('')
  const [refCpsNo, setRefCpsNo] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
  const [dpiNo, setDpiNo] = useState('')
  const [cfcPjtCode, setCfcPjtCode] = useState('')
  const [model, setModel] = useState('')
  const [partNo, setPartNo] = useState('')

  // second block
  const [partName, setPartName] = useState('')
  const [supplier, setSupplier] = useState('')
  const [plantCode, setPlantCode] = useState('')
  const [dockCode, setDockCode] = useState('')

  // PSE Info collapse state & fields (kept simple, all empty)
  const [pseOpen, setPseOpen] = useState(false)
  const [packingPlantCurr, setPackingPlantCurr] = useState('')
  const [packingPlantNext, setPackingPlantNext] = useState('')
  const [vanningPlantCurr, setVanningPlantCurr] = useState('')
  const [vanningPlantNext, setVanningPlantNext] = useState('')
  const [orderPatternCurr, setOrderPatternCurr] = useState('')
  const [orderPatternNext, setOrderPatternNext] = useState('')
  const [category, setCategory] = useState('')
  const [katashiki, setKatashiki] = useState({ AD: '', AU: '', AF: '', AX: '' })
  const [importerLineProcess, setImporterLineProcess] = useState('')
  const [caseCode, setCaseCode] = useState('')
  const [boxNumber, setBoxNumber] = useState('')
  const [renban, setRenban] = useState('')
  const [renbanEff, setRenbanEff] = useState('')
  const [packingProcessBoxing, setPackingProcessBoxing] = useState('')
  const [packingProcessStacking, setPackingProcessStacking] = useState('')

  // images groups (arrays of objects with caption + optional url)
  const [imagesPart, setImagesPart] = useState([])
  const [imagesPacking, setImagesPacking] = useState([])
  const [imagesOuter, setImagesOuter] = useState([])
  const [imagesQkp, setImagesQkp] = useState([])
  const [imagesBkp, setImagesBkp] = useState([])

  // Packing - Outer summary
  const [outerModuleType, setOuterModuleType] = useState('')
  const [outerDimension, setOuterDimension] = useState({ L: '', W: '', H: '' }) // cm
  const [innerVolume, setInnerVolume] = useState('')
  const [outerVolume, setOuterVolume] = useState('')

  // Inner pack materials table
  const [innerRows, setInnerRows] = useState([])

  // Notes
  const [notes, setNotes] = useState('')

  // Small UI state for adding inner row
  const [newInner, setNewInner] = useState({
    materialNo: '',
    suffix: '',
    name: '',
    parent: '',
    supplierId: '',
    supplierName: '',
    L: '',
    W: '',
    H: '',
    wtPerPc: '',
    qty: '',
  })

  // Add state for collapsible images section
  const [imagesOpen, setImagesOpen] = useState(true)

  // Add state for collapsible packing section
  const [packingOpen, setPackingOpen] = useState(true)

  // Reset all fields when modal opens
  useEffect(() => {
    if (show) {
      setCpsNo('')
      setRefCpsNo('')
      setIssueDate('')
      setEffectiveDate('')
      setDpiNo('')
      setCfcPjtCode('')
      setModel('')
      setPartNo('')
      setPartName('')
      setSupplier('')
      setPlantCode('')
      setDockCode('')

      setPseOpen(false)
      setPackingPlantCurr(''); setPackingPlantNext('')
      setVanningPlantCurr(''); setVanningPlantNext('')
      setOrderPatternCurr(''); setOrderPatternNext('')
      setCategory(''); setKatashiki({ AD: '', AU: '', AF: '', AX: '' })
      setImporterLineProcess(''); setCaseCode(''); setBoxNumber(''); setRenban(''); setRenbanEff('')
      setPackingProcessBoxing(''); setPackingProcessStacking('')

      setImagesPart([]); setImagesPacking([]); setImagesOuter([]); setImagesQkp([]); setImagesBkp([])

      setOuterModuleType(''); setOuterDimension({ L: '', W: '', H: '' })
      setInnerVolume(''); setOuterVolume('')
      setInnerRows([])
      setNotes('')
      setNewInner({
        materialNo: '',
        suffix: '',
        name: '',
        parent: '',
        supplierId: '',
        supplierName: '',
        L: '',
        W: '',
        H: '',
        wtPerPc: '',
        qty: '',
      })
    }
  }, [show])

  function handleAddInnerRow() {
    if (!newInner.materialNo.trim()) {
      alert('Enter Pack Material No')
      return
    }
    setInnerRows(prev => [...prev, { ...newInner }])
    setNewInner({
      materialNo: '',
      suffix: '',
      name: '',
      parent: '',
      supplierId: '',
      supplierName: '',
      L: '',
      W: '',
      H: '',
      wtPerPc: '',
      qty: '',
    })
  }

  function handleRemoveInnerRow(i) {
    setInnerRows(prev => prev.filter((_, idx) => idx !== i))
  }

  function buildPayload() {
    return {
      cpsNo,
      refCpsNo,
      issueDate,
      effectiveDate,
      dpiNo,
      cfcPjtCode,
      model,
      partNo,
      partName,
      supplier,
      plantCode,
      dockCode,
      pseInfo: {
        packingPlantCurr, packingPlantNext, vanningPlantCurr, vanningPlantNext,
        orderPatternCurr, orderPatternNext, category, katashiki, importerLineProcess,
        caseCode, boxNumber, renban, renbanEff, packingProcessBoxing, packingProcessStacking
      },
      images: {
        part: imagesPart, packing: imagesPacking, outer: imagesOuter, qkp: imagesQkp, bkp: imagesBkp
      },
      packing: {
        outerModuleType, outerDimension, innerVolume, outerVolume,
        innerRows
      },
      notes,
    }
  }

  if (!show) return null

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 1100 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>CPS - New</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* Top grid */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="small mb-1"><b>CPS No.</b></label>
                  <input className="form-control form-control-sm" value={cpsNo} onChange={e => setCpsNo(e.target.value)} placeholder="CPSxxxx..." />
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>DPI No.</b></label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={dpiNo} onChange={e => setDpiNo(e.target.value)} />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search DPI" onClick={() => alert('Search DPI placeholder')}><i className="fas fa-search" /></button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Model</b></label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={model} onChange={e => setModel(e.target.value)} />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => alert('Search Model placeholder')}><i className="fas fa-search" /></button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Part No</b></label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={partNo} onChange={e => setPartNo(e.target.value)} />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => alert('Search Part placeholder')}><i className="fas fa-search" /></button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Issued Date</b></label>
                  <input type="date" className="form-control form-control-sm" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Effective Date</b></label>
                  <input type="date" className="form-control form-control-sm" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
                </div>
              </div>
            </div>

            {/* right top */}
            <div className="col-md-6">
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="small mb-1"><b>Ref CPS No.</b></label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={refCpsNo} onChange={e => setRefCpsNo(e.target.value)} />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Ref CPS" onClick={() => alert('Search Ref CPS placeholder')}><i className="fas fa-search" /></button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>CFC / PJT Code</b></label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={cfcPjtCode} onChange={e => setCfcPjtCode(e.target.value)} />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => alert('Search CFC/PJT placeholder')}><i className="fas fa-search" /></button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Issue Date</b></label>
                  <input type="date" className="form-control form-control-sm" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Part Name</b></label>
                  <input className="form-control form-control-sm" value={partName} onChange={e => setPartName(e.target.value)} />
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1"><b>Supplier</b></label>
                  <input className="form-control form-control-sm" value={supplier} onChange={e => setSupplier(e.target.value)} />
                </div>

                <div className="form-group col-6">
                  <label className="small mb-1">Plant Code</label>
                  <input className="form-control form-control-sm" value={plantCode} onChange={e => setPlantCode(e.target.value)} />
                </div>
                <div className="form-group col-6">
                  <label className="small mb-1">Dock Code</label>
                  <input className="form-control form-control-sm" value={dockCode} onChange={e => setDockCode(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* PSE Info (collapsible) */}
          <div className="mb-3">
            <button type="button" className="btn btn-sm btn-link p-0" onClick={() => setPseOpen(v => !v)}>
              <i className={`fas ${pseOpen ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`} />
              <strong>PSE Info</strong>
            </button>
            {pseOpen && (
              <div className="card card-body mt-2">
                <div className="row">
                  <div className="col-md-4">
                    <label className="small mb-1">Packing Plant (Curr)</label>
                    <input className="form-control form-control-sm" value={packingPlantCurr} onChange={e => setPackingPlantCurr(e.target.value)} />
                    <label className="small mb-1 mt-2">Packing Plant (Next)</label>
                    <input className="form-control form-control-sm" value={packingPlantNext} onChange={e => setPackingPlantNext(e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1">Vanning Plant (Curr)</label>
                    <input className="form-control form-control-sm" value={vanningPlantCurr} onChange={e => setVanningPlantCurr(e.target.value)} />
                    <label className="small mb-1 mt-2">Vanning Plant (Next)</label>
                    <input className="form-control form-control-sm" value={vanningPlantNext} onChange={e => setVanningPlantNext(e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1">Order Pattern (Curr)</label>
                    <input className="form-control form-control-sm" value={orderPatternCurr} onChange={e => setOrderPatternCurr(e.target.value)} />
                    <label className="small mb-1 mt-2">Order Pattern (Next)</label>
                    <input className="form-control form-control-sm" value={orderPatternNext} onChange={e => setOrderPatternNext(e.target.value)} />
                  </div>

                  <div className="col-12 mt-3">
                    <label className="small mb-1">Category</label>
                    <select className="form-control form-control-sm" value={category} onChange={e => setCategory(e.target.value)}>
                      <option value="">—</option>
                      <option value="Trim">Trim</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-12 mt-2">
                    <label className="small mb-1">Katashiki (AD/AU/AF/AX)</label>
                    <div className="form-row">
                      <div className="col"><input className="form-control form-control-sm" placeholder="AD" value={katashiki.AD} onChange={e => setKatashiki(k => ({ ...k, AD: e.target.value }))} /></div>
                      <div className="col"><input className="form-control form-control-sm" placeholder="AU" value={katashiki.AU} onChange={e => setKatashiki(k => ({ ...k, AU: e.target.value }))} /></div>
                      <div className="col"><input className="form-control form-control-sm" placeholder="AF" value={katashiki.AF} onChange={e => setKatashiki(k => ({ ...k, AF: e.target.value }))} /></div>
                      <div className="col"><input className="form-control form-control-sm" placeholder="AX" value={katashiki.AX} onChange={e => setKatashiki(k => ({ ...k, AX: e.target.value }))} /></div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Importer Line Process</label>
                        <input className="form-control form-control-sm" value={importerLineProcess} onChange={e => setImporterLineProcess(e.target.value)} />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Case Code</label>
                        <input className="form-control form-control-sm" value={caseCode} onChange={e => setCaseCode(e.target.value)} />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Box Number</label>
                        <input className="form-control form-control-sm" value={boxNumber} onChange={e => setBoxNumber(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Renban</label>
                        <input className="form-control form-control-sm" value={renban} onChange={e => setRenban(e.target.value)} />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Renban Eff</label>
                        <input className="form-control form-control-sm" value={renbanEff} onChange={e => setRenbanEff(e.target.value)} />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Packing Process - Boxing</label>
                        <select className="form-control form-control-sm" value={packingProcessBoxing} onChange={e => setPackingProcessBoxing(e.target.value)}>
                          <option value="">—</option>
                          <option value="SUPPLIER">SUPPLIER</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label className="small mb-1">Packing Process - Stacking</label>
                        <select className="form-control form-control-sm" value={packingProcessStacking} onChange={e => setPackingProcessStacking(e.target.value)}>
                          <option value="">—</option>
                          <option value="TMMIN">TMMIN</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Images sections (collapsible) */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setImagesOpen(v => !v)}
              aria-expanded={imagesOpen}
              aria-controls="imagesSection"
            >
              <strong>
                <i className={`fas ${imagesOpen ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`} />
                Images
              </strong>
            </button>
            {imagesOpen && (
              <div id="imagesSection">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="small">Part Images</label>
                    <div className="border p-2 mb-2">
                      {imagesPart.length === 0 ? <div className="text-muted">No images</div> : imagesPart.map((it, i) => <div key={i}>{it.caption}</div>)}
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary mr-2" onClick={() => { const caption = prompt('Image caption'); if (caption) setImagesPart(p => [...p, { caption }]) }}>+ Add</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="small">Packing Images</label>
                    <div className="border p-2 mb-2">
                      {imagesPacking.length === 0 ? <div className="text-muted">No images</div> : imagesPacking.map((it, i) => <div key={i}>{it.caption}</div>)}
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => { const caption = prompt('Image caption'); if (caption) setImagesPacking(p => [...p, { caption }]) }}>+ Add</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mt-2">
                    <label className="small">Outer Images</label>
                    <div className="border p-2 mb-2">
                      {imagesOuter.length === 0 ? <div className="text-muted">No images</div> : imagesOuter.map((it, i) => <div key={i}>{it.caption}</div>)}
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => { const caption = prompt('Image caption'); if (caption) setImagesOuter(p => [...p, { caption }]) }}>+ Add</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mt-2">
                    <label className="small">QKP Images</label>
                    <div className="border p-2 mb-2">
                      {imagesQkp.length === 0 ? <div className="text-muted">No images</div> : imagesQkp.map((it, i) => <div key={i}>{it.caption}</div>)}
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => { const caption = prompt('Image caption'); if (caption) setImagesQkp(p => [...p, { caption }]) }}>+ Add</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mt-2">
                    <label className="small">BKP Images</label>
                    <div className="border p-2 mb-2">
                      {imagesBkp.length === 0 ? <div className="text-muted">No images</div> : imagesBkp.map((it, i) => <div key={i}>{it.caption}</div>)}
                      <div className="mt-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => { const caption = prompt('Image caption'); if (caption) setImagesBkp(p => [...p, { caption }]) }}>+ Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr />

          {/* Packing outer summary (collapsible) */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setPackingOpen(v => !v)}
              aria-expanded={packingOpen}
              aria-controls="packingSection"
            >
              <strong>
                <i className={`fas ${packingOpen ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`} />
                Packing
              </strong>
            </button>
            {packingOpen && (
              <div id="packingSection">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="small">Module Type (Outer)</label>
                    <div className="input-group input-group-sm">
                      <input className="form-control form-control-sm" value={outerModuleType} onChange={e => setOuterModuleType(e.target.value)} />
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => alert('Search module type placeholder')}><i className="fas fa-search" /></button>
                      </div>
                    </div>

                    <div className="form-row mt-2">
                      <div className="col">
                        <label className="small">Dimension (cm)</label>
                        <div className="d-flex">
                          <input className="form-control form-control-sm" value={outerDimension.L} onChange={e => setOuterDimension(d => ({ ...d, L: e.target.value }))} placeholder="L" />
                          <input className="form-control form-control-sm mx-1" value={outerDimension.W} onChange={e => setOuterDimension(d => ({ ...d, W: e.target.value }))} placeholder="W" />
                          <input className="form-control form-control-sm" value={outerDimension.H} onChange={e => setOuterDimension(d => ({ ...d, H: e.target.value }))} placeholder="H" />
                        </div>
                      </div>
                    </div>

                    <div className="form-row mt-2">
                      <div className="col">
                        <label className="small">Inner (m³)</label>
                        <input className="form-control form-control-sm" value={innerVolume} onChange={e => setInnerVolume(e.target.value)} />
                      </div>
                      <div className="col">
                        <label className="small">Outer (m³)</label>
                        <input className="form-control form-control-sm" value={outerVolume} onChange={e => setOuterVolume(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Inner pack materials table */}
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="small mb-1">INNER (Pack Material)</label>
                      <div>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => {
                          const m = prompt('Material No'); if (m) setNewInner(n => ({ ...n, materialNo: m }))
                        }}>add</button>
                      </div>
                    </div>

                    <div className="table-responsive mt-2">
                      <table className="table table-sm table-bordered mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: 40 }}>No</th>
                            <th>Pack Material No</th>
                            <th>Suffix</th>
                            <th>Name</th>
                            <th>Supplier</th>
                            <th>L</th>
                            <th>W</th>
                            <th>H</th>
                            <th>Wt/PC</th>
                            <th>Qty</th>
                            <th>Total Wt</th>
                            <th style={{ width: 80 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {innerRows.length === 0 ? (
                            <tr><td colSpan="12" className="text-center text-muted py-3">No Data Found</td></tr>
                          ) : innerRows.map((r, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{r.materialNo}</td>
                              <td>{r.suffix}</td>
                              <td>{r.name}</td>
                              <td>{r.supplierName}</td>
                              <td>{r.L}</td>
                              <td>{r.W}</td>
                              <td>{r.H}</td>
                              <td>{r.wtPerPc}</td>
                              <td>{r.qty}</td>
                              <td>{(Number(r.wtPerPc || 0) * Number(r.qty || 0)).toFixed(2)}</td>
                              <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveInnerRow(i)}><i className="fas fa-trash" /></button></td>
                            </tr>
                          ))}
                          {/* Add new row inline */}
                          <tr>
                            <td>+</td>
                            <td><input className="form-control form-control-sm" value={newInner.materialNo} onChange={e => setNewInner(n => ({ ...n, materialNo: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.suffix} onChange={e => setNewInner(n => ({ ...n, suffix: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.name} onChange={e => setNewInner(n => ({ ...n, name: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.supplierName} onChange={e => setNewInner(n => ({ ...n, supplierName: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.L} onChange={e => setNewInner(n => ({ ...n, L: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.W} onChange={e => setNewInner(n => ({ ...n, W: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.H} onChange={e => setNewInner(n => ({ ...n, H: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.wtPerPc} onChange={e => setNewInner(n => ({ ...n, wtPerPc: e.target.value }))} /></td>
                            <td><input className="form-control form-control-sm" value={newInner.qty} onChange={e => setNewInner(n => ({ ...n, qty: e.target.value }))} /></td>
                            <td>-</td>
                            <td>
                              <div className="btn-group">
                                <button className="btn btn-sm btn-primary" onClick={handleAddInnerRow}>Add</button>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setNewInner({ materialNo: '', suffix: '', name: '', parent: '', supplierId: '', supplierName: '', L: '', W: '', H: '', wtPerPc: '', qty: '' })}>Cancel</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr />

          {/* Notes */}
          <div className="form-group">
            <label className="small mb-1">Note</label>
            <textarea className="form-control form-control-sm" rows="3" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

        </div>

        <div className="card-footer text-right">
          <button className="btn btn-primary mr-2" onClick={() => { onSave(buildPayload()); onClose() }}><i className="fas fa-save mr-1" /> Save</button>
          <button className="btn btn-success mr-2" onClick={() => { onSubmit(buildPayload()); onClose() }}><i className="fas fa-upload mr-1" /> Submit</button>
          <button className="btn btn-outline-secondary" onClick={onClose}><i className="fas fa-times mr-1" /> Cancel</button>
        </div>
      </div>

      <style>{`
        .np-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 2000; display:flex; align-items:center; justify-content:center; padding:1rem; }
        .np-modal { width: 100%; max-height: 95vh; overflow: auto; z-index: 2001; }
        .table-sm td, .table-sm th { vertical-align: middle; }
      `}</style>
    </div>
  )
}
