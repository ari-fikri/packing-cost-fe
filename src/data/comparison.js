// src/data/comparison.js

export const currentDummy = {
  recNo: 1,
  cpsNo: "CPS-0001",
  partNo: "12345-A1",
  partName: "Front Bumper",
  parentNo: "PARENT-001",
  supplierCode: "SUPP100",
  supplierName: "Aisin Seiki Intl",
  weightPerPc: 5.25,
  qtyPerBox: 20,

  subTotal: 150000,
  diffPct: "3.5%",

  innerMaterials: [
    { materialNo: "IMAT1", qty: 2, price: 1100, sum: 2200 },
    { materialNo: "IMAT2", qty: 4, price: 1200, sum: 4800 },
    { materialNo: "IMAT3", qty: 1, price: 1300, sum: 1300 },
    { materialNo: "IMAT4", qty: 5, price: 1400, sum: 7000 },
    { materialNo: "IMAT5", qty: 3, price: 1500, sum: 4500 },
    { materialNo: "IMAT6", qty: 2, price: 1600, sum: 3200 },
    { materialNo: "IMAT7", qty: 7, price: 1700, sum: 11900 },
    { materialNo: "IMAT8", qty: 6, price: 1800, sum: 10800 },
    { materialNo: "IMAT9", qty: 8, price: 1900, sum: 15200 },
    { materialNo: "IMAT10", qty: 10, price: 2000, sum: 20000 },
  ],

  outerMaterials: [
    { materialNo: "OMAT1", qty: 3, price: 2100, sum: 6300 },
    { materialNo: "OMAT2", qty: 2, price: 2200, sum: 4400 },
    { materialNo: "OMAT3", qty: 1, price: 2300, sum: 2300 },
    { materialNo: "OMAT4", qty: 4, price: 2400, sum: 9600 },
    { materialNo: "OMAT5", qty: 5, price: 2500, sum: 12500 },
    { materialNo: "OMAT6", qty: 3, price: 2600, sum: 7800 },
    { materialNo: "OMAT7", qty: 6, price: 2700, sum: 16200 },
    { materialNo: "OMAT8", qty: 7, price: 2800, sum: 19600 },
    { materialNo: "OMAT9", qty: 8, price: 2900, sum: 23200 },
    { materialNo: "OMAT10", qty: 9, price: 3000, sum: 27000 },
  ],

  labor: {
    receiving: 2.0,
    inspection: 1.5,
    deliveryCourse: 0.5,
    palletSupply: 0.8,
    pickPacking: 3.2,
    vanning: 1.0,
    boxValetReturn: 0.4,
    mixVan: 0.6,
    lashing: 1.2,
    totalTimeReq: 13.2,
    others: 0.5,

    laborCostCurrent: 50000,
    laborCostDL: 15000,
    laborCostIDL: 8000,
    laborCostFacility: 12000,
  },

  inland: {
    packTimeVPass: 1.0,
    costM3: 2500,
    diff: "0.2%",
    milkrunCost: 5000,
  },
};

export const partsDummy = [
  {
    partNo: "12345-A1",
    name: "Front Bumper",
    supplier: "Aisin Seiki Intl",
    price: 50000,
    leadTime: "2 weeks",
  },
  {
    partNo: "67890-B2",
    name: "Rear Mirror",
    supplier: "Supplier XYZ",
    price: 15000,
    leadTime: "1 week",
  },
  {
    partNo: "11122-C3",
    name: "Wheel Cover",
    supplier: "Wheel Co.",
    price: 8000,
    leadTime: "3 days",
  },
];
