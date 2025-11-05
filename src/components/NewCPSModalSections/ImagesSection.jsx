import React, { useMemo, useEffect, useState } from "react";

const Thumbnail = React.memo(({ file }) => {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [src]);

  return (
    <img
      src={src}
      alt="thumbnail"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
});

const ImageGroup = React.memo(
  ({ title, id, imageState, onFilesSelect, onCaptionChange, onRemoveImage }) => {
    const [caption, setCaption] = useState(imageState.caption);

    useEffect(() => {
      setCaption(imageState.caption);
    }, [imageState.caption]);

    const handleCaptionBlur = () => {
      if (caption !== imageState.caption) {
        onCaptionChange(caption);
      }
    };

    return (
      <div className="col-md-6 mb-3">
        <label className="small font-weight-bold">{title}</label>
        <div className="border p-2">
          {imageState.files.length > 0 && (
            <div className="d-flex flex-wrap mb-2">
              {imageState.files.map((file, i) => (
                <div
                  key={`${file.name}-${file.lastModified}-${i}`}
                  className="m-1 position-relative"
                  style={{ width: 50, height: 50 }}
                >
                  <Thumbnail file={file} />
                  <button
                    className="btn btn-xs btn-danger position-absolute"
                    style={{
                      top: "-5px",
                      right: "-5px",
                      width: "20px",
                      height: "20px",
                      lineHeight: "1",
                      fontSize: "0.75rem",
                      padding: 0,
                    }}
                    onClick={() => onRemoveImage(i)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            className="form-control form-control-sm"
            placeholder="Add a caption for this group..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={handleCaptionBlur}
            rows="3"
          />
          <div className="mt-2">
            <label
              htmlFor={`${id}-image-input`}
              className="btn btn-sm btn-outline-primary mr-2"
            >
              + Add Images
            </label>
            <input
              type="file"
              id={`${id}-image-input`}
              accept=".jpg,.jpeg,.png"
              multiple
              style={{ display: "none" }}
              onChange={onFilesSelect}
            />
          </div>
        </div>
      </div>
    );
  }
);

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

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const handleFileSelect = (setter) => (e) => {
    const files = Array.from(e.target.files);
    let hasInvalid = false;
    const allowedFiles = [];
    files.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        allowedFiles.push(file);
      } else {
        hasInvalid = true;
      }
    });

    if (allowedFiles.length > 0) {
      setter((prev) => ({ ...prev, files: [...prev.files, ...allowedFiles] }));
    }

    if (hasInvalid) {
      window.alert(
        "File format is not supported. Only JPG, JPEG, PNG are allowed."
      );
    }
    e.target.value = ""; // reset input
  };

  const handleCaptionChange = (setter) => (newCaption) => {
    setter((prev) => ({ ...prev, caption: newCaption }));
  };

  const handleRemoveImage = (setter, index) => {
    setter((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
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
              <ImageGroup
                title="Part Images"
                id="part"
                imageState={imagesPart}
                onFilesSelect={handleFileSelect(setImagesPart)}
                onCaptionChange={handleCaptionChange(setImagesPart)}
                onRemoveImage={(index) =>
                  handleRemoveImage(setImagesPart, index)
                }
              />
              <ImageGroup
                title="Packing Images"
                id="packing"
                imageState={imagesPacking}
                onFilesSelect={handleFileSelect(setImagesPacking)}
                onCaptionChange={handleCaptionChange(setImagesPacking)}
                onRemoveImage={(index) =>
                  handleRemoveImage(setImagesPacking, index)
                }
              />
              <ImageGroup
                title="Outer Images"
                id="outer"
                imageState={imagesOuter}
                onFilesSelect={handleFileSelect(setImagesOuter)}
                onCaptionChange={handleCaptionChange(setImagesOuter)}
                onRemoveImage={(index) =>
                  handleRemoveImage(setImagesOuter, index)
                }
              />
              <ImageGroup
                title="QKP Images"
                id="qkp"
                imageState={imagesQkp}
                onFilesSelect={handleFileSelect(setImagesQkp)}
                onCaptionChange={handleCaptionChange(setImagesQkp)}
                onRemoveImage={(index) => handleRemoveImage(setImagesQkp, index)}
              />
              <ImageGroup
                title="BKP Images"
                id="bkp"
                imageState={imagesBkp}
                onFilesSelect={handleFileSelect(setImagesBkp)}
                onCaptionChange={handleCaptionChange(setImagesBkp)}
                onRemoveImage={(index) => handleRemoveImage(setImagesBkp, index)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}