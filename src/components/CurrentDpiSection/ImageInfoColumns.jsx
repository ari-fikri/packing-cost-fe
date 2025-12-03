import React, { useState } from 'react';
import { ImageModal } from './ImageModal';

export function ImageInfoHeaders({ checked }) {
  return (
    <>
      {checked.includes('part_image') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Part</th>}
      {checked.includes('packing_image') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Packing</th>}
      {checked.includes('outer_image') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Outer</th>}
      {checked.includes('qkp_image') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Qkp</th>}
      {checked.includes('bkp_image') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Bkp</th>}
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

export function ImageInfoCells({ images, checked }) {
  const { part, packing, outer, qkp, bkp } = images || {};
  return (
    <>
      {checked.includes('part_image') && <td className="align-middle"><ImageViewer files={part?.files} /></td>}
      {checked.includes('packing_image') && <td className="align-middle"><ImageViewer files={packing?.files} /></td>}
      {checked.includes('outer_image') && <td className="align-middle"><ImageViewer files={outer?.files} /></td>}
      {checked.includes('qkp_image') && <td className="align-middle"><ImageViewer files={qkp?.files} /></td>}
      {checked.includes('bkp_image') && <td className="align-middle"><ImageViewer files={bkp?.files} /></td>}
    </>
  );
}