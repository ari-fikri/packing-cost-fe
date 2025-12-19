// src/components/DestCodePickerModal.jsx
import React, { useState, useEffect } from 'react';
import DESTINATIONS from '../data/destinations';

export default function DestCodePickerModal({ show, onClose, onPick, initialSelected = [] }) {
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState({});
  const [filter, setFilter] = useState({ code: '', country: '' });

  useEffect(() => {
    if (show) {
      setDestinations(DESTINATIONS);
      setFiltered(DESTINATIONS);
      const initialSelection = {};
      initialSelected.forEach(code => {
        initialSelection[code] = true;
      });
      setSelected(initialSelection);
    }
  }, [show, initialSelected]);

  function handleFilter() {
    let result = destinations;
    if (filter.code) {
      result = result.filter(d => d.destCode.toLowerCase().includes(filter.code.toLowerCase()));
    }
    if (filter.country) {
      result = result.filter(d => d.country.toLowerCase().includes(filter.country.toLowerCase()));
    }
    setFiltered(result);
    setPage(1);
  }

  function handleClear() {
    setFilter({ code: '', country: '' });
    setFiltered(destinations);
    setPage(1);
  }

  function handleSelect(destCode) {
    setSelected(prev => ({ ...prev, [destCode]: !prev[destCode] }));
  }

  function handleSelectAll(e) {
    const newSelected = {};
    if (e.target.checked) {
      visibleRows.forEach(d => newSelected[d.destCode] = true);
    }
    setSelected(newSelected);
  }

  function handlePick() {
    const picked = Object.keys(selected).filter(key => selected[key]);
    const pickedData = destinations.filter(d => picked.includes(d.destCode));
    onPick(pickedData);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const visibleRows = filtered.slice((page - 1) * perPage, page * perPage);
  const isAllVisibleSelected = visibleRows.length > 0 && visibleRows.every(d => selected[d.destCode]);

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Destination Code Picker</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Filter Section */}
            <div className="card card-outline card-primary">
              <div className="card-body">
                <div className="row align-items-end">
                  <div className="col-md-5">
                    <div className="form-group">
                      <label>Destination Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={filter.code}
                        onChange={e => setFilter(prev => ({ ...prev, code: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={filter.country}
                        onChange={e => setFilter(prev => ({ ...prev, country: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <button className="btn btn-primary" onClick={handleFilter}>Search</button>
                      <button className="btn btn-secondary ml-2" onClick={handleClear}>Clear</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Section */}
            <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title">Results</h3>
              </div>
              <div className="card-body p-0" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table className="table table-bordered table-hover table-head-fixed">
                  <thead>
                    <tr>
                      <th><input type="checkbox" checked={isAllVisibleSelected} onChange={handleSelectAll} /></th>
                      <th>Destination Code</th>
                      <th>Country</th>
                      <th>Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map(d => (
                      <tr key={d.destCode} onClick={() => handleSelect(d.destCode)} style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                        <td><input type="checkbox" checked={!!selected[d.destCode]} readOnly /></td>
                        <td>{d.destCode}</td>
                        <td>{d.country}</td>
                        <td>{d.company}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <div>
                  <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} className="form-control-sm">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setPage(p => p - 1)}>&laquo;</button>
                    </li>
                    {[...Array(totalPages).keys()].map(p => (
                      <li key={p} className={`page-item ${p + 1 === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPage(p + 1)}>{p + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setPage(p => p + 1)}>&raquo;</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handlePick}>Pick Selected</button>
          </div>
        </div>
      </div>
    </div>
  );
}