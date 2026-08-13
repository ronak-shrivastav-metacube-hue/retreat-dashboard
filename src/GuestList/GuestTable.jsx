export default function GuestTable({
    employees,
    pagination,
    currentPage,
    onPageChange,
    onCheckin,
    onremindEmail,
    checkingInId,
    tableLoading,
    remindMailId
}) {

    const goToPage = (page) => {

        if (
            !tableLoading &&
            page >= 1 &&
            page <= pagination.last_page
        ) {
            onPageChange(page);
        }

    };

    return (

        <div className="table-wrap">

            {tableLoading && (
                <div className="table-loading-overlay">
                    <span className="table-spinner"></span>
                    <span>Loading guests...</span>
                </div>
            )}

            <div className="table-scroll">
                <table>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>


                    <tbody>

                        {employees.length > 0 ? (

                            employees.map((employee) => {

                                const status = employee.isWalkin
                                    ? "Walk-in"
                                    : employee.checkin_time
                                        ? "Checked In"
                                        : "Pending";

                                const checkinDate =
                                    employee.checkin_time
                                        ? new Date(employee.checkin_time)
                                        : null;

                                const formattedCheckin =
                                    checkinDate
                                        ? `${String(
                                            checkinDate.getDate()
                                        ).padStart(2, "0")}-${String(
                                            checkinDate.getMonth() + 1
                                        ).padStart(2, "0")}-${checkinDate.getFullYear()} ${checkinDate.toLocaleTimeString(
                                            [],
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: true
                                            }
                                        )}`
                                        : "—";


                                return (

                                    <tr key={employee.id}>

                                        <td>
                                            {employee.name}
                                        </td>

                                        <td>
                                            {employee.email}
                                        </td>

                                        <td>
                                            {status}
                                        </td>

                                        <td>

                                            {employee.checkin_time ? (
                                                <>
                                                <button
                                                    className="checkin-btn"
                                                    onClick={() =>
                                                        onCheckin(employee, true)
                                                    }
                                                    disabled={
                                                        checkingInId ===
                                                        employee.id
                                                    }
                                                >
                                                    {checkingInId === employee.id ? (

                                                        <>
                                                            <span className="button-loader"></span>
                                                            <span> Pending... </span>
                                                        </>

                                                        ) : (
                                                    <i>✓ undo </i>
                                                        )}
                                                </button>

                                                <span className="stamped">
                                                    &nbsp;{formattedCheckin}
                                                </span>
                                                </>

                                            ) : (

                                                <>

                                                    <button
                                                        className="checkin-btn"
                                                        onClick={() =>
                                                            onCheckin(employee)
                                                        }
                                                        disabled={
                                                            checkingInId ===
                                                            employee.id
                                                        }
                                                    >

                                                        {checkingInId === employee.id ? (

                                                            <>
                                                                <span className="button-loader"></span>
                                                                <span> Checking In... </span>
                                                            </>

                                                        ) : ("Quick Check in")}

                                                    </button>

                                                    <button className="remind-btn"
                                                    onClick={() =>
                                                        onremindEmail(employee)
                                                    }
                                                    disabled={
                                                        remindMailId?.some(id => String(id) === String(employee.user_id))
                                                    }
                                                    >
                                                        {remindMailId?.some(id => String(id) === String(employee.user_id)) ? (
                                                            <>
                                                                <span className="button-loader"></span>
                                                                <span> Sending... </span>
                                                            </>
                                                        ) : ("Remind")}
                                                    </button>
                                                </>
                                                  

                                            )}

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td colSpan={4}>
                                    No guests found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>
            </div>

            {/* SERVER-SIDE PAGINATION */}

            {pagination.total > 0 && (

                <div className="pagination">

                    <div className="pagination-info">

                        Showing{" "}

                        <strong>
                            {pagination.from}
                        </strong>

                        {" – "}

                        <strong>
                            {pagination.to}
                        </strong>

                        {" of "}

                        <strong>
                            {pagination.total}
                        </strong>

                        {" guests"}

                    </div>


                    <div className="pagination-controls">

                        <button
                            className="pagination-btn"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1 || tableLoading}
                        >
                            ← Previous
                        </button>


                        {Array.from(
                            {
                                length: pagination.last_page
                            },
                            (_, index) => index + 1
                        ).map((page) => (

                            <button
                                key={page}
                                className={`pagination-btn ${currentPage === page ? "active" : ""
                                    }`}
                                onClick={() => goToPage(page)}
                                disabled={tableLoading}
                            >
                                {page}
                            </button>

                        ))}


                        <button
                            className="pagination-btn"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={
                                currentPage === pagination.last_page ||
                                tableLoading
                            }
                        >
                            Next →
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}
