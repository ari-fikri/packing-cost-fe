import React from 'react';
import {
  MaterialLeafHeaders,
  MaterialLeafCells,
} from './MaterialInfoColumns';

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

  const fmt = (v) => {
    if (v === null || v === undefined || v === "") return "";
    const num = Number(v);
    if (isNaN(num)) return String(v);
    return num.toFixed(2);
  };

  const renderMaterialsTable = (materials, type) => {
    const maxMaterials = 10;
    const materialHeaders = [];
    for (let i = 1; i <= maxMaterials; i++) {
      materialHeaders.push(
        <th colSpan="4" key={`material-header-${type}-${i}`}>
          Material {i}
        </th>,
      );
    }

    return (
      <>
        <h5 style={{ fontSize: '8pt', textAlign: 'left' }}>{type.toUpperCase()}</h5>
        <div className="table-responsive">
          <table
            className="table table-bordered table-sm"
            style={{ minWidth: '2000px' }}
          >
            <thead>
              <tr>{materialHeaders}</tr>
              <tr>
                <MaterialLeafHeaders count={maxMaterials} />
              </tr>
            </thead>
            <tbody>
              <tr>
                <MaterialLeafCells arr={materials} count={maxMaterials} />
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderLaborTable = (labor) => {
    if (!labor) return null;
    return (
      <>
        <h5 style={{ fontSize: '8pt', textAlign: 'left' }}>LABOR</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-sm" style={{ minWidth: '1500px' }}>
            <thead>
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
                <td>{fmt(labor.receiving)}</td>
                <td>{fmt(labor.inspection)}</td>
                <td>{fmt(labor.deliveryCourse)}</td>
                <td>{fmt(labor.supply)}</td>
                <td>{fmt(labor.binding)}</td>
                <td>{fmt(labor.sortingSupply)}</td>
                <td>{fmt(labor.pickPacking)}</td>
                <td>{fmt(labor.vanning)}</td>
                <td>{fmt(labor.boxValetReturn)}</td>
                <td>{fmt(labor.mixVan)}</td>
                <td>{fmt(labor.lashing)}</td>
                <td>{fmt(labor.totalTime)}</td>
                <td>{fmt(labor.requirement)}</td>
                <td>{fmt(labor.currentDL)}</td>
                <td>{fmt(labor.idl)}</td>
                <td>{fmt(labor.facilityOthers)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderInlandTable = (inland) => {
    if (!inland) return null;
    return (
      <>
        <h5 style={{ fontSize: '8pt', textAlign: 'left' }}>INLAND</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-sm" style={{ minWidth: '800px' }}>
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
                <td>{inland.packTime || '-'}</td>
                <td>{fmt(inland.inlandCost) || '-'}</td>
                <td>{fmt(inland.inlandCostM3) || '-'}</td>
                <td>{inland.diff || '-'}</td>
                <td>{fmt(inland.milkrunCost) || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <td colSpan="32">
      <div className="p-2">
        {renderMaterialsTable(part.inner?.materials, 'Inner')}
        {renderMaterialsTable(part.outer?.materials, 'Outer')}
        {renderLaborTable(part.labor)}
        {renderInlandTable(part.inland)}
      </div>
    </td>
  );
};

export default MaterialCostDetail;