import React, { useState } from 'react';
import { ImageModal } from './ImageModal';

export function ImageInfoHeaders({ visibleColumns }) {
  return (
    <>
      {visibleColumns.partImage && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Part</th>}
      {visibleColumns.packingImage && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Packing</th>}
      {visibleColumns.outerImage && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Outer</th>}
      {visibleColumns.qkpImage && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Qkp</th>}
      {visibleColumns.bkpImage && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Bkp</th>}
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

export function ImageInfoCells({ images, visibleColumns }) {
  const { part, packing, outer, qkp, bkp } = images || {};
  return (
    <>
      {visibleColumns.partImage && <td className="align-middle"><ImageViewer files={part?.files} /></td>}
      {visibleColumns.packingImage && <td className="align-middle"><ImageViewer files={packing?.files} /></td>}
      {visibleColumns.outerImage && <td className="align-middle"><ImageViewer files={outer?.files} /></td>}
      {visibleColumns.qkpImage && <td className="align-middle"><ImageViewer files={qkp?.files} /></td>}
      {visibleColumns.bkpImage && <td className="align-middle"><ImageViewer files={bkp?.files} /></td>}
    </>
  );
}