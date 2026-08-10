import StatsCard from "../StatCard/StatsCard";
import DepartmentCard from "../DepartmentCard/DepartmentCard";


export default function Dashboard({ employees }) {


    const invited =
        employees.filter(e => !e.isWalkin).length;


    const checked =
        employees.filter(e => e.checkin_time).length;


    const pending =
        employees.filter(
            e => !e.isWalkin && !e.checkin_time
        ).length;


    const walkins =
        employees.filter(e => e.isWalkin).length;


    const total = employees.length;


    const percentage =
        total ? (checked / total) * 100 : 0;



    const departmentData = {};


    employees.forEach(employee => {


        if (!departmentData[employee.dept]) {

            departmentData[employee.dept] = {
                total: 0,
                checked: 0
            }

        }


        departmentData[employee.dept].total++;


        if (employee.checkin_time) {

            departmentData[employee.dept].checked++;

        }


    });

    return (

        <section className="view active">

            <div className="section-label">
                <span className="eyebrow">
                    Live
                </span>
                Retreat check-in overview
            </div>

            <div className="stat-grid">
                <StatsCard
                    value={invited}
                    label="Invitations Sent"
                />

                <StatsCard
                    value={checked}
                    label="Checked In"
                    color="aqua"
                />

                <StatsCard
                    value={pending}
                    label="Awaiting Arrival"
                    color="amber"
                />

                <StatsCard
                    value={walkins}
                    label="Walk-in Guests"
                    color="coral"
                />

                <StatsCard
                    value={`${percentage.toFixed(0)}%`}
                    label="Invited check-in rate"
                />
            </div>
            <div className="capacity-card">
                <div className="capacity-top">
                    <span className="t">
                        🌊 Resort arrivals vs. total roster
                    </span>
                    <span className="n mono">
                        {checked} / {total}
                    </span>
                </div>
                <div className="gauge">
                    <div
                        className="gauge-fill"
                        style={{
                            width: `${percentage}%`
                        }}
                    />
                </div>
            </div>
        </section>

    )

}