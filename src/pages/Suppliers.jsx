import React, { useState, useEffect } from 'react';
import { suppliers as suppliersData } from '../data/suppliers';
import NewSupplierModal from '../components/NewSupplierModal';
import ConfirmationDialog from '../components/ConfirmationDialog';
import Pagination from '../components/Pagination';
import { handleInputChange } from '../utils/globalFunctions';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  // Filter state
  const [filterCode, setFilterCode] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterAddress, setFilterAddress] = useState('');

  // Modal state
  const [showNewSupplierModal, setShowNewSupplierModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const suppliersWithId = suppliersData.map((s, i) => ({ ...s, id: i }));
    setSuppliers(suppliersWithId);
    setFilteredSuppliers([]);
  }, []);

  function handleFilter() {
    let filtered = suppliers.filter(s => 
      (!filterCode || s.code.toLowerCase().includes(filterCode.toLowerCase())) &&
      (!filterName || s.name.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterAddress || s.address.toLowerCase().includes(filterAddress.toLowerCase()))
    );
    setFilteredSuppliers(filtered);
    setCurrentPage(1);
  }

  function handleClear() {
    setFilterCode('');
    setFilterName('');
    setFilterAddress('');
    setFilteredSuppliers([]);
    setCurrentPage(1);
  }

  function handleAdd() {
    setEditingSupplier(null);
    setShowNewSupplierModal(true);
  }

  function handleEdit(supplier) {
    setEditingSupplier(supplier);
    setShowNewSupplierModal(true);
  }

  function handleSave(supplierData) {
    if (editingSupplier) {
      // Update
      const updatedSuppliers = suppliers.map(s =>
        s.id === editingSupplier.id ? { ...editingSupplier, ...supplierData } : s
      );
      setSuppliers(updatedSuppliers);
      setFilteredSuppliers(updatedSuppliers);
    } else {
      // Add
      const newSupplier = { ...supplierData, id: suppliers.length };
      const updatedSuppliers = [newSupplier, ...suppliers];
      setSuppliers(updatedSuppliers);
      setFilteredSuppliers(updatedSuppliers);
    }
    setShowNewSupplierModal(false);
    setEditingSupplier(null);
  }

  function handleDelete(supplier) {
    setSupplierToDelete(supplier);
    setShowConfirmDialog(true);
  }

  function confirmDelete() {
    if (supplierToDelete) {
      const updatedSuppliers = suppliers.filter(s => s.id !== supplierToDelete.id);
      setSuppliers(updatedSuppliers);
      setFilteredSuppliers(updatedSuppliers);
      setSupplierToDelete(null);
    }
    setShowConfirmDialog(false);
  }

  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Supplier List</b></h3>
          <div className="card-tools ml-auto">
            <button className="btn btn-sm btn-success mr-2" onClick={handleAdd}>
              <i className="fas fa-plus mr-1" /> Add Supplier
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={() => alert('Upload placeholder')} title="Upload">
              <i className="fas fa-cloud-upload-alt" />
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => alert('Template placeholder')} title="Template">
              <i className="fas fa-cloud-download-alt" />
            </button>
          </div>
        </div>
        <div className="card-body">
          {/* Filter Section */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Supplier Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterCode}
                  onChange={e => setFilterCode(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFilter(); } }}
                  placeholder="Supplier Code"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Supplier Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterName}
                  onChange={e => setFilterName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFilter(); } }}
                  placeholder="Supplier Name"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="small mb-1">Address</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterAddress}
                  onChange={e => setFilterAddress(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFilter(); } }}
                  placeholder="Address"
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 text-right">
              <button className="btn btn-sm btn-primary mr-2" onClick={handleFilter}>
                <i className="fas fa-search mr-1" /> Search
              </button>
              <button className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
                <i className="fas fa-times mr-1" /> Clear
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>No</th>
                  <th>Supplier Code</th>
                  <th>Supplier Name</th>
                  <th>Address</th>
                  <th style={{ width: 110 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.length > 0 ? (
                  paginatedSuppliers.map((s, i) => (
                    <tr key={s.id}>
                      <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                      <td>{s.code}</td>
                      <td>{s.name}</td>
                      <td>{s.address}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEdit(s)}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredSuppliers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>

      <NewSupplierModal
        show={showNewSupplierModal}
        onClose={() => setShowNewSupplierModal(false)}
        onSave={handleSave}
        initialData={editingSupplier}
      />

      <ConfirmationDialog
        show={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmDelete}
        title="Deletion Confirmation"
        message="Do you want to delete this data?"
      />
    </div>
  );
}