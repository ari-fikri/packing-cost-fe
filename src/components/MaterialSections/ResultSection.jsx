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
  onDeleteMaterial,
  onEditMaterial
}) {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th style={{ width: 50 }} className="text-center">No</th>
              <th className="text-center">Item No</th>
              <th className="text-center">Material Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">eWH Item No</th>
              <th className="text-center">eWH Price</th>
              <th className="text-center">Material Type</th>
              <th style={{ width: 120 }} className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted text-center">No Data Found</td>
              </tr>
            ) : (
              materials.map((material, i) => (
               <tr key={material.id || i}>
                 <td className="text-center">{(currentPage - 1) * pageSize + i + 1}</td>
                 <td className="text-center">{material.materialNo}</td>
                 <td>{material.materialName}</td>
                 <td className="text-center">{material.price}</td>
                 <td className="text-center">{material.itemNo}</td>
                 <td className="text-center">{material.ewarehouse_price}</td>
                 <td className="text-center">{material.materialType}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-primary mr-1" 
                      onClick={() => onEditMaterial && onEditMaterial(material)}
                      title="Edit Material"
                    >
                      <i className="fas fa-pencil-alt" />
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => onDeleteMaterial && onDeleteMaterial(i)}
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