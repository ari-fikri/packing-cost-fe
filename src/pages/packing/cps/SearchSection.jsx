import React from 'react';

const SearchSection = ({ filters, setters, onSearch, onClear, onPersonPicker, destinations }) => {
  const handleDestCodeChange = (e) => {
    const code = e.target.value;
    setters.setDestCode(code);
    const destination = destinations.find(d => d.destCode === code);
    if (destination) {
      setters.setDestCountry(`${destination.country} - ${destination.company}`);
    } else {
      setters.setDestCountry('');
    }
  };

  // Create a unique list of destination codes for the dropdown
  const uniqueDestCodes = [...new Set(destinations.map(d => d.destCode))];

  return (
    <div className="card-body">
      <div className="row">
        {/* Column 1 */}
        <div className="col-md-6">
          {/* Row 1: CPS No. */}
          <div className="form-group">
            <label className="small mb-1">CPS No.</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.cpsNo}
                onChange={(e) => setters.setCpsNo(e.target.value)}
                placeholder="CPS No."
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search CPS No.">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Row 2: Ref. CPS No. */}
          <div className="form-group">
            <label className="small mb-1">Ref. CPS No.</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.refCpsNo}
                onChange={(e) => setters.setRefCpsNo(e.target.value)}
                placeholder="Ref. CPS No."
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Ref. CPS No.">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Row 3: Dest Code */}
          <div className="form-group">
            <label className="small mb-1">Dest Code</label>
            <select
              className="form-control form-control-sm"
              value={filters.destCode}
              onChange={handleDestCodeChange}
            >
              <option value="">Select Dest Code</option>
              {uniqueDestCodes.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
          {/* Row 4: Model */}
          <div className="form-group">
            <label className="small mb-1">Model</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.model}
                onChange={(e) => setters.setModel(e.target.value)}
                placeholder="Model"
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Model">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Row 5: From User */}
          <div className="form-group">
            <label className="small mb-1">From User</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.fromUser}
                onChange={(e) => setters.setFromUser(e.target.value)}
                placeholder="From User"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => onPersonPicker('fromUser')}>...</button>
              </div>
            </div>
          </div>
          {/* Row 6: Issued Date */}
          <div className="form-group">
            <label className="small mb-1">Issued Date</label>
            <div className="row">
              <div className="col-6">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={filters.issuedFrom}
                  onChange={(e) => setters.setIssuedFrom(e.target.value)}
                />
              </div>
              <div className="col-6">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={filters.issuedTo}
                  onChange={(e) => setters.setIssuedTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="col-md-6">
          {/* Row 1: Status */}
          <div className="form-group">
            <label className="small mb-1">Status</label>
            <select
              className="form-control form-control-sm"
              value={filters.status}
              onChange={(e) => setters.setStatus(e.target.value)}
            >
              <option>Any</option>
              <option>Draft</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
          {/* Row 2: CFC/PJT */}
          <div className="form-group">
            <label className="small mb-1">CFC/PJT</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.cfcPjt}
                onChange={(e) => setters.setCfcPjt(e.target.value)}
                placeholder="CFC/PJT"
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search CFC/PJT">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Row 3: Dest Country Name */}
          <div className="form-group">
            <label className="small mb-1">Dest Country Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={filters.destCountry}
              readOnly
              placeholder="Country - Company"
            />
          </div>
          {/* Row 4: CPS/PSI/ECI */}
          <div className="form-group">
            <label className="small mb-1">CPS/PSI/ECI</label>
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
          {/* Row 5: To User */}
          <div className="form-group">
            <label className="small mb-1">To User</label>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filters.toUser}
                onChange={(e) => setters.setToUser(e.target.value)}
                placeholder="To User"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => onPersonPicker('toUser')}>...</button>
              </div>
            </div>
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
    </div>
  );
};

export default SearchSection;