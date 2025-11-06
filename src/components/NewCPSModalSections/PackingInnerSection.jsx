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
 */
export default function PackingInnerSection(props) {
  const {
    innerRows,
    setInnerRows,
    newInner,
    setNewInner,
    handleAddInnerRow,
    handleRemoveInnerRow,
    openMaterialPicker,
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

  const handleRowChange = (index, field, value) => {
    const updatedRows = innerRows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setInnerRows(updatedRows);
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
              disabled={showNewRow}
            >
              Add
            </button>
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
              {innerRows.length === 0 && !showNewRow ? (
                <tr>
                  <td
                    colSpan="12"
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
                          <input
                            ref={materialNoInputRef}
                            value={r.materialNo}
                            onChange={(e) => handleRowChange(i, 'materialNo', e.target.value)}
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            value={r.suffix}
                            onChange={(e) => handleRowChange(i, 'suffix', e.target.value)}
                            className="form-control form-control-sm"
                          />
                        </td>
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
                          />
                        </td>
                        <td>
                          <input
                            value={r.qty}
                            onChange={(e) => handleRowChange(i, 'qty', e.target.value)}
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>{(Number(r.wtPerPc || 0) * Number(r.qty || 0)).toFixed(2)}</td>
                        <td>
                          <button className="btn btn-sm btn-primary" onClick={() => setEditingIndex(null)}>
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
                        setEditingIndex(i);
                        setShowNewRow(false);
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
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveInnerRow(i);
                          }}
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
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => openMaterialPicker('inner')}
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
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={handleAddInnerRow}
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