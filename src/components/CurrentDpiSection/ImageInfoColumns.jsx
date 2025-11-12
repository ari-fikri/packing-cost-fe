import React from 'react';

export function ImageInfoHeaders() {
  return (
    <>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Part</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Packing</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Outer</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Qkp</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Bkp</th>
    </>
  );
}

function ImageViewer({ files }) {
  if (!files || files.length === 0) {
    return '-';
  }
  // In a real app, you might open a modal with the image
  return (
    <a href={files[0]} target="_blank" rel="noopener noreferrer">
      <img src={files[0]} alt="thumbnail" style={{ width: '50px', height: 'auto' }} />
    </a>
  );
}

export function ImageInfoCells({ images }) {
  const { part, packing, outer, qkp, bkp } = images || {};
  return (
    <>
      <td className="align-middle"><ImageViewer files={part?.files} /></td>
      <td className="align-middle"><ImageViewer files={packing?.files} /></td>
      <td className="align-middle"><ImageViewer files={outer?.files} /></td>
      <td className="align-middle"><ImageViewer files={qkp?.files} /></td>
      <td className="align-middle"><ImageViewer files={bkp?.files} /></td>
    </>
  );
}