import React from 'react';
import PackingInnerSection from './PackingInnerSection';

export default function PackingSection(props) {
  const { packingOpen, setPackingOpen } = props;

  return (
    <div>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-sm btn-link p-0 section-header"
          onClick={() => setPackingOpen((v) => !v)}
          aria-expanded={packingOpen}
          aria-controls="packingSection"
        >
          <strong>
            <i
              className={`fas ${
                packingOpen ? "fa-chevron-down" : "fa-chevron-right"
              } mr-2`}
            />
            Packing
          </strong>
        </button>
        {packingOpen && (
          <div id="packingSection">
            <PackingInnerSection {...props} />
          </div>
        )}
      </div>
    </div>
  );
}