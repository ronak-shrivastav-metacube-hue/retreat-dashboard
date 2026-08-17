import StatsCard from "../StatCard/StatsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRotateRight
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard({ onRefresh, dashBoardCount }) {


    // const invited =
    //     employees.filter(e => !e.isWalkin).length;


    // const checked =
    //     employees.filter(e => e.checkin_time).length;


    // const pending =
    //     employees.filter(
    //         e => !e.isWalkin && !e.checkin_time
    //     ).length;


    // const walkins =
    //     employees.filter(e => e.isWalkin).length;


    // const total = employees.length;


    // const percentage =
    //     total ? (checked / total) * 100 : 0;



    // const departmentData = {};


    // employees.forEach(employee => {


    //     if (!departmentData[employee.dept]) {

    //         departmentData[employee.dept] = {
    //             total: 0,
    //             checked: 0
    //         }

    //     }


    //     departmentData[employee.dept].total++;


    //     if (employee.checkin_time) {

    //         departmentData[employee.dept].checked++;

    //     }


    // });

    return (

        <section className="view active">

            <div className="section-label">
                <span className="eyebrow">
                    Live
                </span>
                Retreat check-in overview
                <button
                    className="btn btn-ghost"
                    onClick={onRefresh}
                    title="Refresh"
                >
                <FontAwesomeIcon icon={faRotateRight} />
                <span>Refresh</span>
            </button>
            </div>

            <div className="stat-grid">
                <StatsCard
                    value={dashBoardCount.invitation_count}
                    label="Invitations Sent"
                />

                <StatsCard
                    value={dashBoardCount.checked_in_count}
                    label="Checked In"
                    color="aqua"
                />

                <StatsCard
                    value={dashBoardCount.pending_count}
                    label="Awaiting Arrival"
                    color="amber"
                />

                <StatsCard
                    value={dashBoardCount.walk_in_count}
                    label="Walk-in Guests"
                    color="coral"
                />

                <StatsCard
                    value={dashBoardCount.invited_rate}
                    label="Invited check-in rate"
                />
            </div>
            {/* <div className="capacity-card">
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
            </div> */}
        </section>

    )

}