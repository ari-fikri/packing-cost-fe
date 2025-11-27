import React from 'react';
import {
  InnerGroupHeaders,
  InnerLeafHeaders,
  InnerLeafCells,
} from "../../../components/CurrentDpiSection/InnerInfoColumns";
import {
  OuterGroupHeaders,
  OuterLeafHeaders,
  OuterLeafCells,
} from "../../../components/CurrentDpiSection/OuterInfoColumns";
import {
  MainInfoHeaders,
  MainInfoCells,
} from "../../../components/CurrentDpiSection/MainInfoColumns";
import {
  PartInfoHeaders,
  PartInfoCells,
} from "../../../components/CurrentDpiSection/PartInfoColumns";
import {
  PseInfoHeaders,
  PseInfoSubHeaders,
  PseInfoCells,
} from "../../../components/CurrentDpiSection/PseInfoColumns";
import {
  LogisticInfoHeaders,
  LogisticInfoCells,
} from "../../../components/CurrentDpiSection/LogisticInfoColumns";
import {
  ImageInfoHeaders,
  ImageInfoCells,
} from "../../../components/CurrentDpiSection/ImageInfoColumns";
import {
  SubTotalHeaders,
  SubTotalData,
} from "../../../components/CurrentCpsSection/SubTotalColumns";
import {
  LaborManHourHeaders,
  LaborCostHeaders,
  LaborManHourCells,
  LaborCostCells,
} from "../../../components/CurrentCpsSection/LaborInfoColumns";
import {
  InlandLeafHeaders,
  InlandLeafCells,
} from "../../../components/CurrentCpsSection/InlandColumns";

export default function ResultSection({
  rows,
  visibleRows,
  page,
  perPage,
  total,
  totalPages,
  goToPage,
  setPerPage,
  checked,
}) {
  //debugger;
  const firstRowCps = visibleRows[0]?.cps || {};
  // const innerCount = firstRowCps.innerMaterials?.length || 1;
  const innerCount = firstRowCps.packing?.inner?.length || 1;
  const outerCount = firstRowCps.packing?.outer?.length || 1;
  // const outerCount = firstRowCps.outerMaterials?.length || 1;

  const partInfoChildren = [
    'part_no_part', 'part_name', 'parent_part', 'supplier_code', 'supplier_name',
    'part_status', 'dtl_part_status', 'pack_spec_status', 'weight_pc', 'qty_box'
  ];
  const partInfoColSpan = partInfoChildren.filter(child => checked.includes(child)).length;
  const showPartInfoHeader = partInfoColSpan > 0;

  const pseInfoChildren = [
    'packing_plant_current', 'packing_plant_next', 'vanning_plant_current', 'vanning_plant_next',
    'order_pattern_current', 'order_pattern_next', 'katashiiki_ad', 'katashiiki_au', 'katashiiki_af',
    'katashiiki_ax', 'importer_line_process', 'case_code', 'box_number', 'renban', 'renban_eff',
    'packing_process_boxing', 'packing_process_stacking'
  ];
  const pseInfoColSpan = pseInfoChildren.filter(child => checked.includes(child)).length;
  const showPseInfoHeader = pseInfoColSpan > 0;

  const logisticInfoChildren = ['dock_code', 'address', 'process_type'];
  const logisticInfoColSpan = logisticInfoChildren.filter(child => checked.includes(child)).length;
  const showLogisticInfoHeader = logisticInfoColSpan > 0;

  const imageInfoChildren = ['part_image', 'packing_image', 'outer_image', 'qkp_image', 'bkp_image'];
  const imageInfoColSpan = imageInfoChildren.filter(child => checked.includes(child)).length;
  const showImageInfoHeader = imageInfoColSpan > 0;

  return (
    <>
      {/* small spacer */}
      <div className="mb-2" />

      {/* Table */}
      <div
        className="table-responsive mt-2"
        style={{ overflowX: "auto", overflowY: "hidden" }}
      >
        <table
          className="table table-sm table-bordered mb-0 text-center"
          style={{ tableLayout: "fixed", width: "auto" }}
        >
          <thead style={{ fontSize: '8pt' }}>
            <tr>
              <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">No</th>
              <MainInfoHeaders checked={checked} />
              {showPartInfoHeader && <th colSpan={partInfoColSpan} className="align-middle border text-center tbl-row1-hdr text-nowrap">Part Information</th>}
              {showPseInfoHeader && <th colSpan={pseInfoColSpan} className="align-middle border text-center tbl-row1-hdr text-nowrap">PSE Information</th>}
              {showLogisticInfoHeader && <th colSpan={logisticInfoColSpan} className="align-middle border text-center tbl-row1-hdr text-nowrap">Logistic Information</th>}
              {showImageInfoHeader && <th colSpan={imageInfoColSpan} className="align-middle border text-center tbl-row1-hdr text-nowrap">Images</th>}
              <th colSpan={innerCount > 0 ? innerCount * 2 + 6 : 0} className="align-middle border text-center tbl-row1-hdr text-nowrap">Inner Materials</th>
              <th colSpan={outerCount > 0 ? outerCount * 2 + 6 : 0} className="align-middle border text-center tbl-row1-hdr text-nowrap\">Outer Materials</th>
            </tr>
            <tr>
              <PartInfoHeaders checked={checked} />
              <PseInfoHeaders checked={checked} />
              <LogisticInfoHeaders checked={checked} />
              <ImageInfoHeaders checked={checked} />
              <InnerGroupHeaders count={innerCount} />
              <OuterGroupHeaders count={outerCount} />
            </tr>
            <tr>
              <PseInfoSubHeaders checked={checked} />
              <InnerLeafHeaders count={innerCount} />
              <OuterLeafHeaders count={outerCount} />
            </tr>
          </thead>
          <tbody style={{ fontSize: '8pt' }}>
            {visibleRows.map((row, i) => {
              //debugger;              
              const current = row.cps || {};
              const pseInfo = current.pse_info || {};
              const logisticInfo = current.logistic_info || {};
              const images = current.images || {};
              const innerData = current.packing?.inner || [];
              const outerData = current.packing?.outer || [];
              const labor = current.labor || {};
              const inland = current.inland || {};
              return (
                <tr key={i}>
                  <td>{((page - 1) * perPage) + i + 1}</td>
                  <MainInfoCells mainInfo={row} checked={checked} />
                  <PartInfoCells partInfo={current} checked={checked} />
                  <PseInfoCells pseInfo={pseInfo} checked={checked} />
                  <LogisticInfoCells logisticInfo={logisticInfo} checked={checked} />
                  <ImageInfoCells images={images} checked={checked} />
                  <InnerLeafCells data={innerData} count={innerCount} />
                  <OuterLeafCells data={outerData} count={outerCount} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{'<<'}</button>
          <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{'<'}</button>
          {[...Array(totalPages).keys()].map(n => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm mr-1 ${page === n + 1 ? 'btn-primary' : 'btn-light'}`}
              onClick={() => goToPage(n + 1)}
            >
              {n + 1}
            </button>
          ))}
          <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(totalPages, page + 1))}>{'>'}</button>
        </div>

        <div className="form-inline small">
          <span className="mr-3">Total: {total}</span>

          <div className="dropdown mr-2">
            <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
              {perPage} per page
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(10); goToPage(1); }}>10</button>
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(25); goToPage(1); }}>25</button>
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(50); goToPage(1); }}>50</button>
            </div>
          </div>

          <i className="fas fa-chevron-down" />
        </div>
      </div>
    </>
  );
}