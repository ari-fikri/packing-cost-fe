import React, { useRef } from "react";

export default function ImagesSection(props) {
  const {
    imagesOpen,
    setImagesOpen,
    imagesPart,
    setImagesPart,
    imagesPacking,
    setImagesPacking,
    imagesOuter,
    setImagesOuter,
    imagesQkp,
    setImagesQkp,
    imagesBkp,
    setImagesBkp,
  } = props;

  // Allowed image types
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  // Handler for file selection
  const handleFileSelect = (setter) => (e) => {
    const files = Array.from(e.target.files);
    let hasInvalid = false;
    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        setter((prev) => [...prev, { caption: file.name, file }]);
      } else {
        hasInvalid = true;
      }
    });
    if (hasInvalid) {
      window.alert("File format is not supported. Only JPG, JPEG, PNG are allowed.");
    }
    e.target.value = ""; // reset input
  };

  return (
    <div>
      {/* Images sections (collapsible) */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => setImagesOpen((v) => !v)}
          aria-expanded={imagesOpen}
          aria-controls="imagesSection"
        >
          <strong>
            <i
              className={`fas ${
                imagesOpen ? "fa-chevron-down" : "fa-chevron-right"
              } mr-2`}
            />
            Images
          </strong>
        </button>
        {imagesOpen && (
          <div id="imagesSection">
            <div className="row mt-2">
              {/* Part Images */}
              <div className="col-md-6">
                <label className="small">Part Images</label>
                <div className="border p-2 mb-2">
                  {imagesPart.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesPart.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <label
                      htmlFor="part-image-input"
                      className="btn btn-sm btn-outline-primary mr-2"
                    >
                      + Add
                    </label>
                    <input
                      type="file"
                      id="part-image-input"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileSelect(setImagesPart)}
                    />
                  </div>
                </div>
              </div>
              {/* Packing Images */}
              <div className="col-md-6">
                <label className="small">Packing Images</label>
                <div className="border p-2 mb-2">
                  {imagesPacking.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesPacking.map((it, i) => (
                      <div key={i}>{it.caption}</div>
                    ))
                  )}
                  <div className="mt-2">
                    <label
                      htmlFor="packing-image-input"
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add
                    </label>
                    <input
                      type="file"
                      id="packing-image-input"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileSelect(setImagesPacking)}
                    />
                  </div>
                </div>
              </div>
              {/* Outer Images */}
              <div className="col-md-6 mt-2">
                <label className="small">Outer Images</label>
                <div className="border p-2 mb-2">
                  {imagesOuter.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesOuter.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <label
                      htmlFor="outer-image-input"
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add
                    </label>
                    <input
                      type="file"
                      id="outer-image-input"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileSelect(setImagesOuter)}
                    />
                  </div>
                </div>
              </div>
              {/* QKP Images */}
              <div className="col-md-6 mt-2">
                <label className="small">QKP Images</label>
                <div className="border p-2 mb-2">
                  {imagesQkp.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesQkp.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <label
                      htmlFor="qkp-image-input"
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add
                    </label>
                    <input
                      type="file"
                      id="qkp-image-input"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileSelect(setImagesQkp)}
                    />
                  </div>
                </div>
              </div>
              {/* BKP Images */}
              <div className="col-md-6 mt-2">
                <label className="small">BKP Images</label>
                <div className="border p-2 mb-2">
                  {imagesBkp.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesBkp.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <label
                      htmlFor="bkp-image-input"
                      className="btn btn-sm btn-outline-primary"
                    >
                      + Add
                    </label>
                    <input
                      type="file"
                      id="bkp-image-input"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileSelect(setImagesBkp)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
