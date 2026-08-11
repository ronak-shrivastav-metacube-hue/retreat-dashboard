// import { exportCSV } from "../utils/exportCSV";
import { printList } from "../utils/printGuests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRotateRight,
    faUserPlus,
    faFileExport,
    faPrint,
    faQrcode,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";


export default function Toolbar({
    search,
    setSearch,
    status,
    setStatus,
    departments,
    openWalkinModal,
    filteredEmployees,
    onRefresh,
    loading,
    onremindEmail,
    onExportCSV
    onOpenScanner,
    onSearch
}) {
    return (

        <div className="toolbar">

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
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />

            </div>


            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option value="">All Statuses</option>
                <option value="checked">Checked In</option>
                <option value="pending">Pending</option>
            </select>

            <div className="spacer"></div>

            <button className="btn btn-ghost" onClick={onRefresh} disabled={loading}>
                <FontAwesomeIcon icon={faRotateRight} /> Refresh
            </button>
            <button className="btn btn-ghost" 
                onClick={() =>
                    onremindEmail()
                }
            >
                Remind
            </button>


            <button
                className="btn btn-ghost"
                onClick={openWalkinModal}
            >
                <FontAwesomeIcon icon={faUserPlus} /> Add Walk-in Guest
            </button>

            <button className="btn btn-ghost" onClick={() => onExportCSV(filteredEmployees)}>
                ⬇ Export CSV
            </button>

            <button className="btn btn-ghost" onClick={() => printList(filteredEmployees)}>
                <FontAwesomeIcon icon={faPrint} /> Print
            </button>

            <button className="btn btn-ghost" onClick={onOpenScanner}>
                <FontAwesomeIcon icon={faQrcode} /> Open QR Scanner
            </button>

        </div>

    );

}