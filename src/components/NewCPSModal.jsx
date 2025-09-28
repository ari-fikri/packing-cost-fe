// src/components/NewCpsModal.jsx
import React, { useEffect, useState } from 'react'
import MultiPartsComparisonModal from './MultiPartsComparisonModal'
import PartPickerModal from './PartPickerModal';
import './modalOverrides.css'
import { partsDummy, currentDummy as currentCpsRecord } from '../data/comparison'

// Import sections from external folder
import {
  GeneralInfoSection,
  PseInfoSection,
  ImagesSection,
  PackingSection,
  LogisticSection
} from './NewCPSModalSections'

export default function NewCpsModal({ show = false, onClose = () => {}, onSave = () => {}, onSubmit = () => {} }) {
  // Top-level fields (all empty by default)
  const [cpsNo, setCpsNo] = useState('')
  const [refCpsNo, setRefCpsNo] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
  const [dpiNo, setDpiNo] = useState('')
  const [cfcPjtCode, setCfcPjtCode] = useState('')
  const [model, setModel] = useState('')
  const [partNo, setPartNo] = useState('')

  // second block
  const [partName, setPartName] = useState('')
  const [supplier, setSupplier] = useState('')
  const [plantCode, setPlantCode] = useState('')
  const [dockCode, setDockCode] = useState('')

  // PSE Info collapse state & fields (kept simple, all empty)
  const [pseOpen, setPseOpen] = useState(false)
  const [packingPlantCurr, setPackingPlantCurr] = useState('')
  const [packingPlantNext, setPackingPlantNext] = useState('')
  const [vanningPlantCurr, setVanningPlantCurr] = useState('')
  const [vanningPlantNext, setVanningPlantNext] = useState('')
  const [orderPatternCurr, setOrderPatternCurr] = useState('')
  const [orderPatternNext, setOrderPatternNext] = useState('')
  const [category, setCategory] = useState('')
  const [katashiki, setKatashiki] = useState({ AD: '', AU: '', AF: '', AX: '' })
  const [importerLineProcess, setImporterLineProcess] = useState('')
  const [caseCode, setCaseCode] = useState('')
  const [boxNumber, setBoxNumber] = useState('')
  const [renban, setRenban] = useState('')
  const [renbanEff, setRenbanEff] = useState('')
  const [packingProcessBoxing, setPackingProcessBoxing] = useState('')
  const [packingProcessStacking, setPackingProcessStacking] = useState('')

  // images groups (arrays of objects with caption + optional url)
  const [imagesPart, setImagesPart] = useState([])
  const [imagesPacking, setImagesPacking] = useState([])
  const [imagesOuter, setImagesOuter] = useState([])
  const [imagesQkp, setImagesQkp] = useState([])
  const [imagesBkp, setImagesBkp] = useState([])

  // Packing - Outer summary
  const [outerModuleType, setOuterModuleType] = useState('')
  const [outerDimension, setOuterDimension] = useState({ L: '', W: '', H: '' }) // cm
  const [innerVolume, setInnerVolume] = useState('')
  const [outerVolume, setOuterVolume] = useState('')

  // Inner pack materials table (static/simpler table as requested)
  const [innerRows, setInnerRows] = useState([])

  // Notes
  const [notes, setNotes] = useState('')

  // Small UI state for adding inner row
  const [newInner, setNewInner] = useState({
    materialNo: '',
    suffix: '',
    name: '',
    parent: '',
    supplierId: '',
    supplierName: '',
    L: '',
    W: '',
    H: '',
    wtPerPc: '',
    qty: '',
  })

  // Add state for collapsible images section
  const [imagesOpen, setImagesOpen] = useState(true)

  // Add state for collapsible packing section
  const [packingOpen, setPackingOpen] = useState(true)

  // NEW: control for comparison modal
  const [isComparisonOpen, setComparisonOpen] = useState(false)

  // NEW: control for part picker modal
  const [isPartPickerOpen, setPartPickerOpen] = useState(false);

  // NEW: Logistic Info collapse state & fields
  const [logisticOpen, setLogisticOpen] = useState(true);
  const [tmmindDestDockCode, setTmmindDestDockCode] = useState('');
  const [logisticRemark, setLogisticRemark] = useState('');
  const [processType, setProcessType] = useState('N');
  const [addressRack, setAddressRack] = useState('');

  // Reset all fields when modal opens
  useEffect(() => {
    if (show) {
      setCpsNo('')
      setRefCpsNo('')
      setIssueDate('')
      setEffectiveDate('')
      setDpiNo('')
      setCfcPjtCode('')
      setModel('')
      setPartNo('')
      setPartName('')
      setSupplier('')
      setPlantCode('')
      setDockCode('')

      setPseOpen(false)
      setPackingPlantCurr(''); setPackingPlantNext('')
      setVanningPlantCurr(''); setVanningPlantNext('')
      setOrderPatternCurr(''); setOrderPatternNext('')
      setCategory(''); setKatashiki({ AD: '', AU: '', AF: '', AX: '' })
      setImporterLineProcess(''); setCaseCode(''); setBoxNumber(''); setRenban(''); setRenbanEff('')
      setPackingProcessBoxing(''); setPackingProcessStacking('')

      setImagesPart([]); setImagesPacking([]); setImagesOuter([]); setImagesQkp([]); setImagesBkp([])

      setOuterModuleType(''); setOuterDimension({ L: '', W: '', H: '' })
      setInnerVolume(''); setOuterVolume('')
      setInnerRows([])
      setNotes('')
      setNewInner({
        materialNo: '',
        suffix: '',
        name: '',
        parent: '',
        supplierId: '',
        supplierName: '',
        L: '',
        W: '',
        H: '',
        wtPerPc: '',
        qty: '',
      })

      setLogisticOpen(true);
      setTmmindDestDockCode('');
      setLogisticRemark('');
      setProcessType('N');
      setAddressRack('');
    }
  }, [show])

  function handleAddInnerRow() {
    if (!newInner.materialNo.trim()) {
      alert('Enter Pack Material No')
      return
    }
    setInnerRows(prev => [...prev, { ...newInner }])
    setNewInner({
      materialNo: '',
      suffix: '',
      name: '',
      parent: '',
      supplierId: '',
      supplierName: '',
      L: '',
      W: '',
      H: '',
      wtPerPc: '',
      qty: '',
    })
  }

  function handleRemoveInnerRow(i) {
    setInnerRows(prev => prev.filter((_, idx) => idx !== i))
  }

  function buildPayload() {
    return {
      cpsNo,
      refCpsNo,
      issueDate,
      effectiveDate,
      dpiNo,
      cfcPjtCode,
      model,
      partNo,
      partName,
      supplier,
      plantCode,
      dockCode,
      pseInfo: {
        packingPlantCurr, packingPlantNext, vanningPlantCurr, vanningPlantNext,
        orderPatternCurr, orderPatternNext, category, katashiki, importerLineProcess,
        caseCode, boxNumber, renban, renbanEff, packingProcessBoxing, packingProcessStacking
      },
      images: {
        part: imagesPart, packing: imagesPacking, outer: imagesOuter, qkp: imagesQkp, bkp: imagesBkp
      },
      packing: {
        outerModuleType, outerDimension, innerVolume, outerVolume,
        innerRows
      },
      notes,
    }
  }

  function handlePartPicked(selectedParts) {
    if (selectedParts && selectedParts.length > 0) {
      const part = selectedParts[0];
      setPartNo(part.partNo || '');
      setPartName(part.partName || '');
      setSupplier(part.supplierName || '');
    }
    setPartPickerOpen(false);
  }

  if (!show) return null

  return (
    <>
      {/* CPS modal backdrop */}
      <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <div className="np-modal card card-outline card-primary" style={{ maxWidth: 1100 }}>
          <div className="card-header d-flex align-items-center">
            <h3 className="card-title mb-0"><b>CPS - New</b></h3>
            <div className="card-tools ml-auto">
              <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
          </div>
          
          <div className="card-body">
            {/* General Info */}
            <GeneralInfoSection
              cpsNo={cpsNo} setCpsNo={setCpsNo}
              refCpsNo={refCpsNo} setRefCpsNo={setRefCpsNo}
              issueDate={issueDate} setIssueDate={setIssueDate}
              effectiveDate={effectiveDate} setEffectiveDate={setEffectiveDate}
              dpiNo={dpiNo} setDpiNo={setDpiNo}
              cfcPjtCode={cfcPjtCode} setCfcPjtCode={setCfcPjtCode}
              model={model} setModel={setModel}
              partNo={partNo} setPartNo={setPartNo}
              partName={partName} setPartName={setPartName}
              supplier={supplier} setSupplier={setSupplier}
              plantCode={plantCode} setPlantCode={setPlantCode}
              dockCode={dockCode} setDockCode={setDockCode}
              setPartPickerOpen={setPartPickerOpen}
              setComparisonOpen={setComparisonOpen}
            />

            <hr />

            {/* PSE Info Section */}
            <PseInfoSection
              pseOpen={pseOpen} setPseOpen={setPseOpen}
              packingPlantCurr={packingPlantCurr} setPackingPlantCurr={setPackingPlantCurr}
              packingPlantNext={packingPlantNext} setPackingPlantNext={setPackingPlantNext}
              vanningPlantCurr={vanningPlantCurr} setVanningPlantCurr={setVanningPlantCurr}
              vanningPlantNext={vanningPlantNext} setVanningPlantNext={setVanningPlantNext}
              orderPatternCurr={orderPatternCurr} setOrderPatternCurr={setOrderPatternCurr}
              orderPatternNext={orderPatternNext} setOrderPatternNext={setOrderPatternNext}
              category={category} setCategory={setCategory}
              katashiki={katashiki} setKatashiki={setKatashiki}
              importerLineProcess={importerLineProcess} setImporterLineProcess={setImporterLineProcess}
              caseCode={caseCode} setCaseCode={setCaseCode}
              boxNumber={boxNumber} setBoxNumber={setBoxNumber}
              renban={renban} setRenban={setRenban}
              renbanEff={renbanEff} setRenbanEff={setRenbanEff}
              packingProcessBoxing={packingProcessBoxing} setPackingProcessBoxing={setPackingProcessBoxing}
              packingProcessStacking={packingProcessStacking} setPackingProcessStacking={setPackingProcessStacking}
            />

            <hr />

            {/* Images Section */}
            <ImagesSection
              imagesOpen={imagesOpen} setImagesOpen={setImagesOpen}
              imagesPart={imagesPart} setImagesPart={setImagesPart}
              imagesPacking={imagesPacking} setImagesPacking={setImagesPacking}
              imagesOuter={imagesOuter} setImagesOuter={setImagesOuter}
              imagesQkp={imagesQkp} setImagesQkp={setImagesQkp}
              imagesBkp={imagesBkp} setImagesBkp={setImagesBkp}
            />

            <hr />

            {/* Packing Section */}
            <PackingSection
              packingOpen={packingOpen} setPackingOpen={setPackingOpen}
              outerModuleType={outerModuleType} setOuterModuleType={setOuterModuleType}
              outerDimension={outerDimension} setOuterDimension={setOuterDimension}
              innerVolume={innerVolume} setInnerVolume={setInnerVolume}
              outerVolume={outerVolume} setOuterVolume={setOuterVolume}
              innerRows={innerRows} setInnerRows={setInnerRows}
              newInner={newInner} setNewInner={setNewInner}
              handleAddInnerRow={handleAddInnerRow}
              handleRemoveInnerRow={handleRemoveInnerRow}
            />

            <hr />

            {/* Logistic Info Section */}
            <LogisticSection
              logisticOpen={logisticOpen}
              setLogisticOpen={setLogisticOpen}
              tmmindDestDockCode={tmmindDestDockCode}
              setTmmindDestDockCode={setTmmindDestDockCode}
              logisticRemark={logisticRemark}
              setLogisticRemark={setLogisticRemark}
              processType={processType}
              setProcessType={setProcessType}
              addressRack={addressRack}
              setAddressRack={setAddressRack}
            />

            {/* Notes */}
            <div className="form-group">
              <label className="small mb-1">Note</label>
              <textarea className="form-control form-control-sm" rows="3" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </div>

          <div className="card-footer text-right">
            <button className="btn btn-primary mr-2" onClick={() => { onSave(buildPayload()); onClose() }}><i className="fas fa-save mr-1" /> Save</button>
            <button className="btn btn-success mr-2" onClick={() => { onSubmit(buildPayload()); onClose() }}><i className="fas fa-upload mr-1" /> Submit</button>
            <button className="btn btn-outline-secondary" onClick={onClose}><i className="fas fa-times mr-1" /> Cancel</button>
          </div>
        </div>

        <style>{`
          .np-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 2000; display:flex; align-items:center; justify-content:center; padding:1rem; }
          .np-modal { width: 100%; max-height: 95vh; overflow: auto; z-index: 2001; }
          .table-sm td, .table-sm th { vertical-align: middle; }
        `}</style>
      </div>

      {/* Comparison Modal - rendered as a sibling (so z-index overrides in modalOverrides.css can take effect) */}
      <MultiPartsComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setComparisonOpen(false)}
        parts={partsDummy}
        current={currentCpsRecord}
        extraClass="multi-parts-comparison"
      />

      {/* Part Picker Modal - wrapped to control z-index */}      
        <PartPickerModal
          show={isPartPickerOpen}
          onClose={() => setPartPickerOpen(false)}
          onSelect={handlePartPicked}
          zIndex={4000}
        />

    </>
  )
}