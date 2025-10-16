import React from 'react'
import Pagination from '../Pagination'

export default function ResultSection({
  materials,
  allMaterials,
  totalMaterials,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onDeleteMaterial
}) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th style={{ width: 50 }}>No</th>
              <th>Material No</th>
              <th>Material Name</th>
              <th>Parent Material</th>
              <th>Item No</th>
              <th>Price</th>
              <th>Material Type</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted">No Data Found</td>
              </tr>
            ) : (
              materials.map((material, i) => (
                <tr key={material.id || i}>
                  <td>{(currentPage - 1) * pageSize + i + 1}</td>
                  <td>{material.materialNo}</td>
                  <td>{material.materialName}</td>
                  <td>{material.parentMaterial}</td>
                  <td>{material.itemNo}</td>
                  <td>{material.price}</td>
                  <td>{material.materialType}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-primary mr-1" 
                      onClick={() => alert('Edit placeholder')}
                      title="Edit Material"
                    >
                      <i className="fas fa-pencil-alt" />
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => onDeleteMaterial(i)}
                      title="Delete Material"
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalMaterials}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </>
  )
}