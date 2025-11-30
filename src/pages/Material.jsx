import React, { useState, useEffect } from 'react'
import NewMaterialModal from '../components/NewMaterialModal'
import { SearchSection, ResultSection } from '../components/MaterialSections'

export default function Material() {
  const [materialNo, setMaterialNo] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [parentMaterial, setParentMaterial] = useState('')
  const [itemNo, setItemNo] = useState('')
  const [price, setPrice] = useState('')
  const [materialType, setMaterialType] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)

  // NEW: modal mode and selected material for edit
  const [modalMode, setModalMode] = useState('new')
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const [allMaterials, setAllMaterials] = useState([])
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    fetch('/materials.json')
      .then(res => res.json())
      .then(data => {
        setAllMaterials(data);
        setMaterials([]);
      })
  }, []);

  const totalPages = Math.ceil(materials.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedMaterials = materials.slice(startIndex, endIndex)

  function handleFilter() {
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
    
    const noFilters = !materialNo && !materialName && !parentMaterial && !itemNo && !price && !materialType

    if (noFilters) {
      setMaterials([...allMaterials].reverse())
    } else {
      setMaterials(filtered)
    }
    setCurrentPage(1)
    console.log(`Filtered ${filtered.length} materials from ${allMaterials.length} total`)
  }

  function handleClearFilters() {
    setMaterialNo('')
    setMaterialName('')
    setParentMaterial('')
    setItemNo('')
    setPrice('')
    setMaterialType('')
    setMaterials([])
    setCurrentPage(1)
  }

  function handleOpenNew() {
    setSelectedMaterial(null)
    setModalMode('new')
    setShowNewModal(true)
  }

  function handleCloseNew() {
    setShowNewModal(false)
    setSelectedMaterial(null)
    setModalMode('new')
  }

  // Updated to handle both new and edit
  function handleSaveNewMaterial(payload, mode = 'new') {
    if (mode === 'edit' && selectedMaterial) {
      // find by original materialNo (selectedMaterial) and replace
      const origKey = selectedMaterial.materialNo
      const updatedAll = allMaterials.map(m => (m.materialNo === origKey ? { ...m, ...payload } : m))
      const updatedFiltered = materials.map(m => (m.materialNo === origKey ? { ...m, ...payload } : m))
      setAllMaterials(updatedAll)
      setMaterials(updatedFiltered)
    } else {
      // add new at top
      setAllMaterials(prev => [payload, ...prev])
      setMaterials(prev => [payload, ...prev])
    }
    setShowNewModal(false)
    setSelectedMaterial(null)
    setModalMode('new')
  }

  function handleDeleteMaterial(index) {
    if (!confirm('Delete this material?')) return
    
    const actualIndex = (currentPage - 1) * pageSize + index
    const materialToDelete = materials[actualIndex]
    if (!materialToDelete) return

    const newMaterials = materials.filter((_, i) => i !== actualIndex)
    const newAllMaterials = allMaterials.filter(m => m.materialNo !== materialToDelete.materialNo)
    
    setMaterials(newMaterials)
    setAllMaterials(newAllMaterials)
    
    const newTotalPages = Math.ceil(newMaterials.length / pageSize)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  // NEW: open modal in edit mode with selected data
  function handleEditMaterial(material) {
    setSelectedMaterial(material)
    setModalMode('edit')
    setShowNewModal(true)
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

          <ResultSection
            materials={paginatedMaterials}
            allMaterials={allMaterials}
            totalMaterials={materials.length}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onDeleteMaterial={handleDeleteMaterial}
            // NEW: pass edit handler so ResultSection can call it when Edit button clicked
            onEditMaterial={handleEditMaterial}
          />
        </div>

        <NewMaterialModal
          show={showNewModal}
          onClose={handleCloseNew}
          onSave={handleSaveNewMaterial}
          initialData={selectedMaterial}
          mode={modalMode}
        />
      </div>
    </div>
  )
}