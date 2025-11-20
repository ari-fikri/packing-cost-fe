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
        <h5 style={{ fontSize: '8pt', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#f7fbff' }} onClick={() => toggleSection(lowerCaseType)}>
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`}></i>
          {type.toUpperCase()}
        </h5>
        {isExpanded && (
          <div className="table-responsive">
            <table
              className="table table-bordered table-sm"
              style={{ minWidth: '2000px' }}
            >
              <thead style={{ backgroundColor: '#e9ecef' }}>
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

  const renderLaborTable = (manhour, labor) => {
    const isExpanded = expandedSections.labor;
    if (!manhour || !labor) return null;
    return (
      <>
        <h5 style={{ fontSize: '8pt', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#f7fbff' }} onClick={() => toggleSection('labor')}>
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`}></i>
          LABOR
        </h5>
        {isExpanded && (
          <div className="table-responsive">
            <table className="table table-bordered table-sm" style={{ minWidth: '1500px' }}>
              <thead style={{ backgroundColor: '#e9ecef' }}>
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
                  <td>{fmt(manhour.receiving)}</td>
                  <td>{fmt(manhour.inspection)}</td>
                  <td>{fmt(manhour.deliveryCourse)}</td>
                  <td>{fmt(manhour.supply)}</td>
                  <td>{fmt(manhour.binding)}</td>
                  <td>{fmt(manhour.sortingSupply)}</td>
                  <td>{fmt(manhour.pickPacking)}</td>
                  <td>{fmt(manhour.vanning)}</td>
                  <td>{fmt(manhour.boxValetReturn)}</td>
                  <td>{fmt(manhour.mixVan)}</td>
                  <td>{fmt(manhour.lashing)}</td>
                  <td>{fmt(manhour.totalTime)}</td>
                  <td>{fmt(manhour.requirement)}</td>
                  <td>{fmt(manhour.currentDL)}</td>
                  <td>{fmt(labor.idl)}</td>
                  <td>{fmt(labor.facility)}</td>
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
        <h5 style={{ fontSize: '8pt', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#f7fbff' }} onClick={() => toggleSection('inland')}>
          <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} mr-2`}></i>
          INLAND
        </h5>
        {isExpanded && (
          <div className="table-responsive">
            <table className="table table-bordered table-sm" style={{ minWidth: '800px' }}>
              <thead style={{ backgroundColor: '#e9ecef' }}>
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
                  <td>{inland.packing_time || '-'}</td>
                  <td>{fmt(inland.inland_cost) || '-'}</td>
                  <td>{fmt(inland.inlandCostM3) || '-'}</td>
                  <td>{inland.diff || '-'}</td>
                  <td>{fmt(inland.milkrun_cost) || '-'}</td>
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
        {renderMaterialsTable(part.cps?.packing?.inner, 'Inner')}
        {renderMaterialsTable(part.cps?.packing?.outer, 'Outer')}
        {renderLaborTable(part.cps?.manhour, part.cps?.labor)}
        {renderInlandTable(part.cps?.inland)}
      </div>
    </td>
  );
};

export default MaterialCostDetail;