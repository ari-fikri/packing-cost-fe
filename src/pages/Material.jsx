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

  // Table data - separate original data and filtered data
  const [allMaterials, setAllMaterials] = useState(materialsData)
  const [materials, setMaterials] = useState(materialsData)

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
    const materialToDelete = materials[index]
    
    // Remove from both filtered and all materials arrays
    setMaterials(prev => prev.filter((_, i) => i !== index))
    setAllMaterials(prev => prev.filter(m => m.materialNo !== materialToDelete.materialNo))
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
            materials={materials}
            allMaterials={allMaterials}
            onDeleteMaterial={handleDeleteMaterial}
          />
        </div>

        <div className="card-footer text-right">
          <button type="button" className="btn btn-primary mr-2" onClick={() => alert('Save placeholder')}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => alert('Cancel placeholder')}>Cancel</button>
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