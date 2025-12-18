import React, { useState } from "react";

export default function PseInfoSection(props) {
  // Destructure props as needed
  const {
    config,
    pseOpen,
    setPseOpen,
    packingPlantCurr,
    setPackingPlantCurr,
    packingPlantNext,
    setPackingPlantNext,
    vanningPlantCurr,
    setVanningPlantCurr,
    vanningPlantNext,
    setVanningPlantNext,
    orderPatternCurr,
    setOrderPatternCurr,
    orderPatternNext,
    setOrderPatternNext,
    category,
    setCategory,
    katashiki,
    setKatashiki,
    importerLineProcess,
    setImporterLineProcess,
    caseCode,
    setCaseCode,
    boxNumber,
    setBoxNumber,
    renban,
    setRenban,
    renbanEff,
    setRenbanEff,
    packingProcessBoxing,
    setPackingProcessBoxing,
    packingProcessStacking,
    setPackingProcessStacking,
    pseOuterRows,
    setPseOuterRows,
    newPseOuter,
    setNewPseOuter,
    openMaterialPicker,
  } = props;

  const [showNewRow, setShowNewRow] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddRow = () => {
    if (!newPseOuter.materialNo.trim()) {
      alert('Enter Pack Material No');
      return;
    }
    setPseOuterRows(prev => [...prev, { ...newPseOuter }]);
    setNewPseOuter({
      materialNo: '',
      suffix: '',
      name: '',
      supplier: '',
      L: '',
      W: '',
      H: '',
      wtPerPc: '',
      qty: '',
      totalWt: ''
    });
    setShowNewRow(false);
  };

  const handleRemoveRow = (index) => {
    setPseOuterRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = pseOuterRows.map((row, i) => {
      if (i === index) {
        const newRow = { ...row, [field]: value };
        if (field === 'qty' || field === 'wtPerPc') {
          newRow.totalWt = (parseFloat(newRow.qty) || 0) * (parseFloat(newRow.wtPerPc) || 0);
        }
        return newRow;
      }
      return row;
    });
    setPseOuterRows(updatedRows);
  };

  const renderRow = (r, i) => {
    const isEditing = editingIndex === i;
    return (
      <tr key={i}>
        <td>
          {isEditing ? (
            <div className="input-group">
              <input value={r.materialNo} onChange={(e) => handleRowChange(i, 'materialNo', e.target.value)} className="form-control form-control-sm" />
              <div className="input-group-append">
                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => openMaterialPicker(i === 0 ? 'Module' : 'outer', i)}>
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          ) : (
            r.materialNo
          )}
        </td>
        <td>{isEditing ? <input readOnly value={r.suffix} onChange={(e) => handleRowChange(i, 'suffix', e.target.value)} className="form-control form-control-sm" /> : r.suffix}</td>
        <td>{r.name}</td>
        <td>{r.supplier}</td>
        <td>{isEditing ? <input readOnly value={r.L} onChange={(e) => handleRowChange(i, 'L', e.target.value)} className="form-control form-control-sm" /> : r.L}</td>
        <td>{isEditing ? <input readOnly value={r.W} onChange={(e) => handleRowChange(i, 'W', e.target.value)} className="form-control form-control-sm" /> : r.W}</td>
        <td>{isEditing ? <input readOnly value={r.H} onChange={(e) => handleRowChange(i, 'H', e.target.value)} className="form-control form-control-sm" /> : r.H}</td>
        <td>{isEditing ? <input value={r.wtPerPc} onChange={(e) => handleRowChange(i, 'wtPerPc', e.target.value)} className="form-control form-control-sm" /> : r.wtPerPc}</td>
        <td>{isEditing ? <input value={r.qty} onChange={(e) => handleRowChange(i, 'qty', e.target.value)} className="form-control form-control-sm" /> : r.qty}</td>
        <td>{r.totalWt}</td>
        <td><button className="btn btn-sm btn-link"><i className="fas fa-file-alt" /></button></td>
        <td><button className="btn btn-sm btn-link"><i className="fas fa-file-alt" /></button></td>
        <td>
          {isEditing ? (
            <button className="btn btn-sm btn-primary" onClick={() => setEditingIndex(null)} disabled={!config.editable}>
              Save
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveRow(i);
              }}
              disabled={!config.editable}
            >
              <i className="fas fa-trash" />
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div>
      {/* PSE Info (collapsible) */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-sm btn-link p-0 section-header"
          onClick={() => setPseOpen((v) => !v)}
        >
          <i
            className={`fas ${
              pseOpen ? "fa-chevron-down" : "fa-chevron-right"
            } mr-2`}
          />
          <strong>PSE Information</strong>
        </button>
        {pseOpen && (
          <div className="card card-body mt-2">
            <div className="row">
              <div className="col-md-4">
                <label className="small mb-1">Packing Plant (Curr)</label>
                <input
                  className="form-control form-control-sm"
                  value={packingPlantCurr}
                  onChange={(e) => setPackingPlantCurr(e.target.value)}
                  disabled={!config.editable}
                />
                <label className="small mb-1 mt-2">Packing Plant (Next)</label>
                <input
                  className="form-control form-control-sm"
                  value={packingPlantNext}
                  onChange={(e) => setPackingPlantNext(e.target.value)}
                  disabled={!config.editable}
                />
              </div>
              <div className="col-md-4">
                <label className="small mb-1">Vanning Plant (Curr)</label>
                <input
                  className="form-control form-control-sm"
                  value={vanningPlantCurr}
                  onChange={(e) => setVanningPlantCurr(e.target.value)}
                  disabled={!config.editable}
                />
                <label className="small mb-1 mt-2">Vanning Plant (Next)</label>
                <input
                  className="form-control form-control-sm"
                  value={vanningPlantNext}
                  onChange={(e) => setVanningPlantNext(e.target.value)}
                  disabled={!config.editable}
                />
              </div>
              <div className="col-md-4">
                <label className="small mb-1">Order Pattern (Curr)</label>
                <input
                  className="form-control form-control-sm"
                  value={orderPatternCurr}
                  onChange={(e) => setOrderPatternCurr(e.target.value)}
                  disabled={!config.editable}
                />
                <label className="small mb-1 mt-2">Order Pattern (Next)</label>
                <input
                  className="form-control form-control-sm"
                  value={orderPatternNext}
                  onChange={(e) => setOrderPatternNext(e.target.value)}
                  disabled={!config.editable}
                />
              </div>

              <div className="col-12 mt-3">
                <label className="small mb-1">Category</label>
                <select
                  className="form-control form-control-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!config.editable}
                >
                  <option value="">—</option>
                  <option value="Trim">Trim</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* === KATASHIKI (flex, input vertical, no add/remove, code disabled) === */}
              <div className="kat-wrap mb-3">
                <div className="kat-title">Katashiiki</div>

                <div className="kat-flex">
                  <div className="kat-list">
                    {katashiki.length === 0 ? (
                      <div className="kat-empty text-muted">
                        <span>No data katashiiki.</span>
                      </div>
                    ) : (
                      katashiki.map((k, idx) => (
                        <div className="kat-item" key={idx}>
                          <div className="kat-box">
                            <div className="kat-label">{k.string}:</div>

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
                              disabled
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Importer Line Process</label>
                    <input
                      className="form-control form-control-sm"
                      value={importerLineProcess}
                      onChange={(e) => setImporterLineProcess(e.target.value)}
                      disabled={!config.editable}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Case Code</label>
                    <input
                      className="form-control form-control-sm"
                      value={caseCode}
                      onChange={(e) => setCaseCode(e.target.value)}
                      disabled={!config.editable}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Box Number</label>
                    <input
                      className="form-control form-control-sm"
                      value={boxNumber}
                      onChange={(e) => setBoxNumber(e.target.value)}
                      disabled={!config.editable}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Renban</label>
                    <input
                      className="form-control form-control-sm"
                      value={renban}
                      onChange={(e) => setRenban(e.target.value)}
                      disabled={!config.editable}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Renban Eff</label>
                    <input
                      className="form-control form-control-sm"
                      value={renbanEff}
                      onChange={(e) => setRenbanEff(e.target.value)}
                      disabled={!config.editable}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">
                      Packing Process - Boxing
                    </label>
                    <select
                      className="form-control form-control-sm"
                      value={packingProcessBoxing}
                      onChange={(e) => setPackingProcessBoxing(e.target.value)}
                      disabled={!config.editable}
                    >
                      <option value="">—</option>
                      <option value="SUPPLIER">SUPPLIER</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="small mb-1">
                      Packing Process - Stacking
                    </label>
                    <select
                      className="form-control form-control-sm"
                      value={packingProcessStacking}
                      onChange={(e) =>
                        setPackingProcessStacking(e.target.value)
                      }
                      disabled={!config.editable}
                    >
                      <option value="">—</option>
                      <option value="TMMIN">TMMIN</option>
                    </select>
                  </div>
                </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <label className="small mb-1">OUTER (Pack Material)</label>
            <div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setEditingIndex(null);
                  setShowNewRow(true);
                }}
                disabled={showNewRow || !config.editable}
              >
                Add
              </button>
            </div>
          </div>            

        <div className="table-responsive mt-2">
          <table className="table table-sm table-bordered mb-0 small">
            <thead style={{ backgroundColor: "#cfcfcfff" }}>
              <tr className="text-center">
                <th style={{ width: 30 }}>No</th>
                <th style={{ width: 120 }}>Pack Material No</th>
                <th style={{ width: 40 }}>Suffix</th>
                <th>Name</th>
                <th>Supplier</th>
                <th style={{ width: 60 }}>L</th>
                <th style={{ width: 60 }}>W</th>
                <th style={{ width: 60 }}>H</th>
                <th style={{ width: 60 }}>Wt/pc</th>
                <th style={{ width: 60 }}>Qty</th>
                <th style={{ width: 80 }}>Total Wt</th>
                <th style={{ width: 10 }}>msds</th>
                <th style={{ width: 10 }}>draw</th>
                <th style={{ width: 80 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pseOuterRows.length === 0 && !showNewRow ? (
                <tr>
                  <td colSpan="14" className="text-center text-muted py-3">
                    No Data Found
                  </td>
                </tr>
              ) : (
                pseOuterRows.map(renderRow)
              )}
              {showNewRow && (
                <tr>
                  <td>+</td>
                  <td>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        value={newPseOuter.materialNo}
                        onChange={(e) => setNewPseOuter(n => ({ ...n, materialNo: e.target.value }))}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => openMaterialPicker('Outer', 'new')}
                          disabled={!config.editable}
                        >
                          ...
                        </button>
                      </div>
                    </div>
                  </td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.suffix} onChange={(e) => setNewPseOuter(n => ({ ...n, suffix: e.target.value }))} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.name} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.supplier} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.L} onChange={(e) => setNewPseOuter(n => ({ ...n, L: e.target.value }))} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.W} onChange={(e) => setNewPseOuter(n => ({ ...n, W: e.target.value }))} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.H} onChange={(e) => setNewPseOuter(n => ({ ...n, H: e.target.value }))} /></td>
                  <td><input className="form-control form-control-sm" value={newPseOuter.wtPerPc} onChange={(e) => setNewPseOuter(n => ({ ...n, wtPerPc: e.target.value, totalWt: (parseFloat(e.target.value) || 0) * (parseFloat(n.qty) || 0) }))} /></td>
                  <td><input className="form-control form-control-sm" value={newPseOuter.qty} onChange={(e) => setNewPseOuter(n => ({ ...n, qty: e.target.value, totalWt: (parseFloat(e.target.value) || 0) * (parseFloat(n.wtPerPc) || 0) }))} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newPseOuter.totalWt} /></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={handleAddRow}
                        disabled={!config.editable}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setShowNewRow(false)}
                        disabled={!config.editable}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}