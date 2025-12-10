import React, { useEffect, useState } from 'react'
import { handleInputChange } from '../utils/globalFunctions'

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

  function handleSearchEWH() {
    // For demonstration, using mock data. Replace with actual API call.
    const randomMaterialNo = `EWH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const randomPrice = (Math.random() * 1000).toFixed(2)

    setEWarehouse(randomMaterialNo)
    setEWarehousePrice(randomPrice)
    setPrice(randomPrice)
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

        <div className="card-body" style={{ fontSize: '0.7rem' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Item No <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={materialNo}
                    onChange={handleInputChange(setMaterialNo)}
                    placeholder="Enter Item No"
                    autoFocus
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      style={{ fontSize: '0.8rem' }}
                      onClick={handleSearchEWH}
                      disabled={!materialNo}
                    >
                      <i className="fas fa-search mr-1"></i>
                      Search eWH
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Material Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={materialName}
                  onChange={handleInputChange(setMaterialName)}
                  placeholder="Enter Material Name"
                />
              </div>

            </div>

            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
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
                </div>
                <div className="col-6">
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
                      readOnly
                    />
                  </div>
                </div>
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
                  <option value="Module">Box</option>
                </select>
              </div>

            </div>
          </div>

          {/* Supplier Section */}
          <h6 className="mt-3"><b>Supplier</b></h6>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={supplierCode}
                  onChange={handleInputChange(setSupplierCode)}
                  placeholder="Enter Supplier Code"
                />
              </div>
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
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={supplierName}
                  readOnly
                  placeholder="Supplier Name"
                />
              </div>
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
            </div>
          </div>
          
          {/* Dimension Section */}
          <h6 className="mt-3"><b>Dimension</b></h6>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Length (mm) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={dimLength}
                  onChange={e => setDimLength(e.target.value)}
                  placeholder="Length (mm)"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Weight/pc (gr)</label>
                <input
                  type="number"
                  className="form-control"
                  value={dimWeightPc}
                  onChange={e => setDimWeightPc(e.target.value)}
                  placeholder="Weight/pc (gr)"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Width (mm) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={dimWidth}
                  onChange={e => setDimWidth(e.target.value)}
                  placeholder=" Width (mm)"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Qty/Bundling</label>
                <input
                  type="number"
                  className="form-control"
                  value={dimQtyBundling}
                  onChange={e => setDimQtyBundling(e.target.value)}
                  placeholder="Qty/Bundling"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Height (mm) <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  value={dimHeight}
                  onChange={e => setDimHeight(e.target.value)}
                  placeholder="Height (mm)"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Total Weight (gr)</label>
                <input
                  type="number"
                  className="form-control"
                  value={totalDimWeight}
                  onChange={e => setTotalDimWeight(e.target.value)}
                  placeholder="Total Weight (gr)"
                />
              </div>
            </div>
          </div>

          <h6 className="mt-3"><b>Documents</b></h6>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">MSDS</label>
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
                <label className="form-label">Drawing</label>
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