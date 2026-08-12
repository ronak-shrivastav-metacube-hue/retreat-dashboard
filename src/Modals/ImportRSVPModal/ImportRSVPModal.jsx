import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faFileExcel,
    faCloudArrowUp,
    faXmark,
    faFileImport,
    faTrash,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";

import "./ImportExcelModal.css";
import ImportResult from "./ImportResult";

export default function ImportExcelModal({
    open,
    onClose,
    eventSlug,
    onSuccess,
    onImport
}) {

    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [importing, setImporting] = useState(false);
    const [error, setError] = useState("");
    const [importResult, setImportResult] = useState(null);

    if (!open) {
        return null;
    }

    const handleFileChange = (event) => {

        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        const allowedExtensions = [
            ".xlsx",
            ".xls"
        ];

        const extension = selectedFile.name
            .substring(selectedFile.name.lastIndexOf("."))
            .toLowerCase();

        if (!allowedExtensions.includes(extension)) {

            setError(
                "Please select a valid Excel file (.xlsx or .xls)."
            );

            setFile(null);

            return;
        }

        setError("");
        setFile(selectedFile);
    };


    const handleBrowse = () => {

        fileInputRef.current?.click();

    };


    const handleRemoveFile = () => {

        setFile(null);
        setError("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

    };


    const handleImport = async () => {

        if (!file) {
            setError("Please select an Excel file first.");
            return;
        }

        setImporting(true);
        setError("");

        try {

            const result = await onImport(file);

            if (result?.success) {
                setImportResult(result.data);
                onSuccess(result);
            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Something went wrong while importing RSVP."
            );

        } finally {

            setImporting(false);
        }
    };

    const handleClose = () => {

        if (importing) {
            return;
        }

        setFile(null);
        setError("");
        setImportResult(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        onClose();
    };



    return (

        <div
            className="import-modal-overlay"
            onClick={handleClose}
        >

            <div
                className="import-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}

                <div className="import-modal-header">

                    <div>

                        <h3>
                            Import RSVP
                        </h3>

                        <p>
                            Add RSVP guests from an Excel spreadsheet.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="import-modal-close"
                        onClick={handleClose}
                        disabled={importing}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                </div>


                {/* BODY */}

                <div className="import-modal-body">

                    {importResult ? (

                        <ImportResult result={importResult} />

                    ) : (

                        <>
                            <label className="import-section-label">
                                Import Excel File
                            </label>

                            <div
                                className={`excel-dropzone ${file ? "has-file" : ""
                                    }`}
                                onClick={handleBrowse}
                            >

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    hidden
                                />

                                {!file ? (

                                    <>
                                        <div className="excel-upload-icon">
                                            <FontAwesomeIcon
                                                icon={faCloudArrowUp}
                                            />
                                        </div>

                                        <div className="excel-upload-title">
                                            Choose an Excel file
                                        </div>

                                        <div className="excel-upload-description">
                                            Click to browse or drag and drop
                                            your file here
                                        </div>

                                        <div className="excel-upload-hint">
                                            Supports .xlsx and .xls
                                        </div>
                                    </>

                                ) : (

                                    <div className="selected-file">

                                        <div className="selected-file-icon">
                                            <FontAwesomeIcon
                                                icon={faFileExcel}
                                            />
                                        </div>

                                        <div className="selected-file-info">

                                            <div className="selected-file-name">
                                                {file.name}
                                            </div>

                                            <div className="selected-file-size">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className="remove-file-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFile();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                    </div>

                                )}

                            </div>

                            {error && (
                                <div className="import-error">
                                    {error}
                                </div>
                            )}
                        </>

                    )}

                </div>



                {/* FOOTER */}

                <div className="import-modal-footer">

                    {importResult ? (

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    ) : (

                        <>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={handleClose}
                                disabled={importing}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary import-submit-btn"
                                onClick={handleImport}
                                disabled={!file || importing}
                            >
                                {importing ? (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            spin
                                        />
                                        Importing...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faFileImport}
                                        />
                                        Import RSVP
                                    </>
                                )}
                            </button>
                        </>

                    )}

                </div>


            </div>

        </div>

    );
}
