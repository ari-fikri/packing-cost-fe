import React, { useState } from 'react';
import PartPickerModal from '../../../components/PartPickerModal';

const SearchSection = ({ filters, setters, onSearch, onClear, onPersonPicker, onDestinationPicker, destinations }) => {
  const [showPartPicker, setShowPartPicker] = useState(false);

  const handleDestCodeChange = (e) => {
    const code = e.target.value;
    setters.setDestCode(code);
    const destination = destinations.find(d => d.destCode === code);
    if (destination) {
      setters.setDestCountry(`${destination.code} - ${destination.country}`);
    } else {
      setters.setDestCountry('');
    }
  };

  const handlePartPicked = (part) => {
    setters.setPartNo(part.partNo);
    setters.setPartName(part.partName);
    setters.setSupplierCode(part.supplierId);
    setters.setSupplierName(part.supplierName);
  };

  const uniqueDestCodes = [...new Set(destinations.map(d => d.destCode))];

  return (
    <div className="card-body">
      <div className="row">
        {/* Column 1 */}
        <div className="col-md-6">
          {/* Row 1 */}
          <div className="form-group">
            <label className="small mb-1">CPS/PSI/ECI No</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.cpsNo}
              onChange={(e) => setters.setCpsNo(e.target.value)}
              placeholder="CPS/PSI/ECI No"
            />
          </div>
          {/* Row 2 */}
          <div className="form-group">
            <label className="small mb-1">CFC/Model</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.model}
              onChange={(e) => setters.setModel(e.target.value)}
              placeholder="Model"
            />
          </div>
          {/* Row 3 */}
          <div className="form-group">
            <label className="small mb-1">Dest Code</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.destCode}
                onChange={(e) => setters.setDestCode(e.target.value)}
                placeholder="Dest Code"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={onDestinationPicker}>
                  <i className="fas fa-search" />
                </button>
              </div>
              <input
                type="text"
                className="form-control form-control-sm ml-2"
                value={filters.destCountry}
                readOnly
                placeholder="Country Code - Country"
              />
            </div>
          </div>
          {/* Row 4 */}
          <div className="form-group">
            <label className="small mb-1">Part No - Part Name</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.partNo}
                onChange={(e) => setters.setPartNo(e.target.value)}
                placeholder="Part No"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPartPicker(true)}>
                  <i className="fas fa-search" />
                </button>
              </div>
              <input
                type="text"
                className="form-control form-control-sm ml-2"
                value={filters.partName}
                readOnly
                placeholder="Part Name"
              />
            </div>
          </div>
          {/* Row 5 */}
          <div className="form-group">
            <label className="small mb-1">From</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.fromUser}
              onChange={(e) => setters.setFromUser(e.target.value)}
              placeholder="From"
            />
          </div>
        </div>
        {/* Column 2 */}
        <div className="col-md-6">
          {/* Row 1 */}
          <div className="form-group">
            <label className="small mb-1">Ref CPS No</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.refCpsNo}
              onChange={(e) => setters.setRefCpsNo(e.target.value)}
              placeholder="Ref CPS No"
            />
          </div>
          {/* Row 2 */}
          <div className="form-group">
            <label className="small mb-1">Project Code</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.cfcPjt}
              onChange={(e) => setters.setCfcPjt(e.target.value)}
              placeholder="CFC/PJT"
            />
          </div>
          {/* Row 3 */}
          <div className="form-group">
            <label className="small mb-1">CPS/PSI/ECI Type</label>
            <select
              className="form-control form-control-sm"
              value={filters.cpsPsiEci}
              onChange={(e) => setters.setCpsPsiEci(e.target.value)}
            >
              <option value="">Select</option>
              <option value="CPS">CPS</option>
              <option value="PSI">PSI</option>
              <option value="ECI">ECI</option>
            </select>
          </div>
          {/* Row 4 */}
          <div className="form-group">
            <label className="small mb-1">Supplier Code - Supplier Name</label>
            <div className="input-group input-group-sm">
                <input
                    type="text"
                    className="form-control form-control-sm mr-2"
                    value={filters.supplierCode}
                    readOnly
                    placeholder="Supplier Code"
                />
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={filters.supplierName}
                    readOnly
                    placeholder="Supplier Name"
                />
            </div>
          </div>
          {/* Row 5 */}
          <div className="form-group">
            <label className="small mb-1">To</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.toUser}
              onChange={(e) => setters.setToUser(e.target.value)}
              placeholder="To"
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="row mt-2">
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-primary btn-sm mr-2" onClick={onSearch}>
            <i className="fas fa-search mr-1"></i> Search
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClear}>
            <i className="fas fa-times mr-1"></i> Clear
          </button>
        </div>
      </div>

      <PartPickerModal
        show={showPartPicker}
        onClose={() => setShowPartPicker(false)}
        onSelect={handlePartPicked}
        mode="single"
      />
    </div>
  );
};

export default SearchSection;