import { useState } from "react";
import { printList } from "../utils/printGuests";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRotateRight,
    faUserPlus,
    faFileExport,
    faPrint,
    faQrcode,
    faMagnifyingGlass,
    faEllipsisVertical,
    faFileImport,
    faEnvelope,
    faMailBulk
} from "@fortawesome/free-solid-svg-icons";


export default function Toolbar({
    search,
    setSearch,
    status,
    setStatus,
    openWalkinModal,
    filteredEmployees,
    onRefresh,
    loading,
    onremindEmail,
    onExportCSV,
    onOpenScanner,
    onSearch,
    onImportRSVP,
    showExportExcel,
    onOpenConfirmationBox
}) {

    const [showMore, setShowMore] = useState(false);

    return (

        <div className="toolbar">

            {/* SEARCH */}
            <div className="search-input-wrapper">

                <input
                    type="text"
                    placeholder="Search name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch();
                        }
                    }}
                />

                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon"
                />

            </div>


            {/* STATUS */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">All Statuses</option>
                <option value="checked">Checked In</option>
                <option value="pending">Pending</option>
            </select>


            <div className="spacer"></div>


            {/* REFRESH */}
            <button
                className="btn btn-ghost"
                onClick={onRefresh}
                disabled={loading}
                title="Refresh"
            >
                <FontAwesomeIcon icon={faRotateRight} />
                <span>Refresh</span>
            </button>


            {/* WALK-IN */}
            <button
                className="btn btn-ghost"
                onClick={openWalkinModal}
            >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Add Walk-in</span>
            </button>

            {/* QR Code Scanner */}
            <button
                className="btn btn-ghost"
                onClick={() => {
                    onOpenScanner();
                    setShowMore(false);
                }}
            >
                <FontAwesomeIcon icon={faQrcode} />
                <span>Scan QR</span>
            </button>

            {/* MORE */}
            <div className="toolbar-more">

                <button
                    className="btn btn-ghost more-btn"
                    onClick={() => setShowMore(!showMore)}
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    <span>More</span>
                </button>


                {showMore && (

                    <div className="more-menu">
                        <button
                            type="button"
                            className="more-menu-item"
                            onClick={() => {
                                setShowMore(false);
                                onImportRSVP();
                            }}
                        >
                            <FontAwesomeIcon icon={faFileImport} />
                            <span>Import RSVP</span>
                        </button>

                        <button
                            className="more-menu-item"
                            onClick={() => {
                                onExportCSV(filteredEmployees);
                                setShowMore(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faFileExport} />
                            <span>Export CSV</span>
                        </button>


                        <button
                            className="more-menu-item"
                            onClick={() => {
                                printList(filteredEmployees);
                                setShowMore(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faPrint} />
                            <span>Print</span>
                        </button>

                        <button className="more-menu-item" onClick={() => onOpenConfirmationBox(true)}>
                            <FontAwesomeIcon icon={faMailBulk} />
                            Bulk Remind
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}
