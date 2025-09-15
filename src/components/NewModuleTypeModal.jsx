// src/components/NewModuleTypeModal.jsx
import React, { useState } from 'react'

export default function NewModuleTypeModal({ show, onClose, onSave }) {
  const [typeCode, setTypeCode] = useState('')
  const [itemNo, setItemNo] = useState('')
  const [eWarehousePrice, setEWarehousePrice] = useState('')
  const [dimOuter, setDimOuter] = useState({ L: '', W: '', H: '' })
  const [dimOuterM3, setDimOuterM3] = useState('')
  const [dimInner, setDimInner] = useState({ L: '', W: '', H: '' })
  const [dimInnerM3, setDimInnerM3] = useState('')
  const [destCodes, setDestCodes] = useState('')
  const [price, setPrice] = useState('')

  if (!show) return null

  const handleSave = () => {
    const payload = {
      typeCode,
      itemNo,
      eWarehousePrice,
      dimOuter,
      dimOuterM3,
      dimInner,
      dimInnerM3,
      destCodes,
      price
    }
    onSave(payload)
    onClose()
    // reset form
    setTypeCode('')
    setItemNo('')
    setEWarehousePrice('')
    setDimOuter({ L: '', W: '', H: '' })
    setDimOuterM3('')
    setDimInner({ L: '', W: '', H: '' })
    setDimInnerM3('')
    setDestCodes('')
    setPrice('')
  }

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><b>Module Type New</b></h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Type Code</label>
                <input type="text" className="form-control form-control-sm" value={typeCode} onChange={e => setTypeCode(e.target.value)} />
              </div>

              <div className="form-group col-md-6">
                <label>Item No</label>
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control form-control-sm" value={itemNo} onChange={e => setItemNo(e.target.value)} />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary btn-sm" type="button">Search</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>E-Warehouse Price</label>
                <input type="text" className="form-control form-control-sm" value={eWarehousePrice} onChange={e => setEWarehousePrice(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Dim Outer (mm³)</label>
                <div className="form-row">
                  <div className="col"><input type="text" className="form-control form-control-sm" placeholder="L" value={dimOuter.L} onChange={e => setDimOuter({...dimOuter, L: e.target.value})} /></div>
                  <div className="col"><input type="text" className="form-control form-control-sm" placeholder="W" value={dimOuter.W} onChange={e => setDimOuter({...dimOuter, W: e.target.value})} /></div>
                  <div className="col"><input type="text" className="form-control form-control-sm" placeholder="H" value={dimOuter.H} onChange={e => setDimOuter({...dimOuter, H: e.target.value})} /></div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Dim Outer (m³)</label>
                <input type="text" className="form-control form-control-sm" value={dimOuterM3} onChange={e => setDimOuterM3(e.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Dim Inner (mm³)</label>
                <div className="form-row">
                  <div className="col"><input type="text" className="form-control form-control-sm" placeholder="L" value={dimInner.L} onChange={e => setDimInner({...dimInner, L: e.target.value})} /></div>
                  <div className="col"><input type="text" className="form-control form-control-sm" placeholder="W" value={dimInner.W} onChange={e => setDimInner({...dimInner, W: e.target.value})} /></div>
                  <div className="col"><input type="text" className="form-control form-control-sm" placeholder="H" value={dimInner.H} onChange={e => setDimInner({...dimInner, H: e.target.value})} /></div>
                </div>
              </div>
            </div>

            <div className="form-row mb-2">
              <div className="form-group col-md-6">
                <label>Dim Inner (m³)</label>
                <input type="text" className="form-control form-control-sm" value={dimInnerM3} onChange={e => setDimInnerM3(e.target.value)} />
              </div>

              <div className="form-group col-md-6">
                <label>Dest Code</label>
                <input type="text" className="form-control form-control-sm" value={destCodes} onChange={e => setDestCodes(e.target.value)} placeholder="e.g., 301B - Argentina ^ 807B - Indonesia" />
              </div>
            </div>

            <div className="form-row mb-2">
              <div className="form-group col-md-6">
                <label>Price</label>
                <input type="text" className="form-control form-control-sm" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleSave}>
              <i className="fas fa-download mr-1" /> Save
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              <i className="fas fa-times-circle mr-1" /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

