import React, { useState, useEffect } from 'react';
import Page from '../../../components/Page';
import { Container, Row, Col } from 'reactstrap';
import SearchSection from './SearchSection';
import ResultSection from './ResultSection';
import ActionHeaderButtons from './ActionHeaderButtons';
import dpiData from '../../../data/dpi.json';
import ColumnSelectionModal from '../../../components/ColumnSelectionModal';
import { columnsConfig, initialVisibleColumns } from './columnsConfig';

export default function DpiComparison() {
  const [rows, setRows] = useState([]);
  const [visibleRows, setVisibleRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

  const [modelCode, setModelCode] = useState('');
  const [destCode, setDestCode] = useState('');
  const [partNo, setPartNo] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [cpsNo, setCpsNo] = useState('');
  const [implementationPeriod, setImplementationPeriod] = useState('');

  const goToPage = (page, currentRows) => {
    setPage(page);
    const start = (page - 1) * perPage;
    const end = start + perPage;
    setVisibleRows((currentRows || rows).slice(start, end));
  };

  const onSearch = () => {
    console.log("Search triggered in index.jsx");
    const filteredRows = dpiData.filter(row => {
      const cps = row.cps || {};
      return (
        (modelCode ? (cps.modelCode || '').includes(modelCode) : true) &&
        (destCode ? (cps.destCode || '').includes(destCode) : true) &&
        (partNo ? (cps.partNo || '').includes(partNo) : true) &&
        (supplierCode ? (cps.supplierCode || '').includes(supplierCode) : true) &&
        (cpsNo ? (cps.cpsNo || '').includes(cpsNo) : true) &&
        (implementationPeriod ? (cps.implementationPeriod || '').includes(implementationPeriod) : true)
      );
    });
    setRows(filteredRows);
    setTotal(filteredRows.length);
    setTotalPages(Math.ceil(filteredRows.length / perPage));
    goToPage(1, filteredRows);
  };

  const onClear = () =>
  {
    setModelCode('');
    setDestCode('');
    setPartNo('');
    setSupplierCode('');
    setCpsNo('');
    setImplementationPeriod('');
    setRows([]);
    setVisibleRows([]);
    setTotal(0);
    setTotalPages(0);
    setPage(1);
  };

  useEffect(() => {
    onClear();
  }, []);

  const filters = { modelCode, destCode, partNo, supplierCode, cpsNo, implementationPeriod };
  const setters = { setModelCode, setDestCode, setPartNo, setSupplierCode, setCpsNo, setImplementationPeriod };

  return (
    <Page
      title="DPI Comparison"
      heading="DPI Comparison"
      showDate
      right={<ActionHeaderButtons onToggleColumnSelector={() => setShowColumnSelector(true)} />}
    >
      <Container fluid>
        <Row>
          <Col>
            <SearchSection
              filters={filters}
              setters={setters}
              onSearch={onSearch}
              onClear={onClear}
            />
            <ResultSection
              rows={rows}
              visibleRows={visibleRows}
              page={page}
              perPage={perPage}
              total={total}
              totalPages={totalPages}
              goToPage={goToPage}
              setPerPage={setPerPage}
              visibleColumns={visibleColumns}
            />
          </Col>
        </Row>
      </Container>
      <ColumnSelectionModal
        isOpen={showColumnSelector}
        toggle={() => setShowColumnSelector(false)}
        columnsConfig={columnsConfig}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />
    </Page>
  );
}