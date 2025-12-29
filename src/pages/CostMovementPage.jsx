import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const formatPercentage = (change) => {
  if (change === 0) return '0.00%';
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

const CostMovementPage = () => {
  const [costData, setCostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch('/costData.json')
      .then(response => response.json())
      .then(data => setCostData(data));
  }, []);

  const totalItems = costData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = costData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container-fluid mt-3">
      <ul className="list-group">
        {paginatedData.map((item, index) => (
          <li key={index} className="list-group-item">
            <div className="row align-items-center">
              <div className="col-md-4">
                <strong>{item.partName}</strong>
                <br />
                <small className="text-muted">{item.partNo}</small>
              </div>
              <div className="col-md-3 text-right">
                <small className="text-muted">Total Cost</small>
                <br />
                {item.totalCost.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}
              </div>
              <div className="col-md-2 text-center">
                <span className={item.change > 0 || item.change < -15 ? 'text-danger' : item.change < 0 ? 'text-success' : 'text-muted'}>
                  {item.change > 0 ? <i className="fas fa-arrow-up"></i> : item.change < 0 ? <i className="fas fa-arrow-down"></i> : ''}
                  {' '}{formatPercentage(item.change)}
                </span>
              </div>
              <div className="col-md-1 text-center">
                {item.change > 15 && (
                  <div>
                    <i className="fas fa-exclamation-triangle" style={{ color: 'red' }} title="Above threshold"></i>
                    <br />
                    <small className="text-muted">Above Threshold</small>
                  </div>
                )}
                {item.change < -15 && (
                  <div>
                    <i className="fas fa-exclamation-triangle" style={{ color: 'red' }} title="Below threshold"></i>
                    <br />
                    <small className="text-muted">Below Threshold</small>
                  </div>
                )}
              </div>
              <div className="col-md-2 text-center">
                <Link to={`/cost-movement/${item.partNo}`} className="btn btn-sm btn-info">
                  Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ position: 'sticky', bottom: 0, background: '#f4f6f9', padding: '1rem 0' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CostMovementPage;