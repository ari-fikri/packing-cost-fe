import React from 'react'
import DESTINATIONS from '../../data/destinations'

export default function SearchSection({
  code,
  setCode,
  filterName,
  setFilterName,
  filterRemark,
  setFilterRemark,
  implementationPeriod,
  setImplementationPeriod,
  destinationCode,
  setDestinationCode,
  destinationCountryCode,
  setDestinationCountryCode,
  country,
  setCountry,
  handleFilter,
  handleClearFilters,
  handleOpenNew
}) {
  // Handle destination code change and auto-populate related fields
  const handleDestinationCodeChange = (value) => {
    setDestinationCode(value)
    const destination = DESTINATIONS.find(dest => dest.destCode === value)
    if (destination) {
      setDestinationCountryCode(destination.code)
      setCountry(destination.country)
    } else {
      setDestinationCountryCode('')
      setCountry('')
    }
  }
  return (
    <div className="card-body">
      {/* MidSection - Filters */}
      <div className="form-row mb-3">
        <div className="form-group col-md-6">
          <label className="small mb-1">Model Code</label>
          <div className="input-group input-group-sm">
            <input
              value={code}
              onChange={e => setCode(e.target.value)}
              className="form-control form-control-sm"
              placeholder="Code"
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-outline-secondary btn-sm" title="Search code" onClick={() => alert('Search code placeholder')}>
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>

        <div className="form-group col-md-6">
          <label className="small mb-1">Model Name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            placeholder="Name"
          />
        </div>

        <div className="form-group col-md-6">
          <label className="small mb-1">Implementation Period</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={implementationPeriod}
            onChange={e => setImplementationPeriod(e.target.value)}
            placeholder="Implementation Period"
          />
        </div>

        <div className="form-group col-md-6">
          <label className="small mb-1">Destination Code</label>
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control form-control-sm"
              value={destinationCode}
              onChange={e => handleDestinationCodeChange(e.target.value)}
              placeholder="Destination Code"
            />
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-map-marker-alt" /></span>
            </div>
          </div>
        </div>

        <div className="form-group col-md-6">
          <label className="small mb-1">Destination Country Code</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={destinationCountryCode}
            readOnly
            placeholder="Auto-filled"
            style={{backgroundColor: '#f8f9fa'}}
          />
        </div>

        <div className="form-group col-md-6">
          <label className="small mb-1">Country</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={country}
            readOnly
            placeholder="Auto-filled"
            style={{backgroundColor: '#f8f9fa'}}
          />
        </div>

        <div className="form-group col-md-12">
          <label className="small mb-1">Remark</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={filterRemark}
            onChange={e => setFilterRemark(e.target.value)}
            placeholder="Remark"
          />
        </div>

        {/* BottomSection - Filter Buttons */}
        <div className="form-group col-md-12 text-right">
          <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleFilter}>
            <i className="fas fa-search mr-1" /> Search
          </button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClearFilters}>
            <i className="fas fa-undo mr-1" /> Reset
          </button>
        </div>
      </div>
    </div>
  )
}