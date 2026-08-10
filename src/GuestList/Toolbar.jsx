import { exportCSV } from "../utils/exportCSV";
import { printList } from "../utils/printGuests";


export default function Toolbar({
    search,
    setSearch,
    status,
    setStatus,
    departments,
    openWalkinModal,
    filteredEmployees,
}) {
    return (

        <div className="toolbar">

            <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option value="">All Statuses</option>
                <option value="checked">Checked In</option>
                <option value="pending">Pending</option>
            </select>

            <div className="spacer"></div>

            <button
                className="btn btn-ghost"
                onClick={openWalkinModal}
            >
                ＋ Add Walk-in Guest
            </button>

            <button className="btn btn-ghost" onClick={() => exportCSV(filteredEmployees)}>
                ⬇ Export CSV
            </button>

            <button className="btn btn-ghost" onClick={() => printList(filteredEmployees)}>
                🖨 Print
            </button>

        </div>

    );

}