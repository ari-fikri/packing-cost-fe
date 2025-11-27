export const columnsConfig = {
  mainInfo: {
    label: 'Main Info',
    children: {
      destination: { label: 'Destination' },
      model: { label: 'Model' },
      implementationPeriod: { label: 'Impl Period' },      
      cpsNo: { label: 'CPS No' },
    }
  },
  partInfo: {
    label: 'Part Info',
    children: {
      partNo: { label: 'Part No' },
      partName: { label: 'Part Name' },
      parentPart: { label: 'Parent Part' },
      supplierCode: { label: 'Supplier Code' },
      supplierName: { label: 'Supplier Name' },
      partStatus: { label: 'Part Status' },
      dtlPartStatus: { label: 'Dtl Part Status' },
      packSpecStatus: { label: 'Pack Spec Status' },
      weightPc: { label: 'Weight/Pc' },
      qtyBox: { label: 'Qty/Box' },    
  },
  pseInfo: {
    label: 'PSE Info',
    children: {
      packingPlant: { label: 'Packing Plant' },
      vanningPlant: { label: 'Vanning Plant' },
      orderPattern: { label: 'Order Pattern' },
      katashiiki: { label: 'Katashiiki' },
      importerLineProcess: { label: 'Importer Line Process' },
      caseCode: { label: 'Case Code' },
      boxNumber: { label: 'Box Number' },
      renban: { label: 'Renban' },
      renbanEff: { label: 'Renban Eff' },
      packingProcess: { label: 'Packing Process' },
    }
  },
  logisticInfo: {
    label: 'Logistic Info',
    children: {
      dockCode: { label: 'Dock Code' },
      address: { label: 'Address' },
      processType: { label: 'Process Type' },
    }
  },
  imageInfo: {
    label: 'Image Info',
    children: {
      partImage: { label: 'Part Image' },
      packingImage: { label: 'Packing Image' },
      outerImage: { label: 'Outer Image' },
      qkpImage: { label: 'QKP Image' },
      bkpImage: { label: 'BKP Image' },
    }
  },
  innerPacking: {
    label: 'Inner Packing'
  },
  outerPacking: {
    label: 'Outer Packing'
    }
  },
  subTotal: {
    label: 'Sub Total',
    children: {
      inner: { label: 'Inner' },
      outer: { label: 'Outer' },
      material: { label: 'Material' },
      labor: { label: 'Labor' },
      inland: { label: 'Inland' },
    }
  },
  laborInfo: {
    label: 'Labor Info',
    children: {
      manHourRequirement: { label: 'Man Hour Requirement' },
      laborCost: { label: 'Labor Cost' },
    }
  },
  inland: {
    label: 'Inland',
    children: {
      packTime: { label: 'Pack Time (V-PASS)' },
      inlandCost: { label: 'Inland Cost (m³)' },
      diff: { label: 'Diff' },
      milkrunCost: { label: 'Milkrun Cost' },
    }
  }
};

const getInitialVisibility = (config) => {
  const visibility = {};
  for (const key in config) {
    visibility[key] = {};
    if (config[key].children) {
      for (const childKey in config[key].children) {
        visibility[key][childKey] = true;
      }
    }
  }
  return visibility;
};

export const initialVisibleColumns = getInitialVisibility(columnsConfig);