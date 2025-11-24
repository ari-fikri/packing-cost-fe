import React, { useEffect, useState } from 'react'

export default function NewMaterialModal({ show, onClose, onSave, initialData = null, mode = 'new' }) {
  const [materialNo, setMaterialNo] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [price, setPrice] = useState('')
  const [materialType, setMaterialType] = useState('')
  const [supplierCode, setSupplierCode] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [address, setAddress] = useState('')
  const [plantCode, setPlantCode] = useState('')
  const [eWarehouse, setEWarehouse] = useState('')
  const [eWarehousePrice, setEWarehousePrice] = useState('')
  const [dimLength, setDimLength] = useState('')
  const [dimWeightPc, setDimWeightPc] = useState('')
  const [dimWidth, setDimWidth] = useState('')
  const [dimQtyBundling, setDimQtyBundling] = useState('')
  const [dimHeight, setDimHeight] = useState('')
  const [totalDimWeight, setTotalDimWeight] = useState('')
  const [docMSDS, setDocMSDS] = useState('')
  const [docDrawing, setDocDrawing] = useState('')

  useEffect(() => {
    if (show && initialData) {
      setMaterialNo(initialData.materialNo || '')
      setMaterialName(initialData.materialName || '')
      setPrice(initialData.price ?? '')
      setMaterialType(initialData.materialType || '')
      setSupplierCode(initialData.supplierCode || '')
      setSupplierName(initialData.supplierName || '')
      setAddress(initialData.address || '')
      setPlantCode(initialData.plantCode || '')
      setEWarehouse(initialData.eWarehouse || '')
      setEWarehousePrice(initialData.eWarehousePrice || '')
      setDimLength(initialData.dimLength || '')
      setDimWeightPc(initialData.dimWeightPc || '')
      setDimWidth(initialData.dimWidth || '')
      setDimQtyBundling(initialData.dimQtyBundling || '')
      setDimHeight(initialData.dimHeight || '')
      setTotalDimWeight(initialData.totalDimWeight || '')
      setDocMSDS(initialData.docMSDS || '')
      setDocDrawing(initialData.docDrawing || '')
    } else if (!show) {
      handleClear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, initialData])

  function handleSave() {
    if (!materialNo || !materialName || !materialType) {
      alert('Please fill in Material No, Material Name, and Material Type')
      return
    }

    const newMaterial = {
      // preserve any id if present
      id: initialData?.id,
      materialNo,
      materialName,
      price,
      materialType,
      supplierCode,
      supplierName,
      address,
      plantCode,
      eWarehouse,
      eWarehousePrice,
      dimLength,
      dimWeightPc,
      dimWidth,
      dimQtyBundling,
      dimHeight,
      totalDimWeight,
      docMSDS,
      docDrawing,
      createdDate: mode === 'edit' ? (initialData?.createdDate || new Date().toLocaleDateString()) : new Date().toLocaleDateString()
    }

    onSave(newMaterial, mode)
    handleClear()
  }

  function handleClear() {
    setMaterialNo('')
    setMaterialName('')
    setPrice('')
    setMaterialType('')
    setSupplierCode('')
    setSupplierName('')
    setAddress('')
    setPlantCode('')
    setEWarehouse('')
    setEWarehousePrice('')
    setDimLength('')
    setDimWeightPc('')
    setDimWidth('')
    setDimQtyBundling('')
    setDimHeight('')
    setTotalDimWeight('')
    setDocMSDS('')
    setDocDrawing('')
  }

  function handleClose() {
    handleClear()
    onClose()
  }

  if (!show) return null

  const title = mode === 'edit' ? 'Material - Edit' : 'Material - New'
  const saveLabel = mode === 'edit' ? 'Save Changes' : 'Save Material'

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose() }}>
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 800 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0">
            <b>{title}</b>
          </h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={handleClose}>
              <i className="fas fa-times" />
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Material No <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={materialNo}
                  onChange={e => setMaterialNo(e.target.value)}
                  placeholder="Enter Material No"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Material Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={materialName}
                  onChange={e => setMaterialName(e.target.value)}
                  placeholder="Enter Material Name"
                />
              </div>

            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Price <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Enter Price"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Material Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  value={materialType}
                  onChange={e => setMaterialType(e.target.value)}
                >
                  <option value="">Select Material Type</option>
                  <option value="Inner">Inner</option>
                  <option value="Outer">Outer</option>
                  <option value="Module">Module</option>
                </select>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Supplier Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={supplierCode}
                  onChange={e => setSupplierCode(e.target.value)}
                  placeholder="Enter Supplier Code"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={supplierName}
                  readOnly
                  placeholder="Supplier Name"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  readOnly
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <label className="form-label">eWarehouse Item No</label>
                <input
                  type="text"
                  className="form-control"
                  value={eWarehouse}
                  onChange={e => setEWarehouse(e.target.value)}
                  placeholder="eWarehouse Item No"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Plant Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={plantCode}
                  readOnly
                  placeholder="Plant Code"
                />
              </div>
              <div className="form-group">
                <label className="form-label">eWarehouse Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={eWarehousePrice}
                  onChange={e => setEWarehousePrice(e.target.value)}
                  placeholder="eWarehouse Price"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Dim Length (mm) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={dimLength}
                  onChange={e => setDimLength(e.target.value)}
                  placeholder="Dim Length (mm)"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Dim Weight/pc (gr)</label>
                <input
                  type="number"
                  className="form-control"
                  value={dimWeightPc}
                  onChange={e => setDimWeightPc(e.target.value)}
                  placeholder="Dim Weight/pc (gr)"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Dim Width (mm) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={dimWidth}
                  onChange={e => setDimWidth(e.target.value)}
                  placeholder="Dim Width (mm)"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Dim Qty/Bundling</label>
                <input
                  type="number"
                  className="form-control"
                  value={dimQtyBundling}
                  onChange={e => setDimQtyBundling(e.target.value)}
                  placeholder="Dim Qty/Bundling"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Dim Height (mm) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={dimHeight}
                  onChange={e => setDimHeight(e.target.value)}
                  placeholder="Dim Height (mm)"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Total Dim Weight (gr)</label>
                <input
                  type="number"
                  className="form-control"
                  value={totalDimWeight}
                  onChange={e => setTotalDimWeight(e.target.value)}
                  placeholder="Total Dim Weight (gr)"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Doc MSDS</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-image"></i></span>
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={e => setDocMSDS(e.target.files[0]?.name || '')}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Doc Drawing</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-image"></i></span>
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={e => setDocDrawing(e.target.files[0]?.name || '')}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mt-3">
            <small className="text-muted">
              <span className="text-danger">*</span> Required fields
            </small>
          </div>
        </div>

        <div className="card-footer text-right">
          <button type="button" className="btn btn-secondary mr-2" onClick={handleClose}>
            <i className="fas fa-times mr-1"></i>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            <i className="fas fa-save mr-1"></i>
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  )
}