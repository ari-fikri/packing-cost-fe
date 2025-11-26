import React, { useState, useEffect, useRef } from 'react';

/**
 * Section for managing inner pack materials.
 * @param {object} props - Component props.
 * @param {Array<object>} props.innerRows - The list of inner pack material rows.
 * @param {function} props.setInnerRows - Function to update the inner rows.
 * @param {object} props.newInner - The object holding data for a new inner row.
 * @param {function} props.setNewInner - Function to update the new inner row data.
 * @param {function} props.handleAddInnerRow - Function to add a new inner row to the list.
 * @param {function} props.handleRemoveInnerRow - Function to remove an inner row from the list.
 * @param {function} props.openMaterialPicker - Function to open the material picker modal.
 * @param {Array<object>} props.materials - The list of all materials.
 */
export default function PackingInnerSection(props) {
  const {
    config,
    innerRows,
    setInnerRows,
    newInner,
    setNewInner,
    handleRemoveInnerRow,
    openMaterialPicker,
    materials,
  } = props;

  // State to control the visibility of the new row input form
  const [showNewRow, setShowNewRow] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const materialNoInputRef = useRef(null);

  useEffect(() => {
    if (editingIndex !== null && materialNoInputRef.current) {
      materialNoInputRef.current.focus();
    }
  }, [editingIndex]);

  const handleAddInnerRow = () => {
    if (!newInner.materialNo.trim()) {
      alert('Enter Pack Material No');
      return;
    }
    setInnerRows(prev => [...prev, { ...newInner }]);
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
    });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = innerRows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setInnerRows(updatedRows);
  };

  const handleMaterialNoBlur = (materialNo, index) => {
    const material = materials.find((m) => m.materialNo === materialNo);
    console.log("Blurred ->>");
    if (material) {
      console.log("Material FOund -->", JSON.stringify(material));
      const updatedData = {
        name: material.materialName,
        supplierName: material.supplier.supplier_name,
        L: material.dimension_inner_length,
        W: material.dimension_inner_width,
        H: material.dimension_inner_height,
      };

      if (index === "new") {
        console.log("New Inner -->", newInner);
        setNewInner((prev) => ({
          ...prev,
          ...updatedData,
        }));
      } else {
        const updatedRows = innerRows.map((row, i) => {
          if (i === index) {
            return {
              ...row,
              ...updatedData,
            };
          }
          return row;
        });
        setInnerRows(updatedRows);
      }
    }
  };

  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          <label className="small mb-1">INNER (Pack Material)</label>
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
              {innerRows.length === 0 && !showNewRow ? (
                <tr>
                  <td
                    colSpan="14"
                    className="text-center text-muted py-3"
                  >
                    No Data Found
                  </td>
                </tr>
              ) : (
                innerRows.map((r, i) => {
                  const isEditing = editingIndex === i;

                  if (isEditing) {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="input-group input-group-sm">
                            <input
                              ref={materialNoInputRef}
                              value={r.materialNo}
                              onChange={(e) => handleRowChange(i, 'materialNo', e.target.value)}
                              onBlur={(e) => handleMaterialNoBlur(e.target.value, i)}
                              className="form-control form-control-sm"
                              disabled={!config.editable}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                type="button"
                                onClick={() => openMaterialPicker(i === 0 ? 'box' : 'inner', i)}
                                //onClick={() => openMaterialPicker('inner', i)}
                                disabled={!config.editable}
                              >
                                ...
                              </button>
                            </div>
                          </div>
                        </td>
                        <td><input value={r.suffix} onChange={(e) => handleRowChange(i, 'suffix', e.target.value)} readOnly className="form-control form-control-sm" /></td>
                        <td><input value={r.name} readOnly className="form-control form-control-sm" /></td>
                        <td><input value={r.supplierName} readOnly className="form-control form-control-sm" /></td>
                        <td><input value={r.L} readOnly className="form-control form-control-sm" /></td>
                        <td><input value={r.W} readOnly className="form-control form-control-sm" /></td>
                        <td><input value={r.H} readOnly className="form-control form-control-sm" /></td>
                        <td>
                          <input
                            value={r.wtPerPc}
                            onChange={(e) => handleRowChange(i, 'wtPerPc', e.target.value)}
                            className="form-control form-control-sm"
                            disabled={!config.editable}
                          />
                        </td>
                        <td>
                          <input
                            value={r.qty}
                            onChange={(e) => handleRowChange(i, 'qty', e.target.value)}
                            className="form-control form-control-sm"
                            disabled={!config.editable}
                          />
                        </td>
                        <td>{(Number(r.wtPerPc || 0) * Number(r.qty || 0)).toFixed(2)}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-info" onClick={() => alert('Show MSDS doc for ' + r.materialNo)}>
                            <i className="fas fa-file-alt" />
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-info" onClick={() => alert('Show Drawing doc for ' + r.materialNo)}>
                            <i className="fas fa-file-alt" />
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary" onClick={() => setEditingIndex(null)} disabled={!config.editable}>
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr
                      key={i}
                      onClick={() => {
                        if (config.editable) {
                          setEditingIndex(i);
                          setShowNewRow(false);
                        }
                      }}
                    >
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
                      <td>
                        <button className="btn btn-sm btn-outline-info" onClick={(e) => { e.stopPropagation(); alert('Show MSDS doc for ' + r.materialNo); }}>
                          <i className="fas fa-file-alt" />
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-info" onClick={(e) => { e.stopPropagation(); alert('Show Drawing doc for ' + r.materialNo); }}>
                          <i className="fas fa-file-alt" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveInnerRow(i);
                          }}
                          disabled={!config.editable}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
              {showNewRow && (
                <tr>
                  <td>+</td>
                  <td>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        value={newInner.materialNo}
                        onChange={(e) =>
                          setNewInner((n) => ({
                            ...n,
                            materialNo: e.target.value,
                          }))
                        }
                        onBlur={(e) => handleMaterialNoBlur(e.target.value, "new")}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => openMaterialPicker(innerRows.length === 0 ? 'box' : 'inner')}
                          disabled={!config.editable}
                        >
                          ...
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.suffix}
                      onChange={(e) =>
                        setNewInner((n) => ({
                          ...n,
                          suffix: e.target.value,
                        }))
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.name}
                      onChange={(e) =>
                        setNewInner((n) => ({
                          ...n,
                          name: e.target.value,
                        }))
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.supplierName}
                      onChange={(e) =>
                        setNewInner((n) => ({
                          ...n,
                          supplierName: e.target.value,
                        }))
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.L}
                      onChange={(e) =>
                        setNewInner((n) => ({ ...n, L: e.target.value }))
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.W}
                      onChange={(e) =>
                        setNewInner((n) => ({ ...n, W: e.target.value }))
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.H}
                      onChange={(e) =>
                        setNewInner((n) => ({ ...n, H: e.target.value }))
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.wtPerPc}
                      onChange={(e) =>
                        setNewInner((n) => ({
                          ...n,
                          wtPerPc: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      value={newInner.qty}
                      onChange={(e) =>
                        setNewInner((n) => ({
                          ...n,
                          qty: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td>-</td>
                  <td>
                    <button className="btn btn-sm btn-outline-info" onClick={() => alert('Show MSDS doc for new material')}>
                      <i className="fas fa-file-alt" />
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-info" onClick={() => alert('Show Drawing doc for new material')}>
                      <i className="fas fa-file-alt" />
                    </button>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={handleAddInnerRow}
                        disabled={!config.editable}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setNewInner({
                            materialNo: "",
                            suffix: "",
                            name: "",
                            parent: "",
                            supplierId: "",
                            supplierName: "",
                            L: "",
                            W: "",
                            H: "",
                            wtPerPc: "",
                            qty: "",
                          });
                          setShowNewRow(false);
                        }}
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
  );
}