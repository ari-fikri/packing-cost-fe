import React from 'react';

/**
 * A component to display the detailed material, labor, and inland costs for a part.
 * @param {object} props - The component props.
 * @param {object} props.part - The part data object.
 * @returns {JSX.Element} The rendered component.
 */
const MaterialCostDetail = ({ part }) => {
  if (!part) {
    return null;
  }

  const renderMaterialsTable = (materials, type) => {
    const maxMaterials = 10;
    const materialHeaders = [];
    const materialSubHeaders = [];
    const materialData = [];

    for (let i = 1; i <= maxMaterials; i++) {
      materialHeaders.push(
        <th colSpan="4" key={`material-header-${type}-${i}`}>
          Material {i}
        </th>,
      );
      materialSubHeaders.push(
        <React.Fragment key={`material-subheader-${type}-${i}`}>
          <th>Part No</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Sum</th>
        </React.Fragment>,
      );

      const material = materials && materials[i - 1];
      if (material) {
        materialData.push(
          <React.Fragment key={`material-data-${type}-${i}`}>
            <td>{material.partNo}</td>
            <td>{material.qty}</td>
            <td>{material.price}</td>
            <td>{material.sum}</td>
          </React.Fragment>,
        );
      } else {
        materialData.push(
          <React.Fragment key={`material-data-empty-${type}-${i}`}>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </React.Fragment>,
        );
      }
    }

    return (
      <>
        <h5>{type.toUpperCase()}</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-sm" style={{ minWidth: '2000px' }}>
            <thead>
              <tr>{materialHeaders}</tr>
              <tr>{materialSubHeaders}</tr>
            </thead>
            <tbody>
              <tr>{materialData}</tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <tr className="material-cost-detail-row">
      <td colSpan="22">
        <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
          {renderMaterialsTable(part.inner?.materials, 'inner')}
          {renderMaterialsTable(part.outer?.materials, 'outer')}

          {/* LABOR */}
          <h5>LABOR</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th colSpan="13">Man Hour Requirement</th>
                  <th colSpan="3">Labor Cost</th>
                </tr>
                <tr>
                  <th>Receiving</th>
                  <th>Inspection</th>
                  <th>Delivery Course (Pallet)</th>
                  <th>Supply</th>
                  <th>Binding</th>
                  <th>Sorting & Supply</th>
                  <th>Pick & Packing</th>
                  <th>Vanning</th>
                  <th>Box/Valet Return</th>
                  <th>Mix Van</th>
                  <th>Lashing</th>
                  <th>Total Time</th>
                  <th>Requirement</th>
                  <th>Current DL</th>
                  <th>IDL</th>
                  <th>Facility Others</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{part.labor?.manHour?.receiving || '-'}</td>
                  <td>{part.labor?.manHour?.inspection || '-'}</td>
                  <td>{part.labor?.manHour?.deliveryCourse || '-'}</td>
                  <td>{part.labor?.manHour?.supply || '-'}</td>
                  <td>{part.labor?.manHour?.binding || '-'}</td>
                  <td>{part.labor?.manHour?.sortingSupply || '-'}</td>
                  <td>{part.labor?.manHour?.pickPacking || '-'}</td>
                  <td>{part.labor?.manHour?.vanning || '-'}</td>
                  <td>{part.labor?.manHour?.boxValetReturn || '-'}</td>
                  <td>{part.labor?.manHour?.mixVan || '-'}</td>
                  <td>{part.labor?.manHour?.lashing || '-'}</td>
                  <td>{part.labor?.manHour?.totalTime || '-'}</td>
                  <td>{part.labor?.manHour?.requirement || '-'}</td>
                  <td>{part.labor?.laborCost?.currentDl || '-'}</td>
                  <td>{part.labor?.laborCost?.idl || '-'}</td>
                  <td>{part.labor?.laborCost?.facilityOthers || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* INLAND */}
          <h5>INLAND</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Pack Time (V-PASS)</th>
                  <th>Inland Cost</th>
                  <th>Inland Cost M3</th>
                  <th>Diff</th>
                  <th>Milkrun cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{part.inland?.packTime || '-'}</td>
                  <td>{part.inland?.inlandCost || '-'}</td>
                  <td>{part.inland?.inlandCostM3 || '-'}</td>
                  <td>{part.inland?.diff || '-'}</td>
                  <td>{part.inland?.milkrunCost || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MaterialCostDetail;