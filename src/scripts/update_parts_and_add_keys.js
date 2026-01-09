import fs from 'fs';

// List of part numbers that should exist
const requiredParts = [
    "848400K010", "848400K030", "893400K010", "131110E010", "131110E020", 
    "256300E010", "261000E020", "122810Y11000", "130500Y02000", "25051BZ15000", 
    "25051BZ26000", "22030BZ15000", "90210T000200", "90430T002300", "111150Y03000", 
    "11115BZ16000", "171730Y03000", "17173BZ13000", "115110Y04000", "115130Y04000", 
    "16261BZ75000", "16261BZ76000", "16264BZ38000", "16264BZ39000", "16282BZ11000", 
    "89467BZ02000", "111910Y01000", "90406T001100", "90406T001300", "23209BZ10000", 
    "90466T006100", "90466T006200", "32101BZ10000", "157080Y04000", "90360T001200", 
    "90105T027300", "90119T044400", "9004A1020000"
];

// Sample destinations and suffixes
const destinations = ["JP", "US", "EU", "AS", "SA", "AU", "CN", "TH", "MY", "ID", "VN", "PH"];
const suffixes = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N"];

// Model codes and CFC variations
const modelCodes = ["579W", "582B", "588G", "591R", "595T", "601Y", "607K", "613P", "619M", "625N"];
const cfcCodes = ["CF-001", "CF-002", "CF-003", "CF-004", "CF-005", "CF-006", "CF-007", "CF-008"];

// Part name templates
const partNameTemplates = [
    "HOSE, WATER BY-PASS",
    "CLIP, WIRING HARNESS",
    "BOLT, FLANGE",
    "NUT, HEX",
    "WASHER, PLAIN",
    "GASKET, ENGINE",
    "SEAL, OIL",
    "BEARING, BALL",
    "SPRING, COIL",
    "FILTER, OIL",
    "SENSOR, TEMPERATURE",
    "BRACKET, MOUNTING",
    "COVER, DUST",
    "PIPE, FUEL",
    "VALVE, CHECK",
    "CABLE, BATTERY",
    "CONNECTOR, ELECTRICAL",
    "FUSE, BLADE",
    "RELAY, POWER",
    "SWITCH, PRESSURE"
];

const plantCodes = ["TMMIN", "TMT", "TMAP", "TMUK", "TMMBC"];
const dockCodes = ["D01", "D02", "D03", "D04", "D05"];

