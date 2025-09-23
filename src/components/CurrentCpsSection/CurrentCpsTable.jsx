// src/components/CurrentCpsSection/CurrentCpsTable.jsx
import React from 'react';
import { PartInfoHeader, PartInfoData } from './PartInfoColumns';
import { SubTotalHeader, SubTotalData } from './SubTotalColumns';
import { InnerInfoHeader, InnerMaterialsGroupHeaders, InnerInfoSubHeaders, InnerInfoData } from './InnerInfoColumns';
import { OuterInfoColumns } from './OuterInfoColumns';  // similar to Inner
import { LaborHeader, LaborSubHeaders, LaborData } from './LaborColumns';
import { InlandColumns } from './InlandColumns';         // you will create similar file
// import other needed files

export default function CurrentCpsTable({ current }) {
  const innerMaterials = current.innerMaterials || [];
  const outerMaterials = current.outerMaterials || [];
  const labor = current.labor || {};
  const inland = current.inland || {};

  return (
    <div className="table-responsive" style={{ overflowX: 'auto' }}>
      <table className="table table-sm table-bordered mb-0 text-center align-middle" style={{ minWidth: '1600px' }}>
        <thead>
          <tr>
            <th rowSpan="4">Rec No</th>
            <th rowSpan="4">CPS No</th>
            <PartInfoHeader />
            <SubTotalHeader />
            <th rowSpan="4">Diff (%)</th>
            <InnerInfoHeader innerMaterials={innerMaterials} />
            <OuterInfoColumns.Header outerMaterials={outerMaterials} />
            <LaborHeader />
            <InlandColumns.Header />
          </tr>

          <tr>
            {/* second header level */}
            {/* PartInfo has no second level, so skip that here */}
            {/* SubTotal same */}
            {/* Diff same */}
            <InnerMaterialsGroupHeaders innerMaterials={innerMaterials} />
            <OuterInfoColumns.MaterialGroupHeaders outerMaterials={outerMaterials} />
            <LaborSubHeaders />
            <InlandColumns.SubHeaders />
          </tr>

          <tr>
            {/* third header level */}
            <PartInfoColumns.PartInfoHeader /* or separate file */ />
            {/* SubTotal no subheaders */}
            {/* etc */}
            <InnerInfoColumns.InnerInfoSubHeaders innerMaterials={innerMaterials} />
            <OuterInfoColumns.OuterInfoSubHeaders outerMaterials={outerMaterials} />
            {/* maybe Labor has subheaders */}
            <LaborColumns.LaborSubHeaders />
            <InlandColumns.InlandSubHeaders />
          </tr>

          <tr>
            {/* fourth header (if needed) */}
            {/* similar structure, often duplicate of 3rd if no further subdivision */}
            <InnerInfoColumns.InnerInfoSubHeaders innerMaterials={innerMaterials} />
            <OuterInfoColumns.OuterInfoSubHeaders outerMaterials={outerMaterials} />
            {/* etc */}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{current.recNo}</td>
            <td>{current.cpsNo}</td>
            <PartInfoData current={current} />
            <SubTotalData current={current} />
            <td>{current.diffPct}</td>
            <InnerInfoData innerMaterials={innerMaterials} />
            <OuterInfoColumns.OuterInfoData outerMaterials={outerMaterials} />
            <LaborData labor={labor} />
            <InlandColumns.InlandData inland={inland} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
