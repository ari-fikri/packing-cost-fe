import React, { useState } from 'react';
import { ImageModal } from './ImageModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!files || files.length === 0) {
    return '-';
  }

  const imageUrl = files[0];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <img
        src={imageUrl}
        alt="thumbnail"
        style={{ width: '50px', height: 'auto', cursor: 'pointer' }}
        onClick={openModal}
      />
      <ImageModal imageUrl={imageUrl} isOpen={isModalOpen} onClose={closeModal} />
    </>
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