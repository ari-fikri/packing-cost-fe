export const buildPayload = (data) => {
  return {
    // General
    cpsNo: data.cpsNo,
    refCpsNo: data.refCpsNo,
    issueDate: data.issueDate,
    effectiveDate: data.effectiveDate,
    cfcPjtCode: data.cfcPjtCode,
    model: data.model,
    partNo: data.partNo,
    partName: data.partName,
    supplier: data.supplier,
    plantCode: data.plantCode,
    dockCode: data.dockCode,

    // PSE Info
    pseInfo: {
      packingPlantCurr: data.pseInfo.packingPlantCurr,
      packingPlantNext: data.pseInfo.packingPlantNext,
      vanningPlantCurr: data.pseInfo.vanningPlantCurr,
      vanningPlantNext: data.pseInfo.vanningPlantNext,
      orderPatternCurr: data.pseInfo.orderPatternCurr,
      orderPatternNext: data.pseInfo.orderPatternNext,
      category: data.pseInfo.category,
      katashiki: data.pseInfo.katashiki,
      importerLineProcess: data.pseInfo.importerLineProcess,
      caseCode: data.pseInfo.caseCode,
      boxNumber: data.pseInfo.boxNumber,
      renban: data.pseInfo.renban,
      renbanEff: data.pseInfo.renbanEff,
      packingProcessBoxing: data.pseInfo.packingProcessBoxing,
      packingProcessStacking: data.pseInfo.packingProcessStacking,
    },

    // Images
    images: {
      part: data.images.part,
      packing: data.images.packing,
      outer: data.images.outer,
      qkp: data.images.qkp,
      bkp: data.images.bkp,
    },

    // Packing
    packing: {
      outerModuleType: data.packing.outerModuleType,
      outerDimension: data.packing.outerDimension,
      innerVolume: data.packing.innerVolume,
      outerVolume: data.packing.outerVolume,
      innerRows: data.packing.innerRows,
    },

    // Notes
    notes: data.notes,

    // Logistic
    logistic: {
      tmmindDestDockCode: data.logistic.tmmindDestDockCode,
      logisticRemark: data.logistic.logisticRemark,
      processType: data.logistic.processType,
      addressRack: data.logistic.addressRack,
    },
  };
};

export const resetStates = (setters) => {
  setters.setCpsNo('');
  setters.setRefCpsNo('');
  setters.setIssueDate('');
  setters.setEffectiveDate('');
  setters.setCfcPjtCode('');
  setters.setModel('');
  setters.setPartNo('');
  setters.setPartName('');
  setters.setSupplier('');
  setters.setPlantCode('');
  setters.setDockCode('');

  setters.setPseOpen(false);
  setters.setPackingPlantCurr(''); setters.setPackingPlantNext('');
  setters.setVanningPlantCurr(''); setters.setVanningPlantNext('');
  setters.setOrderPatternCurr(''); setters.setOrderPatternNext('');
  setters.setCategory(''); setters.setKatashiki({ AD: '', AU: '', AF: '', AX: '' });
  setters.setImporterLineProcess(''); setters.setCaseCode(''); setters.setBoxNumber(''); setters.setRenban(''); setters.setRenbanEff('');
  setters.setPackingProcessBoxing(''); setters.setPackingProcessStacking('');

  setters.setImagesPart({ caption: "", files: [] });
  setters.setImagesPacking({ caption: "", files: [] });
  setters.setImagesOuter({ caption: "", files: [] });
  setters.setImagesQkp({ caption: "", files: [] });
  setters.setImagesBkp({ caption: "", files: [] });

  setters.setOuterModuleType(''); setters.setOuterMaterialName(''); setters.setOuterDimension({ L: '', W: '', H: '' });
  setters.setInnerVolume(''); setters.setOuterVolume('');
  setters.setInnerRows([]);
  setters.setNotes('');
  setters.setNewInner({
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

  setters.setLogisticOpen(true);
  setters.setTmmindDestDockCode('');
  setters.setLogisticRemark('');
  setters.setProcessType('N');
  setters.setAddressRack('');
};