export const columnsConfig = {
  mainInfo: {
    label: 'Main Info',
    children: {
      destination: { label: 'Destination' },
      model: { label: 'Model' },
      partNo: { label: 'Part No' },
      partName: { label: 'Part Name' },
      supplier: { label: 'Supplier' },
      packingPlant: { label: 'Packing Plant' },
      vanningPlant: { label: 'Vanning Plant' },
      katashiiki: { label: 'Katashiiki' },
    }
  },
  partInfo: {
    label: 'Part Info',
    children: {
      overallLength: { label: 'Overall Length (mm)' },
      overallWidth: { label: 'Overall Width (mm)' },
      overallHeight: { label: 'Overall Height (mm)' },
      netWeight: { label: 'Net Weight (kg)' },
    }
  },
  pseInfo: {
    label: 'PSE Info',
    children: {
      dockCode: { label: 'Dock Code' },
      address: { label: 'Address' },
      processType: { label: 'Process Type' },
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
    label: 'Inner Packing',
    children: {
      materialCode: { label: 'Material Code' },
      materialName: { label: 'Material Name' },
      length: { label: 'Length (mm)' },
      width: { label: 'Width (mm)' },
      height: { label: 'Height (mm)' },
      thickness: { label: 'Thickness (mm)' },
      weight: { label: 'Weight (g)' },
      materialCost: { label: 'Material Cost' },
    }
  },
  outerPacking: {
    label: 'Outer Packing',
    children: {
      materialCode: { label: 'Material Code' },
      materialName: { label: 'Material Name' },
      length: { label: 'Length (mm)' },
      width: { label: 'Width (mm)' },
      height: { label: 'Height (mm)' },
      thickness: { label: 'Thickness (mm)' },
      weight: { label: 'Weight (g)' },
      materialCost: { label: 'Material Cost' },
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