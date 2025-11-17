// src/pages/packing/CalculatePackingCost.jsx
import React, { useState } from 'react'
import PackingCostNewModal from '../../components/PackingCostNewModal'
import SearchSection from './CalculatePackingCostSections/SearchSection';
import ResultSection from './CalculatePackingCostSections/ResultSection';

export default function CalculatePackingCost() {
  // filters (two-column layout)
  const [calCode, setCalCode] = useState('')
  const [period, setPeriod] = useState('All')
  const [destCode, setDestCode] = useState('All')
  const [modelCode, setModelCode] = useState('')
  const [type, setType] = useState('All') // 'All' | 'PxP' | 'Lot'

  // table / paging state (empty for now)
  const [rows, setRows] = useState([]) // <-- use both!
  const [perPage, setPerPage] = useState(3)
  const [page, setPage] = useState(1)
  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  // Modal state
  const [showNewModal, setShowNewModal] = useState(false)

  function handleFilter(e) {
    e && e.preventDefault && e.preventDefault()
    console.log('Filter with', { calCode, period, destCode, modelCode, type })
    setPage(1)
  }

  function handleClear() {
    setCalCode('')
    setPeriod('All')
    setDestCode('All')
    setModelCode('')
    setType('All')
    setPage(1)
  }

  function goToPage(p) {
    const p2 = Math.min(Math.max(1, p), totalPages)
    setPage(p2)
  }

  const visibleRows = rows.slice((page - 1) * perPage, page * perPage)

  // Called when modal Save is pressed (payload contains modal form + parts)
  function handleModalSave(payload) {
    console.log('Packing cost saved payload:', payload);
    const newRow = {
      ...payload,
      numParts: payload.parts.length,
    };
    setRows(prev => [...prev, newRow]);
    setShowNewModal(false);
    // TODO: send payload to backend / add to list
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        {/* header */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Packing Cost Calculation List</b></h3>
          <div className="card-tools ml-auto d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-success mr-2"
              title="Calculate Packing Cost"
              onClick={() => setShowNewModal(true)}
            >
              <i className="fas fa-calculator mr-1" /> Calculate Packing Cost
            </button>

            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload">
              <i className="fas fa-cloud-upload-alt" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" title="Template">
              <i className="fas fa-cloud-download-alt" /> Template
            </button>
          </div>
        </div>

        <SearchSection
          calCode={calCode} setCalCode={setCalCode}
          period={period} setPeriod={setPeriod}
          destCode={destCode} setDestCode={setDestCode}
          modelCode={modelCode} setModelCode={setModelCode}
          type={type} setType={setType}
          handleFilter={handleFilter} handleClear={handleClear}
        />

        <ResultSection
          rows={rows} visibleRows={visibleRows}
          page={page} totalPages={totalPages} goToPage={goToPage}
          perPage={perPage} setPerPage={setPerPage} total={total}
        />
      </div>

      {/* Packing Cost New Modal */}
      <PackingCostNewModal
        show={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSave={handleModalSave}
      />
    </div>
  )
}