const materialNumbers = [
    "MAT001", "MAT002", "MAT003", "MAT004", "MAT005", "MAT006", "MAT007", "MAT008", 
    "MAT009", "MAT010", "MAT011", "MAT012", "MAT013", "MAT014", "MAT015", "MAT016",
    "MAT017", "MAT018", "MAT019", "MAT020", "MAT021", "MAT022", "MAT023", "MAT024",
    "MAT025", "MAT026", "MAT027", "MAT028", "MAT029", "MAT030", "MAT031", "MAT032"
];

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateRandomDate(startYear = 2024, endYear = 2024) {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

function addDays(dateStr, days) {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function generateImplementationPeriod() {
    const month = randomInt(1, 12);
    const year = randomChoice([2024, 2025]);
    return `${month.toString().padStart(2, '0')}.${year}`;
}

function sampleArray(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createNewCpsEntry(partNo, idNum) {
    const modelCode = randomChoice(modelCodes);
    const cfcCode = randomChoice(cfcCodes);
    const partName = randomChoice(partNameTemplates) + `, NO.${randomInt(1, 5)}`;
    
    // Select random inner materials (2-4 items)
    const numInner = randomInt(2, 4);
    const innerMaterials = [];
    const selectedInnerMats = sampleArray(materialNumbers, numInner);
    for (const mat of selectedInnerMats) {
        const qty = randomInt(1, 10);
        const price = randomFloat(10.0, 200.0);
        innerMaterials.push({
            materialNo: mat,
            qty: qty,
            price: price,
            sum: parseFloat((qty * price).toFixed(2))
        });
    }
    
    // Select random outer materials (2-3 items)
    const numOuter = randomInt(2, 3);
    const outerMaterials = [];
    const availableOuter = materialNumbers.filter(m => !selectedInnerMats.includes(m));
    const selectedOuterMats = sampleArray(availableOuter, numOuter);
    for (const mat of selectedOuterMats) {
        const qty = randomInt(1, 5);
        const price = randomFloat(15.0, 180.0);
        outerMaterials.push({
            materialNo: mat,
            qty: qty,
            price: price,
            sum: parseFloat((qty * price).toFixed(2))
        });
    }
    
    const issueDate = generateRandomDate(2024, 2024);
    const effectiveDate = addDays(issueDate, randomInt(5, 15));
    
    const materialCost = [...innerMaterials, ...outerMaterials].reduce((sum, m) => sum + m.sum, 0);
    const laborCost = randomFloat(50.0, 200.0);
    const overheadCost = randomFloat(20.0, 100.0);
    
    const cpsEntry = {
        id: idNum,
        implementation_period: generateImplementationPeriod(),
        model_code: modelCode,
        model_cfc: modelCode,
        destination: randomChoice(destinations),
        suffix: randomChoice(suffixes),
        part_no: partNo,
        cps: {
            cps_no: `CPS-2024-${idNum.toString().padStart(3, '0')}`,
            refCpsNo: "",
            issue_date: issueDate,
            effective_date: effectiveDate,
            model: {
                model_type: randomChoice(["lot", "bulk", "mixed"]),
                model_code: modelCode,
                model_cfc: modelCode,
                cfc: cfcCode
            },
            part_no: partNo,
            part_name: partName,
            supplier: {},
            part_status: randomChoice(["New", "Existing", "Modified"]),
            detail_part_status: randomChoice(["New/Uniqe Export", "Existing/Continue", "Modified/Revision"]),
            packing_spec_status: randomChoice(["New", "Continue", "Revision"]),
            plant_code: randomChoice(plantCodes),
            dock_code: randomChoice(dockCodes),
            pse_info: {
                packing_plant_curr: `PLANT-${randomInt(1, 5)}`,
                packing_plant_next: `PLANT-${randomInt(1, 5)}`,
                vanning_plant_curr: `VPLANT-${randomChoice(['A', 'B', 'C'])}`,
                vanning_plant_next: `VPLANT-${randomChoice(['A', 'B', 'C'])}`,
                order_pattern_curr: `${randomChoice(['A', 'B', 'C'])}${randomInt(1, 3)}`,
                order_pattern_next: `${randomChoice(['A', 'B', 'C'])}${randomInt(1, 3)}`,
                category: `CAT-${randomInt(1, 5)}`,
                katashiki: {
                    AD: randomInt(1, 2).toString(),
                    AU: randomInt(1, 2).toString(),
                    AF: randomInt(1, 2).toString(),
                    AX: randomInt(1, 2).toString()
                },
                importer_line_process: `ILP-${randomInt(1, 3)}`,
                case_code: `CC-${idNum.toString().padStart(3, '0')}`,
                box_number: `B-${idNum.toString().padStart(3, '0')}`,
                renban: `R-${idNum.toString().padStart(3, '0')}`,
                renban_eff: effectiveDate,
                packing_process_boxing: randomChoice(["Manual", "Auto", "Semi-Auto"]),
                packing_process_stacking: randomChoice(["Manual", "Auto", "Semi-Auto"])
            },
            images: {
                part: {
                    caption: "Part Image",
                    files: [`/assets/${randomInt(1, 8)}.png`]
                },
                packing: {
                    caption: "Packing Image",
                    files: [`/assets/${randomInt(1, 8)}.png`]
                },
                outer: {
                    caption: "Outer Image",
                    files: [`/assets/${randomInt(1, 8)}.png`]
                },
                qkp: {
                    caption: "QKP Image",
                    files: [`/assets/${randomInt(1, 8)}.png`]
                },
                bkp: {
                    caption: "BKP Image",
                    files: [`/assets/${randomInt(1, 8)}.png`]
                }
            },
            packing: {
                inner: innerMaterials,
                outer: outerMaterials,
                qty_per_container: randomInt(50, 500),
                qty_per_pallet: randomInt(10, 50),
                container_type: randomChoice(["20ft", "40ft", "40ft HC"]),
                unit_weight: randomFloat(0.5, 10.0),
                unit_volume: randomFloat(0.001, 0.1, 4)
            },
            cost_calculation: {
                material_cost: parseFloat(materialCost.toFixed(2)),
                labor_cost: laborCost,
                overhead_cost: overheadCost,
                total_cost: parseFloat((materialCost + laborCost + overheadCost).toFixed(2))
            },
            logistics: {
                shipping_method: randomChoice(["Sea", "Air", "Land"]),
                lead_time_days: randomInt(7, 60),
                customs_code: `HS${randomInt(100000, 999999)}`
            },
            quality: {
                inspection_level: randomChoice(["Level I", "Level II", "Level III"]),
                defect_rate: randomFloat(0.01, 0.5),
                certification: randomChoice(["ISO9001", "IATF16949", "ISO14001"])
            }
        }
    };
    
    return cpsEntry;
}

// Read the existing data
console.log('Reading generatedData.json...');
const data = JSON.parse(fs.readFileSync('public/generatedData.json', 'utf-8'));

// Extract existing part numbers
const existingParts = new Set();
for (const cps of data.cpsData) {
    existingParts.add(cps.part_no);
}

// Find missing parts
const missingParts = requiredParts.filter(part => !existingParts.has(part));

console.log(`Existing parts found: ${requiredParts.filter(p => existingParts.has(p)).length}`);
console.log(`Missing parts: ${missingParts.length}`);
if (missingParts.length > 0) {
    console.log('Missing part numbers:', missingParts);
}

// Get the current max ID
const maxId = Math.max(...data.cpsData.map(cps => cps.id));

// Add missing parts
for (let i = 0; i < missingParts.length; i++) {
    const partNo = missingParts[i];
    const newEntry = createNewCpsEntry(partNo, maxId + i + 1);
    data.cpsData.push(newEntry);
    console.log(`Added new entry for part ${partNo} with ID ${maxId + i + 1}`);
}

// Add destination and suffix to all existing entries (after model_cfc)
console.log('\nAdding destination and suffix keys to all existing entries...');
for (const cps of data.cpsData) {
    // Add destination and suffix if not already present
    if (!cps.destination) {
        cps.destination = randomChoice(destinations);
    }
    if (!cps.suffix) {
        cps.suffix = randomChoice(suffixes);
    }
}

// Reorder keys to put destination and suffix after model_cfc
const reorderedData = { cpsData: [] };
for (const cps of data.cpsData) {
    const orderedCps = {};
    const keyOrder = ['id', 'implementation_period', 'model_code', 'model_cfc', 'destination', 'suffix', 'part_no', 'cps'];
    
    for (const key of keyOrder) {
        if (key in cps) {
            orderedCps[key] = cps[key];
        }
    }
    
    // Add any remaining keys that weren't in the expected list
    for (const key in cps) {
        if (!(key in orderedCps)) {
            orderedCps[key] = cps[key];
        }
    }
    
    reorderedData.cpsData.push(orderedCps);
}

// Write back to file
console.log('\nWriting updated data to file...');
fs.writeFileSync('public/generatedData.json', JSON.stringify(reorderedData, null, 2), 'utf-8');

console.log(`\n✅ Update complete!`);
console.log(`Total entries in file: ${reorderedData.cpsData.length}`);
console.log(`New parts added: ${missingParts.length}`);
console.log(`Destination and suffix keys added to all ${reorderedData.cpsData.length} entries`);
