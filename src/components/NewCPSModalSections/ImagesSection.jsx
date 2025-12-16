import React, { useState, useEffect, useCallback } from 'react';

const Thumbnail = React.memo(({ file, index, onRemove }) => {
    const [thumb, setThumb] = useState(null);

    useEffect(() => {
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setThumb(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleRemove = useCallback(() => {
        onRemove(index);
    }, [index, onRemove]);

    if (!thumb) {
        return null;
    }

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginRight: '10px', marginBottom: '10px' }}>
            <img src={thumb} alt={file.name} className="border" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <button
                onClick={handleRemove}
                className="btn btn-danger btn-sm"
                style={{ position: 'absolute', top: '0', right: '0', borderRadius: '50%', width: '24px', height: '24px', lineHeight: '1', padding: '0' }}
            >
                &times;
            </button>
        </div>
    );
});

const ImagesSection = ({
    config,
    imagesPart, setImagesPart,
    imagesPacking, setImagesPacking,
    imagesOuter, setImagesOuter,
    imagesQkp, setImagesQkp,
    imagesBkp, setImagesBkp,
    imagesOpen, setImagesOpen,
}) => {

    const createCaptionChangeHandler = (setter) => (e) => {
        const caption = e.target.value;
        setter(prev => ({ ...prev, caption }));
    };

    const createFilesChangeHandler = (setter) => (e) => {
        const newFiles = Array.from(e.target.files);
        if (newFiles.length > 0) {
            setter(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
        }
    };

    const createRemoveImageHandler = (setter) => (index) => {
        setter(prev => {
            const newFiles = [...prev.files];
            newFiles.splice(index, 1);
            return { ...prev, files: newFiles };
        });
    };

    const imageGroups = [
        { id: 'part', title: 'Part Images', state: imagesPart, setter: setImagesPart },
        { id: 'packing', title: 'Packing Images', state: imagesPacking, setter: setImagesPacking },
        { id: 'outer', title: 'Outer Images', state: imagesOuter, setter: setImagesOuter },
        { id: 'qkp', title: 'QKP Images', state: imagesQkp, setter: setImagesQkp },
        { id: 'bkp', title: 'BKP Images', state: imagesBkp, setter: setImagesBkp },
    ];

    return (
        <div className="mb-3">
            <button
                type="button"
                className="btn btn-sm btn-link p-0 section-header"
                onClick={() => setImagesOpen((v) => !v)}
                aria-expanded={imagesOpen}
                aria-controls="imagesSection"
            >
                <strong>
                    <i
                        className={`fas ${imagesOpen ? "fa-chevron-down" : "fa-chevron-right"} mr-2`}
                    />
                    Images
                </strong>
            </button>
            {imagesOpen && (
                <div id="imagesSection">
                    <div className="row mt-2">
                        {imageGroups.map(({ id, title, state, setter }) => (
                            <div className="col-md-6 mt-2" key={id}>
                                <label className="small">{title}</label>
                                <div className="border p-2 mb-2">
                                    <textarea
                                        value={state.caption}
                                        onChange={createCaptionChangeHandler(setter)}
                                        placeholder="Enter a caption..."
                                        rows="2"
                                        className="form-control mb-2"
                                        disabled={!config.editable}
                                    />
                                    <div className="d-flex flex-wrap">
                                        {state.files.length === 0 ? (
                                            <div className="text-muted small">No images</div>
                                        ) : (
                                            state.files.map((file, i) => (
                                                <Thumbnail
                                                    key={`${file.name}-${file.lastModified}-${i}`}
                                                    file={file}
                                                    index={i}
                                                    onRemove={createRemoveImageHandler(setter)}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor={`${id}-image-input`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            + Add
                                        </label>
                                        <input
                                            type="file"
                                            id={`${id}-image-input`}
                                            accept=".jpg,.jpeg,.png"
                                            multiple
                                            style={{ display: "none" }}
                                            onChange={createFilesChangeHandler(setter)}
                                            disabled={!config.editable}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagesSection;