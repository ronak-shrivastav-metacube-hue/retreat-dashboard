export default function GuestTable({

    employees,
    onCheckin

}) {

    return (

        <div className="table-wrap">

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Invited</th>

                        <th>Check-In</th>

                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {employees.map((employee) => {

                        const status = employee.isWalkin

                            ? "Walk-in"

                            : employee.checkin_time

                                ? "Checked In"

                                : "Pending";

                        return (

                            <tr key={employee.id}>

                                <td>

                                    {employee.name}

                                </td>

                                <td>

                                    {employee.email}

                                </td>

                                <td>

                                    {employee.dept}

                                </td>

                                <td>

                                    {employee.invited_on ?? "—"}

                                </td>

                                <td>

                                    {employee.checkin_time ?? "—"}

                                </td>

                                <td>

                                    {status}

                                </td>
                                <td>

                                    {
                                        employee.checkin_time ?

                                            <span className="stamped">
                                                ✓ {new Date(employee.checkin_time).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </span>

                                            :
                                            <>
                                                <button className="checkin-btn" onClick={() => onCheckin(employee.id)}>
                                                    Quick Check in
                                                </button>
                                                <button className="remind-btn">
                                                    Remind
                                                </button>
                                            </>
                                    }

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan={6}>

                            Showing {employees.length} guests

                        </td>

                    </tr>

                </tfoot>

            </table>

        </div>

    );

}