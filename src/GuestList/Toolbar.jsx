import { exportCSV } from "../utils/exportCSV";
import { printList } from "../utils/printGuests";


export default function Toolbar({
    search,
    setSearch,
    department,
    setDepartment,
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
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            >

                <option value="">All Departments</option>

                {departments.map((dept) => (

                    <option
                        key={dept}
                        value={dept}
                    >
                        {dept}
                    </option>

                ))}

            </select>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option value="">All Statuses</option>
                <option value="checked">Checked In</option>
                <option value="pending">Pending</option>
                <option value="walkin">Walk-in</option>

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