import React, { useState } from 'react'
import NewMaterialModal from '../components/NewMaterialModal'
import { SearchSection, ResultSection } from '../components/MaterialSections'
import materialsData from '../data/materials.json'

export default function Material() {
  // Search filters - based on the form fields in the attachment
  const [materialNo, setMaterialNo] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [parentMaterial, setParentMaterial] = useState('')
  const [itemNo, setItemNo] = useState('')
  const [price, setPrice] = useState('')
  const [materialType, setMaterialType] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Table data - separate original data and filtered data
  const [allMaterials, setAllMaterials] = useState(materialsData)
  const [materials, setMaterials] = useState(materialsData)

  // Calculate pagination
  const totalPages = Math.ceil(materials.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedMaterials = materials.slice(startIndex, endIndex)

  function handleFilter() {
    // Filter materials based on search criteria
    let filtered = allMaterials.filter(material => {
      const matchMaterialNo = !materialNo || (material.materialNo && material.materialNo.toLowerCase().includes(materialNo.toLowerCase()))
      const matchMaterialName = !materialName || (material.materialName && material.materialName.toLowerCase().includes(materialName.toLowerCase()))
      const matchParentMaterial = !parentMaterial || (material.parentMaterial && material.parentMaterial.toLowerCase().includes(parentMaterial.toLowerCase()))
      const matchItemNo = !itemNo || (material.itemNo && material.itemNo.toLowerCase().includes(itemNo.toLowerCase()))
      const matchPrice = !price || (material.price && material.price.toString().includes(price))
      const matchMaterialType = !materialType || material.materialType === materialType

      return matchMaterialNo && matchMaterialName && matchParentMaterial && 
             matchItemNo && matchPrice && matchMaterialType
    })
    
    setMaterials(filtered)
    setCurrentPage(1) // Reset to first page when filtering
    console.log(`Filtered ${filtered.length} materials from ${allMaterials.length} total`)
  }

  function handleClearFilters() {
    setMaterialNo('')
    setMaterialName('')
    setParentMaterial('')
    setItemNo('')
    setPrice('')
    setMaterialType('')
    // Reset to show all materials
    setMaterials(allMaterials)
    setCurrentPage(1) // Reset to first page when clearing
  }

  function handleOpenNew() {
    setShowNewModal(true)
  }

  function handleCloseNew() {
    setShowNewModal(false)
  }

  // **Receive new material from modal and add to table**
  function handleSaveNewMaterial(payload) {
    setAllMaterials(prev => [payload, ...prev])
    setMaterials(prev => [payload, ...prev])
    setShowNewModal(false)
  }

  function handleDeleteMaterial(index) {
    if (!confirm('Delete this material?')) return
    
    // Get the actual material from the paginated view
    const actualIndex = (currentPage - 1) * pageSize + index
    const materialToDelete = materials[actualIndex]
    
    // Remove from both filtered and all materials arrays
    const newMaterials = materials.filter((_, i) => i !== actualIndex)
    const newAllMaterials = allMaterials.filter(m => m.materialNo !== materialToDelete.materialNo)
    
    setMaterials(newMaterials)
    setAllMaterials(newAllMaterials)
    
    // Adjust current page if necessary
    const newTotalPages = Math.ceil(newMaterials.length / pageSize)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Material List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenNew}>
              <i className="fas fa-file mr-1" /> Add Material
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={() => alert('Upload placeholder')}>
              <i className="fas fa-cloud-upload-alt" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => alert('Download template placeholder')}>
              <i className="fas fa-cloud-download-alt" /> Template
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Search Section Component */}
          <SearchSection
            materialNo={materialNo}
            setMaterialNo={setMaterialNo}
            materialName={materialName}
            setMaterialName={setMaterialName}
            parentMaterial={parentMaterial}
            setParentMaterial={setParentMaterial}
            itemNo={itemNo}
            setItemNo={setItemNo}
            price={price}
            setPrice={setPrice}
            materialType={materialType}
            setMaterialType={setMaterialType}
            onFilter={handleFilter}
            onClearFilters={handleClearFilters}
          />

          {/* Result Section Component */}
          <ResultSection
            materials={paginatedMaterials}
            allMaterials={allMaterials}
            totalMaterials={materials.length}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onDeleteMaterial={handleDeleteMaterial}
          />
        </div>

        {/* Modal */}
        <NewMaterialModal
          show={showNewModal}
          onClose={handleCloseNew}
          onSave={handleSaveNewMaterial}
        />
      </div>
    </div>
  )
}