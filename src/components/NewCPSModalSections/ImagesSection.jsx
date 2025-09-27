import React from "react";

export default function ImagesSection(props) {
  // Destructure props as needed
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
              <div className="col-md-6">
                <label className="small">Part Images</label>
                <div className="border p-2 mb-2">
                  {imagesPart.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesPart.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary mr-2"
                      onClick={() => {
                        const caption = prompt("Image caption");
                        if (caption) setImagesPart((p) => [...p, { caption }]);
                      }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

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
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        const caption = prompt("Image caption");
                        if (caption)
                          setImagesPacking((p) => [...p, { caption }]);
                      }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-2">
                <label className="small">Outer Images</label>
                <div className="border p-2 mb-2">
                  {imagesOuter.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesOuter.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        const caption = prompt("Image caption");
                        if (caption) setImagesOuter((p) => [...p, { caption }]);
                      }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-2">
                <label className="small">QKP Images</label>
                <div className="border p-2 mb-2">
                  {imagesQkp.length === 0 ? (
                    <div className="text-muted">No images</div>
                  ) : (
                    imagesQkp.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        const caption = prompt("Image caption");
                        if (caption) setImagesQkp((p) => [...p, { caption }]);
                      }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-2">
                <label className="small">BKP Images</label>
                <div className="border p-2 mb-2">
                  {imagesBkp.length === 0 ? (
                    <div className="text-muted">No. images</div>
                  ) : (
                    imagesBkp.map((it, i) => <div key={i}>{it.caption}</div>)
                  )}
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        const caption = prompt("Image caption");
                        if (caption) setImagesBkp((p) => [...p, { caption }]);
                      }}
                    >
                      + Add
                    </button>
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
