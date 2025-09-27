import React from "react";

export default function PseInfoSection(props) {
  // Destructure props as needed
  const {
    pseOpen,
    setPseOpen,
    packingPlantCurr,
    setPackingPlantCurr,
    packingPlantNext,
    setPackingPlantNext,
    vanningPlantCurr,
    setVanningPlantCurr,
    vanningPlantNext,
    setVanningPlantNext,
    orderPatternCurr,
    setOrderPatternCurr,
    orderPatternNext,
    setOrderPatternNext,
    category,
    setCategory,
    katashiki,
    setKatashiki,
    importerLineProcess,
    setImporterLineProcess,
    caseCode,
    setCaseCode,
    boxNumber,
    setBoxNumber,
    renban,
    setRenban,
    renbanEff,
    setRenbanEff,
    packingProcessBoxing,
    setPackingProcessBoxing,
    packingProcessStacking,
    setPackingProcessStacking,
  } = props;

  return (
    <div>
      {/* PSE Info (collapsible) */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-sm btn-link p-0"
          onClick={() => setPseOpen((v) => !v)}
        >
          <i
            className={`fas ${
              pseOpen ? "fa-chevron-down" : "fa-chevron-right"
            } mr-2`}
          />
          <strong>PSE Info</strong>
        </button>
        {pseOpen && (
          <div className="card card-body mt-2">
            <div className="row">
              <div className="col-md-4">
                <label className="small mb-1">Packing Plant (Curr)</label>
                <input
                  className="form-control form-control-sm"
                  value={packingPlantCurr}
                  onChange={(e) => setPackingPlantCurr(e.target.value)}
                />
                <label className="small mb-1 mt-2">Packing Plant (Next)</label>
                <input
                  className="form-control form-control-sm"
                  value={packingPlantNext}
                  onChange={(e) => setPackingPlantNext(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="small mb-1">Vanning Plant (Curr)</label>
                <input
                  className="form-control form-control-sm"
                  value={vanningPlantCurr}
                  onChange={(e) => setVanningPlantCurr(e.target.value)}
                />
                <label className="small mb-1 mt-2">Vanning Plant (Next)</label>
                <input
                  className="form-control form-control-sm"
                  value={vanningPlantNext}
                  onChange={(e) => setVanningPlantNext(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="small mb-1">Order Pattern (Curr)</label>
                <input
                  className="form-control form-control-sm"
                  value={orderPatternCurr}
                  onChange={(e) => setOrderPatternCurr(e.target.value)}
                />
                <label className="small mb-1 mt-2">Order Pattern (Next)</label>
                <input
                  className="form-control form-control-sm"
                  value={orderPatternNext}
                  onChange={(e) => setOrderPatternNext(e.target.value)}
                />
              </div>

              <div className="col-12 mt-3">
                <label className="small mb-1">Category</label>
                <select
                  className="form-control form-control-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">—</option>
                  <option value="Trim">Trim</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-12 mt-2">
                <label className="small mb-1">Katashiki (AD/AU/AF/AX)</label>
                <div className="form-row">
                  <div className="col">
                    <input
                      className="form-control form-control-sm"
                      placeholder="AD"
                      value={katashiki.AD}
                      onChange={(e) =>
                        setKatashiki((k) => ({ ...k, AD: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control form-control-sm"
                      placeholder="AU"
                      value={katashiki.AU}
                      onChange={(e) =>
                        setKatashiki((k) => ({ ...k, AU: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control form-control-sm"
                      placeholder="AF"
                      value={katashiki.AF}
                      onChange={(e) =>
                        setKatashiki((k) => ({ ...k, AF: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control form-control-sm"
                      placeholder="AX"
                      value={katashiki.AX}
                      onChange={(e) =>
                        setKatashiki((k) => ({ ...k, AX: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mt-3">
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Importer Line Process</label>
                    <input
                      className="form-control form-control-sm"
                      value={importerLineProcess}
                      onChange={(e) => setImporterLineProcess(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Case Code</label>
                    <input
                      className="form-control form-control-sm"
                      value={caseCode}
                      onChange={(e) => setCaseCode(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Box Number</label>
                    <input
                      className="form-control form-control-sm"
                      value={boxNumber}
                      onChange={(e) => setBoxNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Renban</label>
                    <input
                      className="form-control form-control-sm"
                      value={renban}
                      onChange={(e) => setRenban(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">Renban Eff</label>
                    <input
                      className="form-control form-control-sm"
                      value={renbanEff}
                      onChange={(e) => setRenbanEff(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="small mb-1">
                      Packing Process - Boxing
                    </label>
                    <select
                      className="form-control form-control-sm"
                      value={packingProcessBoxing}
                      onChange={(e) => setPackingProcessBoxing(e.target.value)}
                    >
                      <option value="">—</option>
                      <option value="SUPPLIER">SUPPLIER</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="small mb-1">
                      Packing Process - Stacking
                    </label>
                    <select
                      className="form-control form-control-sm"
                      value={packingProcessStacking}
                      onChange={(e) =>
                        setPackingProcessStacking(e.target.value)
                      }
                    >
                      <option value="">—</option>
                      <option value="TMMIN">TMMIN</option>
                    </select>
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
