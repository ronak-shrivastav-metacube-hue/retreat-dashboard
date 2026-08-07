import { useMemo, useState } from "react";

import Toolbar from "./Toolbar";
import BulkActions from "./BulkActions";
import GuestTable from "./GuestTable";

export default function GuestList({

    employees,

    openWalkinModal,
    onCheckin

}) {

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [status, setStatus] = useState("");

    const departments = [

        ...new Set(

            employees.map(emp => emp.dept)

        )

    ].sort();

    const filteredEmployees = useMemo(() => {

        return employees.filter(emp => {

            const matchesSearch =

                emp.name.toLowerCase().includes(search.toLowerCase())

                ||

                emp.email.toLowerCase().includes(search.toLowerCase());

            const matchesDepartment =

                !department ||

                emp.dept === department;

            const empStatus =

                emp.isWalkin

                    ? "walkin"

                    : emp.checkin_time

                        ? "checked"

                        : "pending";

            const matchesStatus =

                !status ||

                empStatus === status;

            return (

                matchesSearch &&

                matchesDepartment &&

                matchesStatus

            );

        });

    }, [

        employees,

        search,

        department,

        status

    ]);

    return (

        <section className="view active">

            <div className="section-label">

                <span className="eyebrow">

                    Roster

                </span>

                All Employees & Guests

            </div>

            <Toolbar

                search={search}

                setSearch={setSearch}

                department={department}

                setDepartment={setDepartment}

                status={status}

                setStatus={setStatus}

                departments={departments}

                openWalkinModal={openWalkinModal}

                filteredEmployees={filteredEmployees}
            />

            <BulkActions

                selectedCount={0}

            />

            <GuestTable

                employees={filteredEmployees}
                onCheckin={onCheckin}

            />

        </section>

    );

}