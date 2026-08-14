import './ExportExcelModal.css'
import { useEffect, useState } from "react";

export default function ExportExcelModal({
    open,
    onClose,
    onExport,
    loading = false
}) {
    const [exportType, setExportType] = useState("filters");

    useEffect(() => {
        if (open) {
            setExportType("filters");
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const handleExport = () => {
        onExport(exportType);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container export-excel-modal">

                <div className="modal-header">
                    <h3>Export Excel</h3>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">

                    <label
                        className={`radio-option ${exportType === "filters" ? "selected" : ""
                            }`}
                    >
                        <input
                            type="radio"
                            name="excelExportType"
                            value="filters"
                            checked={exportType === "filters"}
                            onChange={(e) => setExportType(e.target.value)}
                            disabled={loading}
                        />

                        <span>Export with filters</span>
                    </label>

                    <label
                        className={`radio-option ${exportType === "all" ? "selected" : ""
                            }`}
                    >
                        <input
                            type="radio"
                            name="excelExportType"
                            value="all"
                            checked={exportType === "all"}
                            onChange={(e) => setExportType(e.target.value)}
                            disabled={loading}
                        />

                        <span>Export All</span>
                    </label>

                </div>

                <div className="modal-footer">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleExport}
                        disabled={loading}
                    >
                        {loading ? "Exporting..." : "Export Excel"}
                    </button>

                </div>

            </div>
        </div>
    );
}