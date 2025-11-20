import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data');
const templateDir = path.join(dataDir, 'template');

const cpsStructPath = path.join(templateDir, 'cps-struct.json');
const modelsPath = path.join(dataDir, 'models.json');
const partsPath = path.join(dataDir, 'parts.json');
const suppliersPath = path.join(dataDir, 'suppliers.js');
const materialsPath = path.join(dataDir, 'materials.json');
const generatedDataPath = path.join(dataDir, 'generatedData.json');
const subtotalStructPath = path.join(templateDir, 'subtotal.json');

const MAX_CPS = 8;

// Helper function to format numbers to two decimal places
const formatNumber = (num) => parseFloat(num.toFixed(2));

const calculateSubtotalDetails = (total) => {
  const prev_year = formatNumber(total * (Math.random() * 0.4 + 0.8)); // Generates a value between 80% and 120% of the total
  let diff = 0;
  if (prev_year !== 0) {
    diff = ((total - prev_year) / prev_year) * 100;
  } else if (total > 0) {
    diff = 100.0;
  }

  return {
    total,
    prev_year,
    diff: formatNumber(diff),
  };
};

try {
  // Read all necessary files
  const cpsStruct = JSON.parse(fs.readFileSync(cpsStructPath, 'utf-8'));
  const subtotalStruct = JSON.parse(fs.readFileSync(subtotalStructPath, 'utf-8'));
  const models = JSON.parse(fs.readFileSync(modelsPath, 'utf-8'));
  const allParts = JSON.parse(fs.readFileSync(partsPath, 'utf-8'));
  
  // Dynamically import suppliers from .js file
  const { suppliers } = await import(suppliersPath);
  
  const allMaterials = JSON.parse(fs.readFileSync(materialsPath, 'utf-8'));

  const generatedData = {
    cpsData: [],
  };

  const suppliersMap = new Map(suppliers.map(s => [s.code, s]));
  const boxMaterials = allMaterials.filter(m => m.type === 'Box');
  const moduleMaterials = allMaterials.filter(m => m.type === 'Module');
  const otherMaterials = allMaterials.filter(m => m.type !== 'Box' && m.type !== 'Module');

  for (let i = 0; i < MAX_CPS; i++) {
    const model = models[Math.floor(Math.random() * models.length)];
    const part = allParts[Math.floor(Math.random() * allParts.length)];
    const supplier = suppliersMap.get(part.supplier_code);

    const newCps = JSON.parse(JSON.stringify(cpsStruct));

    // Populate CPS data based on the new logic
    newCps.id = i + 1;
    newCps.recNo = i + 1;
    newCps.cpsNo = `CPS${model.code}${model.destinationCode}${model.implementationPeriod}${part.part_no}`;
    newCps.partNo = part.part_no;
    newCps.partName = part.part_name;
    newCps.parentNo = `PARENT-00${Math.floor(Math.random() * 9) + 1}`;
    
    if (supplier) {
      newCps.supplierCode = supplier.code;
      newCps.supplierName = supplier.name;
    } else {
      const randomSupplier = suppliers[Math.floor(Math.random() * suppliers.length)];
      newCps.supplierCode = randomSupplier.code;
      newCps.supplierName = randomSupplier.name;
    }

    newCps.weightPerPc = formatNumber(Math.random() * 10);
    newCps.qtyPerBox = Math.floor(Math.random() * 50) + 1;

    // Ensure packing object exists
    if (!newCps.cps.packing) {
      newCps.cps.packing = {};
    }

    // Generate inner materials
    const innerMaterialCount = Math.floor(Math.random() * 6) + 5; // 5 to 10
    newCps.cps.packing.inner = [];
    if (boxMaterials.length > 0) {
        const boxMaterial = boxMaterials[Math.floor(Math.random() * boxMaterials.length)];
        newCps.cps.packing.inner.push({
            materialNo: boxMaterial.materialNo,
            qty: 1,
            price: formatNumber(boxMaterial.price),
            sum: formatNumber(boxMaterial.price),
        });
    }
    for (let j = newCps.cps.packing.inner.length; j < innerMaterialCount; j++) {
        const material = otherMaterials[Math.floor(Math.random() * otherMaterials.length)];
        const qty = Math.floor(Math.random() * 10) + 1;
        newCps.cps.packing.inner.push({
            materialNo: material.materialNo,
            qty: qty,
            price: formatNumber(material.price),
            sum: formatNumber(qty * material.price),
        });
    }

    // Generate outer materials
    const outerMaterialCount = Math.floor(Math.random() * 6) + 5; // 5 to 10
    newCps.cps.packing.outer = [];
    if (moduleMaterials.length > 0) {
        const moduleMaterial = moduleMaterials[Math.floor(Math.random() * moduleMaterials.length)];
        newCps.cps.packing.outer.push({
            materialNo: moduleMaterial.materialNo,
            qty: 1,
            price: formatNumber(moduleMaterial.price),
            sum: formatNumber(moduleMaterial.price),
        });
    }
    for (let k = newCps.cps.packing.outer.length; k < outerMaterialCount; k++) {
        const material = otherMaterials[Math.floor(Math.random() * otherMaterials.length)];
        const qty = Math.floor(Math.random() * 10) + 1;
        newCps.cps.packing.outer.push({
            materialNo: material.materialNo,
            qty: qty,
            price: formatNumber(material.price),
            sum: formatNumber(qty * material.price),
        });
    }
    
    // Calculate totals
    const subTotalInner = formatNumber(newCps.cps.packing.inner.reduce((acc, item) => acc + item.sum, 0));
    const subTotalOuter = formatNumber(newCps.cps.packing.outer.reduce((acc, item) => acc + item.sum, 0));
    const subTotalMaterial = formatNumber(subTotalInner + subTotalOuter);

    // Generate manhour data
    const manhour = {
        receiving: Math.floor(Math.random() * 1000),
        inspection: Math.floor(Math.random() * 1000),
        delivery_course: Math.floor(Math.random() * 1000),
        pallet_supply: Math.floor(Math.random() * 1000),
        binding: Math.floor(Math.random() * 1000),
        non_pallet_supply: Math.floor(Math.random() * 1000),
        pick_packing: Math.floor(Math.random() * 1000),
        empty_box: Math.floor(Math.random() * 1000),
        mix_van: Math.floor(Math.random() * 1000),
        lashing: Math.floor(Math.random() * 1000),
    };
    newCps.cps.manhour = manhour;

    // Generate labor data
    const labor = {
        dl: formatNumber(Math.random() * 5000),
        idl: formatNumber(Math.random() * 5000),
        facility: formatNumber(Math.random() * 2000),
    };
    newCps.cps.labor = labor;
    const subTotalLabor = formatNumber(labor.dl + labor.idl + labor.facility);

    // Generate inland data
    const inland = {
        packing_time: Math.floor(Math.random() * 100),
        inland_cost: formatNumber(Math.random() * 2000),
        milkrun_cost: formatNumber(Math.random() * 1000),
    };
    newCps.cps.inland = inland;
    const subTotalInland = formatNumber(inland.inland_cost + inland.milkrun_cost); // Example calculation

    const subTotal = formatNumber(subTotalMaterial + subTotalLabor + subTotalInland);

    // Create and populate the new subtotals object
    newCps.subtotals = {
      inner: calculateSubtotalDetails(subTotalInner),
      outer: calculateSubtotalDetails(subTotalOuter),
      material: calculateSubtotalDetails(subTotalMaterial),
      labor: calculateSubtotalDetails(subTotalLabor),
      inland: calculateSubtotalDetails(subTotalInland),
      total: calculateSubtotalDetails(subTotal),
    };

    generatedData.cpsData.push(newCps);
  }

  fs.writeFileSync(generatedDataPath, JSON.stringify(generatedData, null, 2));

  console.log(`Successfully generated ${MAX_CPS} records in ${generatedDataPath}`);
} catch (error) {
  console.error('Error generating data:', error);
}