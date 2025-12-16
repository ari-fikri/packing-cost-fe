// src/components/DestinationPickerModal.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function DestinationPickerModal({ show, onClose, onAdd, selectionMode = "multi" }) {
  const [destinationsData, setDestinationsData] = useState([]);
  const [filterDestCode, setFilterDestCode] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState(selectionMode === "multi" ? [] : null);
  const [displayedDestinations, setDisplayedDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 15;

  useEffect(() => {
    const dataUrl = `${import.meta.env.BASE_URL}destinations.json`;
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        setDestinationsData(data);
        setDisplayedDestinations(data);
      });
  }, []);

  useEffect(() => {
    if (show) {
      setFilterDestCode("");
      setFilterCode("");
      setFilterCountry("");
      setSelectedDestinations(selectionMode === "multi" ? [] : null);
      setDisplayedDestinations(destinationsData);
      setCurrentPage(1);
    }
  }, [show, selectionMode, destinationsData]);

  const handleSelectionChange = (destCode) => {
    if (selectionMode === "multi") {
      setSelectedDestinations((prev) => (prev.includes(destCode) ? prev.filter((c) => c !== destCode) : [...prev, destCode]));
    } else {
      setSelectedDestinations(destCode);
    }
  };

  const handleSearch = () => {
    const filtered = destinationsData.filter(
      (d) =>
        d.destCode.toLowerCase().includes(filterDestCode.toLowerCase()) &&
        d.code.toLowerCase().includes(filterCode.toLowerCase()) &&
        d.country.toLowerCase().includes(filterCountry.toLowerCase())
    );
    setDisplayedDestinations(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilterDestCode("");
    setFilterCode("");
    setFilterCountry("");
    setDisplayedDestinations(destinationsData);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    if (typeof onAdd === "function") {
      if (selectionMode === "multi") {
        onAdd(selectedDestinations.map((destCode) => destinationsData.find((d) => d.destCode === destCode)));
      } else {
        const selectedDestination = destinationsData.find((d) => d.destCode === selectedDestinations);
        onAdd(selectedDestination);
      }
    }
    setSelectedDestinations(selectionMode === "multi" ? [] : null);
    if (typeof onClose === "function") onClose();
  };

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = displayedDestinations.slice(indexOfFirstDestination, indexOfLastDestination);
  const totalPages = Math.ceil(displayedDestinations.length / destinationsPerPage);

  if (!show) return null;

  const modal = (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="modal-dialog modal-lg" role="document" style={{ zIndex: 2100 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Destination</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            {/* Filters */}
            <div className="d-flex align-items-end mb-3">
              <div style={{ flex: "0 0 20%", paddingRight: "0.5rem" }}>
                <label className="small">Dest Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterDestCode}
                  onChange={(e) => setFilterDestCode(e.target.value)}
                />
              </div>
              <div style={{ flex: "0 0 20%", paddingRight: "0.5rem" }}>
                <label className="small">Dest Country Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterCode}
                  onChange={(e) => setFilterCode(e.target.value)}
                />
              </div>
              <div style={{ flex: "0 0 40%", paddingRight: "0.5rem" }}>
                <label className="small">Country Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                />
              </div>
              <div style={{ flex: "1 1 auto" }} className="text-right">
                <button className="btn btn-sm btn-primary mr-1" onClick={handleSearch} type="button">
                  Filter <i className="fas fa-search" />
                </button>
                <button className="btn btn-sm btn-secondary" onClick={handleClear} type="button">
                  Clear <i className="fas fa-times" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ height: "450px" }}>
              <div className="table-responsive" style={{ height: "100%", overflowY: "auto" }}>
                <table className="table table-striped table-sm mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 30 }}></th>
                      <th>Dest Code</th>
                      <th>Dest Country Code</th>
                      <th>Country Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDestinations.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                          No destinations found
                        </td>
                      </tr>
                    ) : (
                      currentDestinations.map((d) => (
                        <tr key={d.destCode}>
                          <td>
                            <input
                              type={selectionMode === "multi" ? "checkbox" : "radio"}
                              name="destination-selection"
                              checked={selectionMode === "multi" ? selectedDestinations.includes(d.destCode) : selectedDestinations === d.destCode}
                              onChange={() => handleSelectionChange(d.destCode)}
                            />
                          </td>
                          <td>{d.destCode}</td>
                          <td>{d.code}</td>
                          <td>{d.country}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <div>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="btn btn-sm btn-outline-secondary" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <div>
              <button className="btn btn-primary mr-2" onClick={handleAdd} type="button">
                Add <i className="fas fa-check" />
              </button>
              <button className="btn btn-secondary" onClick={onClose} type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, typeof document !== "undefined" ? document.body : null);
}