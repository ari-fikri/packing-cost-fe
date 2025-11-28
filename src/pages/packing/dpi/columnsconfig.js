export const columnsConfig = {
  mainInfo: {
    label: 'Main Info',
    children: {
      destination: { label: 'Destination' },
      model: { label: 'Model' },
      partNo: { label: 'Part No' },
      implementationPeriod: { label: 'Implementation Period' },
      cpsNo: { label: 'CPS No' },
    },
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
  },
  pseInfo: {
    label: 'PSE Info',
    children: {
      packingPlant: {
        label: 'Packing Plant',
        children: {
          current: { label: 'Current' },
          next: { label: 'Next' },
        },
      },
      vanningPlant: {
        label: 'Vanning Plant',
        children: {
          current: { label: 'Current' },
          next: { label: 'Next' },
        },
      },
      orderPattern: {
        label: 'Order Pattern',
        children: {
          current: { label: 'Current' },
          next: { label: 'Next' },
        },
      },
      katashiiki: {
        label: 'Katashiiki',
        children: {
          ad: { label: 'AD' },
          au: { label: 'AU' },
          af: { label: 'AF' },
          ax: { label: 'AX' },
        },
      },
      importerLineProcess: { label: 'Importer Line Process' },
      caseCode: { label: 'Case Code' },
      boxNumber: { label: 'Box Number' },
      renban: { label: 'Renban' },
      renbanEff: { label: 'Renban Eff' },
      packingProcess: {
        label: 'Packing Process',
        children: {
          boxing: { label: 'Boxing' },
          stacking: { label: 'Stacking' },
        },
      },
    },
  },
  logisticInfo: {
    label: 'Logistic Info',
    children: {
      dockCode: { label: 'Dock Code' },
      address: { label: 'Address' },
      processType: { label: 'Process Type' },
    },
  },
  images: {
    label: 'Images',
    children: {
      part: { label: 'Part' },
      packing: { label: 'Packing' },
      outer: { label: 'Outer' },
      qkp: { label: 'QKP' },
      bkp: { label: 'BKP' },
    },
  },
  innerMaterials: {
    label: 'Inner Materials',
    children: {
      box: {
        label: 'Box',
        children: {
          matNo: { label: 'Mat No' },
          length: { label: 'Length' },
          width: { label: 'Width' },
          height: { label: 'Height' },
          volumeInner: { label: 'Volume Inner' },
          volumeOuter: { label: 'Volume Outer' },
          usage: { label: 'Usage' },
          source: { label: 'Source' },
        },
      },
      inner1: { label: 'Inner 1', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner2: { label: 'Inner 2', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner3: { label: 'Inner 3', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner4: { label: 'Inner 4', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner5: { label: 'Inner 5', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner6: { label: 'Inner 6', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner7: { label: 'Inner 7', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner8: { label: 'Inner 8', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      inner9: { label: 'Inner 9', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
    },
  },
  outerMaterials: {
    label: 'Outer Materials',
    children: {
      module: {
        label: 'Module',
        children: {
          matNo: { label: 'Mat No' },
          length: { label: 'Length' },
          width: { label: 'Width' },
          height: { label: 'Height' },
          volumeInner: { label: 'Volume Inner' },
          volumeOuter: { label: 'Volume Outer' },
          usage: { label: 'Usage' },
          source: { label: 'Source' },
        },
      },
      outer1: { label: 'Outer 1', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer2: { label: 'Outer 2', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer3: { label: 'Outer 3', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer4: { label: 'Outer 4', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer5: { label: 'Outer 5', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer6: { label: 'Outer 6', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer7: { label: 'Outer 7', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer8: { label: 'Outer 8', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
      outer9: { label: 'Outer 9', children: { matNo: { label: 'Mat No' }, usage: { label: 'Usage' } } },
    },
  },
};

export const getInitialVisibility = (config) => {
  const visibility = {};
  for (const key in config) {
    const node = config[key];
    if (node.children) {
      visibility[key] = {
        visible: true,
        children: getInitialVisibility(node.children),
      };
    } else {
      visibility[key] = true;
    }
  }
  return visibility;
};

export const initialVisibleColumns = getInitialVisibility(columnsConfig);