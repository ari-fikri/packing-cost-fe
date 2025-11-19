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

const MAX_CPS = 3;

try {
  // Read all necessary files
  const cpsStruct = JSON.parse(fs.readFileSync(cpsStructPath, 'utf-8'));
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

    newCps.weightPerPc = (Math.random() * 10).toFixed(2);
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
            price: boxMaterial.price,
            sum: boxMaterial.price,
        });
    }
    for (let j = newCps.cps.packing.inner.length; j < innerMaterialCount; j++) {
        const material = otherMaterials[Math.floor(Math.random() * otherMaterials.length)];
        const qty = Math.floor(Math.random() * 10) + 1;
        newCps.cps.packing.inner.push({
            materialNo: material.materialNo,
            qty: qty,
            price: material.price,
            sum: qty * material.price,
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
            price: moduleMaterial.price,
            sum: moduleMaterial.price,
        });
    }
    for (let k = newCps.cps.packing.outer.length; k < outerMaterialCount; k++) {
        const material = otherMaterials[Math.floor(Math.random() * otherMaterials.length)];
        const qty = Math.floor(Math.random() * 10) + 1;
        newCps.cps.packing.outer.push({
            materialNo: material.materialNo,
            qty: qty,
            price: material.price,
            sum: qty * material.price,
        });
    }
    
    // Calculate totals
    newCps.subTotalInner = newCps.cps.packing.inner.reduce((acc, item) => acc + item.sum, 0);
    newCps.subTotalOuter = newCps.cps.packing.outer.reduce((acc, item) => acc + item.sum, 0);
    newCps.subTotalMaterial = newCps.subTotalInner + newCps.subTotalOuter;
    newCps.subTotalLabor = Math.floor(Math.random() * 50000) + 10000;
    newCps.subTotalInland = Math.floor(Math.random() * 10000) + 1000;
    newCps.subTotal = newCps.subTotalMaterial + newCps.subTotalLabor + newCps.subTotalInland;
    newCps.diffPct = `${(Math.random() * 5).toFixed(1)}%`;


    generatedData.cpsData.push(newCps);
  }

  fs.writeFileSync(generatedDataPath, JSON.stringify(generatedData, null, 2));

  console.log(`Successfully generated ${MAX_CPS} records in ${generatedDataPath}`);
} catch (error) {
  console.error('Error generating data:', error);
}