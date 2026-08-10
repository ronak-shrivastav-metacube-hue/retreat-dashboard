import { storage } from "../utils/storage";
import { useEffect, useState } from "react";

export default function GuestTable({
    employees,
    onCheckin,
    checkingInId
}) {
    const BASE_URL = storage.get("BASE_URL");
    const TOKEN = storage.get("TOKEN");
    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    // Total number of pages
    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

    // If employees change and current page no longer exists,
    // move back to the last available page.
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [employees.length, currentPage, totalPages]);

    // Get employees for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentEmployees = employees.slice(startIndex, endIndex);

    // Change page
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (

        <div className="table-wrap">

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

                    {currentEmployees.length > 0 ? (

                        currentEmployees.map((employee) => {

                            const status = employee.isWalkin
                                ? "Walk-in"
                                : employee.checkin_time
                                    ? "Checked In"
                                    : "Pending";

                            // Format check-in date/time
                            const checkinDate = employee.checkin_time
                                ? new Date(employee.checkin_time)
                                : null;

                            const formattedCheckin = checkinDate
                                ? `${String(checkinDate.getDate()).padStart(2, "0")}-${String(
                                    checkinDate.getMonth() + 1
                                ).padStart(2, "0")}-${checkinDate.getFullYear()} ${checkinDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: true
                                })}`
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

                                            <span className="stamped">
                                                ✓ {formattedCheckin}
                                            </span>

                                        ) : (

                                            <>
                                                <button
                                                    className="checkin-btn"
                                                    onClick={() => onCheckin(employee)}
                                                    disabled={checkingInId === employee.id}
                                                >
                                                    {checkingInId === employee.id ? (
                                                        <>
                                                            <span className="button-loader"></span>
                                                            <span className="checkin-text">Checking...</span>
                                                        </>
                                                    ) : (
                                                        "Quick Check in"
                                                    )}
                                                </button>

                                                <button className="remind-btn">
                                                    Remind
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

            {/* Pagination */}
            {totalPages > 0 && (

                <div className="pagination">

                    <div className="pagination-info">
                        Showing{" "}
                        <strong>{startIndex + 1}</strong>
                        {" – "}
                        <strong>
                            {Math.min(endIndex, employees.length)}
                        </strong>
                        {" of "}
                        <strong>{employees.length}</strong>
                        {" guests"}
                    </div>

                    <div className="pagination-controls">

                        <button
                            className="pagination-btn"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (

                            <button
                                key={page}
                                className={`pagination-btn ${currentPage === page ? "active" : ""
                                    }`}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>

                        ))}

                        <button
                            className="pagination-btn"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}
