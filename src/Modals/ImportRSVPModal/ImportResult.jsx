import "./ImportResult.css";
import {
    faClock,
    faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImportResult({ result }) {

    const metadata = result?.metadata || {};
    const records = result?.records || [];

    return (
        <div className="import-result">

            {/* SUCCESS HEADER */}

            <div className="import-result-header">

                <div className="import-result-success-icon">
                    ✓
                </div>

                <div>
                    <h4>
                        RSVP Import Completed
                    </h4>

                    <p>
                        {result.message || "Import completed successfully."}
                    </p>
                </div>

            </div>


            {/* SUMMARY */}

            <div className="import-summary">

                <div className="import-summary-card">
                    <span>Total</span>
                    <strong>
                        {metadata.total_count ?? 0}
                    </strong>
                </div>

                <div className="import-summary-card imported">
                    <span>Imported</span>
                    <strong>
                        {metadata.total_imported ?? 0}
                    </strong>
                </div>

                <div className="import-summary-card failed">
                    <span>Not Imported</span>
                    <strong>
                        {metadata.total_not_imported ?? 0}
                    </strong>
                </div>

            </div>


            {/* RECORDS */}

            <div className="import-result-table-wrap">

                <table className="import-result-table">

                    <thead>
                        <tr>

                            {metadata.table_headers_with_indexing?.map(
                                (header, index) => (
                                    <th key={index}>
                                        {header}
                                    </th>
                                )
                            )}

                        </tr>
                    </thead>


                    <tbody>

                        {records.length > 0 ? (

                            records.map((record, rowIndex) => (

                                <tr key={rowIndex}>

                                    {metadata.table_headers_with_indexing?.map(
                                        (header, columnIndex) => {

                                            const key = header
                                                .toLowerCase()
                                                .replace(/\s+/g, "_");

                                            const value = record[key];

                                            // STATUS
                                            if (key === "status") {

                                                const status = String(value || "").trim().toLowerCase();

                                                if (status === "pending") {

                                                    return (
                                                        <td key={columnIndex}>
                                                            <span className="import-status pending">
                                                                <FontAwesomeIcon icon={faClock} />
                                                                {value}
                                                            </span>
                                                        </td>
                                                    );

                                                }

                                                if (status === "failed") {

                                                    return (
                                                        <td key={columnIndex}>
                                                            <span className="import-status failed">
                                                                <FontAwesomeIcon icon={faCircleXmark} />
                                                                {value}
                                                            </span>
                                                        </td>
                                                    );

                                                }

                                                return (
                                                    <td key={columnIndex}>
                                                        <span className="import-status">
                                                            {value || "-"}
                                                        </span>
                                                    </td>
                                                );
                                            }

                                            // REASON
                                            if (key === "reason") {

                                                return (
                                                    <td
                                                        key={columnIndex}
                                                        className="result-reason"
                                                    >
                                                        {value || "-"}
                                                    </td>
                                                );
                                            }


                                            // NORMAL
                                            return (
                                                <td key={columnIndex}>
                                                    {value || "-"}
                                                </td>
                                            );

                                        }
                                    )}

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan={
                                        metadata.table_headers_with_indexing?.length || 1
                                    }
                                    className="import-result-empty"
                                >
                                    No records found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>
            </div>

        </div>
    );
}
