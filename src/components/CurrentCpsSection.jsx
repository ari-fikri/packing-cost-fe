// src/components/CurrentCpsSection.jsx
import React from "react";

export default function CurrentCpsSection({ current = {} }) {
  const INNER_COUNT = 10;
  const OUTER_COUNT = 10;

  const innerData = current.innerMaterials || [];
  const outerData = current.outerMaterials || [];

  const labor = current.labor || {};
  const inland = current.inland || {};

  const totalLeafCols =
    2 + // rec, cps
    7 + // part info
    5 + // sub totals
    1 + // diff
    INNER_COUNT * 4 +
    OUTER_COUNT * 4 +
    13 + // man hour req
    4 + // labor cost
    4; // inland
  const approxColWidth = 90;
  const minWidthPx = Math.max(1200, totalLeafCols * approxColWidth);

  return (
    <div className="mb-3">
      <button type="button" className="btn btn-sm btn-link p-0">
        <i className="fas fa-chevron-down mr-2" />
        <strong>Current CPS (from New CPS modal)</strong>
      </button>

      <div className="card card-body mt-2 p-2">
        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table
            className="table table-sm table-bordered mb-0 text-center"
            style={{ minWidth: `${minWidthPx}px` }}
          >
            <thead>
              {/* ROW 1 */}
              <tr style={{ backgroundColor: "#696969", color: "white" }}>
                <th rowSpan={3} className="align-middle">Rec No</th>
                <th rowSpan={3} className="align-middle">CPS No</th>

                {/* Part Info */}
                <th rowSpan={2} colSpan={7} className="align-middle">Part Info</th>

                {/* Sub Total Costs */}
                <th rowSpan={2} colSpan={5} className="align-middle">Sub Total Costs</th>

                <th rowSpan={3} className="align-middle">Diff (%)</th>

                {/* Inner & Outer Info */}
                <th colSpan={INNER_COUNT * 4} className="align-middle">Inner Info</th>
                <th colSpan={OUTER_COUNT * 4} className="align-middle">Outer Info</th>

                {/* Labor */}
                <th colSpan={13 + 4} className="align-middle">Labor</th>

                {/* Inland */}
                <th colSpan={4} rowSpan={2} className="align-middle">Inland</th>
              </tr>

              {/* ROW 2 */}
              <tr style={{ backgroundColor: "#969696", color: "black" }}>
                {/* Inner group headers */}
                {Array.from({ length: INNER_COUNT }).map((_, i) => (
                  <th key={`innerGroupHdr${i}`} colSpan={4} className="align-middle">
                    Material {i + 1}
                  </th>
                ))}
                {/* Outer group headers */}
                {Array.from({ length: OUTER_COUNT }).map((_, i) => (
                  <th key={`outerGroupHdr${i}`} colSpan={4} className="align-middle">
                    Material {i + 1}
                  </th>
                ))}

                {/* Labor split */}
                <th colSpan={13} className="align-middle">Man Hour Requirement</th>
                <th colSpan={4} className="align-middle">Labor Cost</th>
              </tr>

              {/* ROW 3 */}
              <tr style={{ backgroundColor: "#D8D8D8", color: "black" }}>
                {/* Part Info */}
                <th className="align-middle">Part No</th>
                <th className="align-middle">Part Name</th>
                <th className="align-middle">Parent No</th>
                <th className="align-middle">Supplier Code</th>
                <th className="align-middle">Supplier Name</th>
                <th className="align-middle">Weight/pc</th>
                <th className="align-middle">Qty/Box</th>

                {/* Sub Total Costs */}
                <th className="align-middle">Inner</th>
                <th className="align-middle">Outer</th>
                <th className="align-middle">Material</th>
                <th className="align-middle">Labor</th>
                <th className="align-middle">Inland</th>

                {/* Inner materials */}
                {Array.from({ length: INNER_COUNT }).map((_, i) => (
                  <React.Fragment key={`innerLeafHdr${i}`}>
                    <th className="align-middle">Mat No</th>
                    <th className="align-middle">Qty</th>
                    <th className="align-middle">Price</th>
                    <th className="align-middle">Sum</th>
                  </React.Fragment>
                ))}

                {/* Outer materials */}
                {Array.from({ length: OUTER_COUNT }).map((_, i) => (
                  <React.Fragment key={`outerLeafHdr${i}`}>
                    <th className="align-middle">Mat No</th>
                    <th className="align-middle">Qty</th>
                    <th className="align-middle">Price</th>
                    <th className="align-middle">Sum</th>
                  </React.Fragment>
                ))}

                {/* Man Hour Requirement */}
                <th className="align-middle">Receiving</th>
                <th className="align-middle">Inspection</th>
                <th className="align-middle">Delivery Course</th>
                <th className="align-middle">Pallet Supply</th>
                <th className="align-middle">Binding</th>
                <th className="align-middle">Sorting & Supply</th>
                <th className="align-middle">Pick & Packing</th>
                <th className="align-middle">Vanning</th>
                <th className="align-middle">Box/Valet Return</th>
                <th className="align-middle">Mix Van</th>
                <th className="align-middle">Lashing</th>
                <th className="align-middle">Total Time Req</th>
                <th className="align-middle">Others</th>

                {/* Labor Cost */}
                <th className="align-middle">Current</th>
                <th className="align-middle">DL</th>
                <th className="align-middle">IDL</th>
                <th className="align-middle">Facility Others</th>

                {/* Inland subs */}
                <th className="align-middle">Pack Time (V-PASS)</th>
                <th className="align-middle">Inland Cost (m³)</th>
                <th className="align-middle">Diff</th>
                <th className="align-middle">Milkrun Cost</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                {/* Rec & CPS */}
                <td className="align-middle">{current.recNo ?? "-"}</td>
                <td className="align-middle">{current.cpsNo ?? "-"}</td>

                {/* Part Info */}
                <td className="align-middle">{current.partNo ?? "-"}</td>
                <td className="align-middle">{current.partName ?? "-"}</td>
                <td className="align-middle">{current.parentNo ?? "-"}</td>
                <td className="align-middle">{current.supplierCode ?? "-"}</td>
                <td className="align-middle">{current.supplierName ?? "-"}</td>
                <td className="align-middle">{current.weightPerPc ?? "-"}</td>
                <td className="align-middle">{current.qtyPerBox ?? "-"}</td>

                {/* Sub Totals */}
                <td className="align-middle">{current.subTotalInner ?? "-"}</td>
                <td className="align-middle">{current.subTotalOuter ?? "-"}</td>
                <td className="align-middle">{current.subTotalMaterial ?? "-"}</td>
                <td className="align-middle">{current.subTotalLabor ?? "-"}</td>
                <td className="align-middle">{current.subTotalInland ?? "-"}</td>

                {/* Diff */}
                <td className="align-middle">{current.diffPct ?? "-"}</td>

                {/* Inner Materials */}
                {Array.from({ length: INNER_COUNT }).map((_, i) => {
                  const mat = innerData[i] || {};
                  return (
                    <React.Fragment key={`innerMatData${i}`}>
                      <td className="align-middle">{mat.materialNo ?? "-"}</td>
                      <td className="align-middle">{mat.qty ?? "-"}</td>
                      <td className="align-middle">{mat.price ?? "-"}</td>
                      <td className="align-middle">{mat.sum ?? "-"}</td>
                    </React.Fragment>
                  );
                })}

                {/* Outer Materials */}
                {Array.from({ length: OUTER_COUNT }).map((_, i) => {
                  const mat = outerData[i] || {};
                  return (
                    <React.Fragment key={`outerMatData${i}`}>
                      <td className="align-middle">{mat.materialNo ?? "-"}</td>
                      <td className="align-middle">{mat.qty ?? "-"}</td>
                      <td className="align-middle">{mat.price ?? "-"}</td>
                      <td className="align-middle">{mat.sum ?? "-"}</td>
                    </React.Fragment>
                  );
                })}

                {/* Labor - Man Hour */}
                <td className="align-middle">{labor.receiving ?? "-"}</td>
                <td className="align-middle">{labor.inspection ?? "-"}</td>
                <td className="align-middle">{labor.deliveryCourse ?? "-"}</td>
                <td className="align-middle">{labor.palletSupply ?? "-"}</td>
                <td className="align-middle">{labor.binding ?? "-"}</td>
                <td className="align-middle">{labor.sorting ?? "-"}</td>
                <td className="align-middle">{labor.pickPacking ?? "-"}</td>
                <td className="align-middle">{labor.vanning ?? "-"}</td>
                <td className="align-middle">{labor.boxValetReturn ?? "-"}</td>
                <td className="align-middle">{labor.mixVan ?? "-"}</td>
                <td className="align-middle">{labor.lashing ?? "-"}</td>
                <td className="align-middle">{labor.totalTimeReq ?? "-"}</td>
                <td className="align-middle">{labor.others ?? "-"}</td>

                {/* Labor Cost */}
                <td className="align-middle">{labor.laborCostCurrent ?? "-"}</td>
                <td className="align-middle">{labor.laborCostDL ?? "-"}</td>
                <td className="align-middle">{labor.laborCostIDL ?? "-"}</td>
                <td className="align-middle">{labor.laborCostFacility ?? "-"}</td>

                {/* Inland */}
                <td className="align-middle">{inland.packTimeVPass ?? "-"}</td>
                <td className="align-middle">{inland.costM3 ?? "-"}</td>
                <td className="align-middle">{inland.diff ?? "-"}</td>
                <td className="align-middle">{inland.milkrunCost ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
