// src/components/NewCpsModal.jsx
import React, { useEffect, useState } from 'react'
import MultiPartsComparisonModal from './MultiPartsComparisonModal'
import PartPickerModal from './PartPickerModal';
import ModelPickerModal from './ModelPickerModal';
import MaterialPickerModal from './MaterialPickerModal';
import './modalOverrides.css'
import { formatCurrency, handleInputChange } from '../utils/globalFunctions';
import './NewCPSModalSections/NewCPSModalSections.css';


// Import sections from external folder
import {
  GeneralInfoSection,
  PseInfoSection,
  ImagesSection,
  PackingSection,
  LogisticSection
} from './NewCPSModalSections'

import { buildPayload, resetStates } from '../utils/cpsHelpers.js';

export default function NewCPSModal({ show, onClose, onSave, editData, config }) {
  const [activeTab, setActiveTab] = useState('general');
  const [comparisonData, setComparisonData] = useState({ current: {}, comparisons: [] });
  const [materials, setMaterials] = useState([]);
  const [modelsData, setModelsData] = useState([]);

  // General states
  const [cpsNo, setCpsNo] = useState('')
  const [refCpsNo, setRefCpsNo] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [effectiveDate, setEffectiveDate] = useState('')
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
  const [katashiki, setKatashiki] = useState([])
  const [importerLineProcess, setImporterLineProcess] = useState('')
  const [caseCode, setCaseCode] = useState('')
  const [boxNumber, setBoxNumber] = useState('')
  const [renban, setRenban] = useState('')
  const [renbanEff, setRenbanEff] = useState('')
  const [packingProcessBoxing, setPackingProcessBoxing] = useState('')
  const [packingProcessStacking, setPackingProcessStacking] = useState('')

  // PSE Outer Pack Material
  const [pseOuterRows, setPseOuterRows] = useState([]);
  const [newPseOuter, setNewPseOuter] = useState({
    materialNo: '',
    suffix: '',
    name: '',
    supplier: '',
    L: '',
    W: '',
    H: '',
    wtPerPc: '',
    qty: '',
    totalWt: ''
  });

  // images groups (caption and array of files)
  const [imagesPart, setImagesPart] = useState({ caption: "", files: [] });
  const [imagesPacking, setImagesPacking] = useState({ caption: "", files: [] });
  const [imagesOuter, setImagesOuter] = useState({ caption: "", files: [] });
  const [imagesQkp, setImagesQkp] = useState({ caption: "", files: [] });
  const [imagesBkp, setImagesBkp] = useState({ caption: "", files: [] });

  // Packing - Outer summary
  const [innerVolume, setInnerVolume] = useState('')

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

  // NEW: control for model picker modal
  const [isModelPickerOpen, setModelPickerOpen] = useState(false);

  // NEW: control for material picker modal
  const [isMaterialPickerOpen, setMaterialPickerOpen] = useState(false);
  const [materialFilter, setMaterialFilter] = useState("all");
  const [materialPickerTarget, setMaterialPickerTarget] = useState(null);

  // NEW: Logistic Info collapse state & fields
  const [logisticOpen, setLogisticOpen] = useState(true);
  const [tmmindDestDockCode, setTmmindDestDockCode] = useState('');
  const [logisticRemark, setLogisticRemark] = useState('');
  const [processType, setProcessType] = useState('N');
  const [addressRack, setAddressRack] = useState('');

  useEffect(() => {
    const dataUrl = `${import.meta.env.BASE_URL}cpsComparison.json`;
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => setComparisonData(data));

    fetch('/materials.json')
      .then(res => res.json())
      .then(data => setMaterials(data));

    fetch('/models.json')
      .then(res => res.json())
      .then(data => setModelsData(data));
  }, []);

  // Auto-fill CPS No for new CPS
  useEffect(() => {
    if (!editData && model && partNo) {
      setCpsNo(`${model}-${partNo}`);
    }
  }, [editData, model, partNo]);

  // Transform comparison data from cpsComparison.json
  const currentCpsRecord = comparisonData.current;
  const partsDummy = comparisonData.comparisons;


  // Reset all fields when modal opens
  useEffect(() => {
    if (show) {
      if (editData) {
        // Populate fields from editData
        setCpsNo(editData.cpsNo || '');
        setRefCpsNo(editData.refCpsNo || '');
        setIssueDate(editData.issueDate || '');
        setEffectiveDate(editData.effectiveDate || '');
        setCfcPjtCode(editData.cfcPjtCode || '');
        setModel(editData.model || '');
        setPartNo(editData.partNo || '');
        setPartName(editData.partName || '');
        setSupplier(editData.supplier || '');
        setPlantCode(editData.plantCode || '');
        setDockCode(editData.dockCode || '');

        if (editData.pseInfo) {
          setPackingPlantCurr(editData.pseInfo.packingPlantCurr || '');
          setPackingPlantNext(editData.pseInfo.packingPlantNext || '');
          setVanningPlantCurr(editData.pseInfo.vanningPlantCurr || '');
          setVanningPlantNext(editData.pseInfo.vanningPlantNext || '');
          setOrderPatternCurr(editData.pseInfo.orderPatternCurr || '');
          setOrderPatternNext(editData.pseInfo.orderPatternNext || '');
          setCategory(editData.pseInfo.category || '');
          setKatashiki(editData.pseInfo.katashiki || []);
          setImporterLineProcess(editData.pseInfo.importerLineProcess || '');
          setCaseCode(editData.pseInfo.caseCode || '');
          setBoxNumber(editData.pseInfo.boxNumber || '');
          setRenban(editData.pseInfo.renban || '');
          setRenbanEff(editData.pseInfo.renbanEff || '');
          setPackingProcessBoxing(editData.pseInfo.packingProcessBoxing || '');
          setPackingProcessStacking(editData.pseInfo.packingProcessStacking || '');
          setPseOuterRows(editData.pseInfo.outerRows || []);
        }

        if (editData.images) {
          setImagesPart(editData.images.part || { caption: "", files: [] });
          setImagesPacking(editData.images.packing || { caption: "", files: [] });
          setImagesOuter(editData.images.outer || { caption: "", files: [] });
          setImagesQkp(editData.images.qkp || { caption: "", files: [] });
          setImagesBkp(editData.images.bkp || { caption: "", files: [] });
        }

        if (editData.packing) {
          setInnerVolume(editData.packing.innerVolume || '');
          setInnerRows(editData.packing.innerRows || []);
        }

        setNotes(editData.notes || '');

        if (editData.logistic) {
          setTmmindDestDockCode(editData.logistic.tmmindDestDockCode || '');
          setLogisticRemark(editData.logistic.logisticRemark || '');
          setProcessType(editData.logistic.processType || 'N');
          setAddressRack(editData.logistic.addressRack || '');
        }
      } else {
        // Reset all fields for a new entry
        setCpsNo('');
        setRefCpsNo('');
        setIssueDate('');
        setEffectiveDate('');
        setCfcPjtCode('');
        setModel('');
        setPartNo('');
        setPartName('');
        setSupplier('');
        setPlantCode('');
        setDockCode('');

        setPseOpen(false);
        setPackingPlantCurr(''); setPackingPlantNext('');
        setVanningPlantCurr(''); setVanningPlantNext('');
        setOrderPatternCurr(''); setOrderPatternNext('');
        setCategory(''); setKatashiki([]);
        setImporterLineProcess(''); setCaseCode(''); setBoxNumber(''); setRenban(''); setRenbanEff('');
        setPackingProcessBoxing(''); setPackingProcessStacking('');
        setPseOuterRows([]);

        // Images
        setImagesPart({ caption: "", files: [] });
        setImagesPacking({ caption: "", files: [] });
        setImagesOuter({ caption: "", files: [] });
        setImagesQkp({ caption: "", files: [] });
        setImagesBkp({ caption: "", files: [] });

        // Packing
        setInnerVolume('');
        setInnerRows([]);

        // Notes
        setNotes('');
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
        });

        setLogisticOpen(true);
        setTmmindDestDockCode('');
        setLogisticRemark('');
        setProcessType('N');
        setAddressRack('');
      }
    }
  }, [show, editData]);

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
    setInnerRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handlePartPicked(part) {
    if (part) {
      setPartNo(part.partNo);
      setPartName(part.partName);
      setSupplier(part.supplierName);
    }
    setPartPickerOpen(false);
  }

  const handleSave = () => {
    const payload = buildPayload({
      // General
      cpsNo,
      refCpsNo,
      issueDate,
      effectiveDate,
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
        caseCode, boxNumber, renban, renbanEff, packingProcessBoxing, packingProcessStacking,
        outerRows: pseOuterRows,
      },
      images: {
        part: imagesPart, packing: imagesPacking, outer: imagesOuter, qkp: imagesQkp, bkp: imagesBkp
      },
      packing: {
        innerVolume,
        innerRows
      },
      notes,
      logistic: {
        tmmindDestDockCode,
        logisticRemark,
        processType,
        addressRack,
      },
    });
    onSave(payload);
    handleClose();
  };

  const handleClose = () => {
    resetStates({
      setCpsNo, setRefCpsNo, setIssueDate, setEffectiveDate, setCfcPjtCode, setModel, setPartNo,
      setPartName, setSupplier, setPlantCode, setDockCode,
      setPseOpen, setPackingPlantCurr, setPackingPlantNext, setVanningPlantCurr, setVanningPlantNext,
      setOrderPatternCurr, setOrderPatternNext, setCategory, setKatashiki, setImporterLineProcess,
      setCaseCode, setBoxNumber, setRenban, setRenbanEff, setPackingProcessBoxing, setPackingProcessStacking,
      setPseOuterRows, setNewPseOuter,
      setImagesPart, setImagesPacking, setImagesOuter, setImagesQkp, setImagesBkp,
      setInnerVolume,
      setInnerRows, setNotes, setNewInner,
      setLogisticOpen, setTmmindDestDockCode, setLogisticRemark, setProcessType, setAddressRack
    });
    onClose();
  };

  function handleModelPicked(selection) {
    if (selection) {
      if (Array.isArray(selection)) {
        // Multi-select mode
        setModel(selection.map((m) => m.model_code).join(", "));
      } else {
        // Single-select mode
        setModel(selection.model_code || "");
        // Populate katashiki and cfc from selected model
        const selectedModel = modelsData.find(m => m.model_code === selection.model_code);
        if (selectedModel) {
          setKatashiki(selectedModel.katashiki || []);
          setCfcPjtCode(selectedModel.model_cfc || '');
        }
      }
    }
    setModelPickerOpen(false);
  }

  function handleMaterialPicked(material) {
    if (material) {
      const targetIndex = materialPickerTarget;
      const filterLower = materialFilter.toLowerCase();
      if (filterLower === 'outer' || filterLower === 'module' || filterLower === 'outer-material') {
        const isPackingOuter = filterLower === 'outer-material';
        const newRowData = {
          materialNo: material.materialNo,
          name: material.materialName,
          [isPackingOuter ? 'supplierName' : 'supplier']: material.supplierName,
          L: material.dimension_length,
          W: material.dimension_width,
          H: material.dimension_height,
          wtPerPc: material.unitWeight,
        };
        if (targetIndex === 'new') {
          if (isPackingOuter) {
            setNewOuter(n => ({ ...n, ...newRowData }));
          } else {
            setNewPseOuter(n => ({ ...n, ...newRowData }));
          }
        } else if (targetIndex === null) {
          setNewOuter(n => ({ ...n, ...newRowData }));
        } else {
          if (isPackingOuter) {
            const updatedRows = [...outerRows];
            updatedRows[targetIndex] = { ...updatedRows[targetIndex], ...newRowData };
            setOuterRows(updatedRows);
          } else {
            const updatedRows = [...pseOuterRows];
            updatedRows[targetIndex] = { ...updatedRows[targetIndex], ...newRowData };
            setPseOuterRows(updatedRows);
          }
        }
      } else if (filterLower === 'inner' || filterLower === 'box') {
        const newRowData = {
          materialNo: material.materialNo,
          name: material.materialName,
          supplierName: material.supplierName,
          L: material.dimension_inner_length,
          W: material.dimension_inner_width,
          H: material.dimension_inner_height,
          wtPerPc: material.unitWeight,
        };
        if (targetIndex === 'new' || targetIndex === null) {
          setNewInner(n => ({ ...n, ...newRowData }));
        } else {
          const updatedRows = [...innerRows];
          updatedRows[targetIndex] = { ...updatedRows[targetIndex], ...newRowData };
          setInnerRows(updatedRows);
        }
      }
    }
    setMaterialPickerOpen(false);
  }

  const openModelPicker = () => setModelPickerOpen(true);

  const openMaterialPicker = (filter, index = null) => {
    setMaterialFilter(filter);
   setMaterialPickerTarget(index);
    setMaterialPickerOpen(true);
  };

  if (!show) return null;

  return (
    <>
      {/* CPS modal backdrop */}
      <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
        <div className="np-modal card card-outline card-primary" style={{ maxWidth: 1200 }}>
          <div className="card-header d-flex align-items-center">
            <h3 className="card-title mb-0"><b>{editData ? 'CPS - Edit' : 'CPS - New'}</b></h3>
            <div className="card-tools ml-auto">
              <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
          </div>
          
          <div className="card-body">
            {/* General Info */}
            {config.general.visible && (
              <>
                <GeneralInfoSection
                  config={config.general}
                  cpsNo={cpsNo}
                  setCpsNo={handleInputChange(setCpsNo)}
                  refCpsNo={refCpsNo}
                  setRefCpsNo={handleInputChange(setRefCpsNo)}
                  cfcPjtCode={cfcPjtCode}
                  setCfcPjtCode={handleInputChange(setCfcPjtCode)}
                  model={model}
                  setModel={handleInputChange(setModel)}
                  partNo={partNo} setPartNo={handleInputChange(setPartNo)}
                  partName={partName} setPartName={handleInputChange(setPartName)}
                  supplier={supplier} setSupplier={handleInputChange(setSupplier)}
                  plantCode={plantCode} setPlantCode={handleInputChange(setPlantCode)}
                  dockCode={dockCode} setDockCode={handleInputChange(setDockCode)}
                  openPartPicker={() => setPartPickerOpen(true)}
                  openModelPicker={openModelPicker}
                  setComparisonOpen={setComparisonOpen}
                />
                {config.pse.visible && <hr />}
              </>
            )}

            {/* PSE Info Section */}
            {config.pse.visible && (
              <>
                <PseInfoSection
                  config={config.pse}
                  pseOpen={pseOpen} setPseOpen={setPseOpen}
                  packingPlantCurr={packingPlantCurr} setPackingPlantCurr={handleInputChange(setPackingPlantCurr)}
                  packingPlantNext={packingPlantNext} setPackingPlantNext={handleInputChange(setPackingPlantNext)}
                  vanningPlantCurr={vanningPlantCurr} setVanningPlantCurr={handleInputChange(setVanningPlantCurr)}
                  vanningPlantNext={vanningPlantNext} setVanningPlantNext={handleInputChange(setVanningPlantNext)}
                  orderPatternCurr={orderPatternCurr} setOrderPatternCurr={handleInputChange(setOrderPatternCurr)}
                  orderPatternNext={orderPatternNext} setOrderPatternNext={handleInputChange(setOrderPatternNext)}
                  category={category} setCategory={handleInputChange(setCategory)}
                  katashiki={katashiki} setKatashiki={setKatashiki}
                  importerLineProcess={importerLineProcess} setImporterLineProcess={handleInputChange(setImporterLineProcess)}
                  caseCode={caseCode} setCaseCode={handleInputChange(setCaseCode)}
                  boxNumber={boxNumber} setBoxNumber={handleInputChange(setBoxNumber)}
                  renban={renban} setRenban={handleInputChange(setRenban)}
                  renbanEff={renbanEff} setRenbanEff={handleInputChange(setRenbanEff)}
                  packingProcessBoxing={packingProcessBoxing} setPackingProcessBoxing={handleInputChange(setPackingProcessBoxing)}
                  packingProcessStacking={packingProcessStacking} setPackingProcessStacking={handleInputChange(setPackingProcessStacking)}
                  pseOuterRows={pseOuterRows}
                  setPseOuterRows={setPseOuterRows}
                  newPseOuter={newPseOuter}
                  setNewPseOuter={setNewPseOuter}
                  openMaterialPicker={openMaterialPicker}
                />
                {config.images.visible && <hr />}
              </>
            )}

            {/* Images Section */}
            {config.images.visible && (
              <>
                <ImagesSection
                  config={config.images}
                  imagesOpen={imagesOpen} setImagesOpen={setImagesOpen}
                  imagesPart={imagesPart} setImagesPart={setImagesPart}
                  imagesPacking={imagesPacking} setImagesPacking={setImagesPacking}
                  imagesOuter={imagesOuter} setImagesOuter={setImagesOuter}
                  imagesQkp={imagesQkp} setImagesQkp={setImagesQkp}
                  imagesBkp={imagesBkp} setImagesBkp={setImagesBkp}
                />
                {config.packing.visible && <hr />}
              </>
            )}

            {/* Packing Section */}
            {config.packing.visible && (
              <>
                <PackingSection
                  config={config.packing}
                  materials={materials}
                  packingOpen={packingOpen} setPackingOpen={setPackingOpen}
                  innerRows={innerRows} setInnerRows={setInnerRows}
                  newInner={newInner} setNewInner={setNewInner}
                  handleAddInnerRow={handleAddInnerRow}
                  handleRemoveInnerRow={handleRemoveInnerRow}
                  openMaterialPicker={openMaterialPicker}
                />
                {config.logistic.visible && <hr />}
              </>
            )}

            {/* Logistic Info Section */}
            {config.logistic.visible && (
              <LogisticSection
                config={config.logistic}
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
            )}

            {/* Notes */}
            <div className="form-group">
              <label className="small mb-1">Note</label>
              <textarea className="form-control form-control-sm" rows="3" value={notes} onChange={handleInputChange(setNotes)} />
            </div>
          </div>

          <div className="card-footer text-right">
            <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button className="btn btn-primary ml-2" onClick={handleSave}>Save</button>
            <button className="btn btn-success ml-2" onClick={() => alert('Submit action to be implemented.')}>Submit</button>
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
        mode="single"
      />

      {/* Model Picker Modal */}
      <ModelPickerModal
        show={isModelPickerOpen}
        onClose={() => setModelPickerOpen(false)}
        onAdd={handleModelPicked}
        selectionMode="single"
      />

      <MaterialPickerModal
        show={isMaterialPickerOpen}
        onClose={() => setMaterialPickerOpen(false)}
        onAdd={handleMaterialPicked}
        zIndex={3000}
        filter={materialFilter}
      />
    </>
  )
}