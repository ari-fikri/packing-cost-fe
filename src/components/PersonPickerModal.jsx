import React, { useState } from 'react'

const MOCK_PERSONS = [
  { userId: '12345', name: 'Rollin Khaider', dept: 'PSE', role: 'Dept Head' },
  { userId: '22345', name: 'Asep Sumarna', dept: 'PPM', role: 'Section Head' },
  { userId: '32345', name: 'Khalil Gibran', dept: 'PSE', role: 'Staff' },
  { userId: '42345', name: 'Jaka T. Mulyo', dept: 'PCD', role: 'Staff' },
  { userId: '52345', name: 'W.H. Jeanette', dept: 'PPM', role: 'Staff' },
]

export default function PersonPickerModal({ show = false, onClose, onSelect }) {
  const [filters, setFilters] = useState({ userId: '', name: '', dept: '', role: '' })
  const [selected, setSelected] = useState(null)

  if (!show) return null

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleClear = () => setFilters({ userId: '', name: '', dept: '', role: '' })

  const filtered = MOCK_PERSONS.filter(p =>
    (!filters.userId || p.userId.includes(filters.userId)) &&
    (!filters.name || p.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.dept || p.dept.toLowerCase().includes(filters.dept.toLowerCase())) &&
    (!filters.role || p.role.toLowerCase().includes(filters.role.toLowerCase()))
  )

  return (
    <div className="np-modal-backdrop" style={{ zIndex: 3000 }}>
      <div className="np-modal card card-outline card-info" style={{ maxWidth: 600 }}>
        <div className="card-header d-flex align-items-center">
          <h5 className="card-title mb-0" style={{ fontSize: 20 }}>
            <b>Select a Person</b>
          </h5>
          <button className="btn btn-tool ml-auto" onClick={onClose}>
            <span style={{ fontSize: 25 }}>&times;</span>
          </button>
        </div>
        <div className="card-body pb-2">
          <div className="form-row align-items-end">
            <div className="form-group col-md-3">
              <label className="small mb-1">User Id</label>
              <input
                name="userId"
                className="form-control form-control-sm"
                value={filters.userId}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label className="small mb-1">Name</label>
              <input
                name="name"
                className="form-control form-control-sm"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label className="small mb-1">Dept</label>
              <input
                name="dept"
                className="form-control form-control-sm"
                value={filters.dept}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label className="small mb-1">Role</label>
              <div className="input-group input-group-sm">
                <input
                  name="role"
                  className="form-control form-control-sm"
                  value={filters.role}
                  onChange={handleFilterChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary btn-sm" type="button">
                    <i className="fas fa-search" />
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleClear}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: 260, overflowY: 'auto' }}>
            <table className="table table-sm table-bordered mb-2">
              <thead>
                <tr>
                  <th style={{ width: 30 }}></th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Dept</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">No Data Found</td>
                  </tr>
                ) : (
                  filtered.map((p, idx) => (
                    <tr key={p.userId}>
                      <td>
                        <input
                          type="radio"
                          checked={selected === p.userId}
                          onChange={() => setSelected(p.userId)}
                        />
                      </td>
                      <td>{p.userId}</td>
                      <td>{p.name}</td>
                      <td>{p.dept}</td>
                      <td>{p.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-right">
          <button
            className="btn btn-success"
            disabled={!selected}
            onClick={() => {
              const person = MOCK_PERSONS.find(p => p.userId === selected)
              if (person && onSelect) onSelect(person)
              onClose && onClose()
            }}
          >
            <i className="fas fa-check mr-1" /> Select
          </button>
        </div>
      </div>
      <style>{`
        .np-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .np-modal { width: 100%; z-index: 3001; }
        .table-sm td, .table-sm th { vertical-align: middle; }
      `}</style>
    </div>
  )
}