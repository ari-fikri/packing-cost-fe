import React, { useState } from 'react';
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
  const [expandedSections, setExpandedSections] = useState({
    inner: true,
    outer: true,
    labor: true,
    inland: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
    const lowerCaseType = type.toLowerCase();
    const isExpanded = expandedSections[lowerCaseType];
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
        <h5 style={{ fontSize: '8pt', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => toggleSection(lowerCaseType)}>
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`}></i>
          {type.toUpperCase()}
        </h5>
        {isExpanded && (
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
        )}
      </>
    );
  };

  const renderLaborTable = (labor) => {
    const isExpanded = expandedSections.labor;
    if (!labor) return null;
    return (
      <>
        <h5 style={{ fontSize: '8pt', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => toggleSection('labor')}>
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`}></i>
          LABOR
        </h5>
        {isExpanded && (
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
        )}
      </>
    );
  };

  const renderInlandTable = (inland) => {
    const isExpanded = expandedSections.inland;
    if (!inland) return null;
    return (
      <>
        <h5 style={{ fontSize: '8pt', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => toggleSection('inland')}>
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`}></i>
          INLAND
        </h5>
        {isExpanded && (
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
        )}
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