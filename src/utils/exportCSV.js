export function exportCSV(filteredEmployees) {
    const headers = [
        "Name",
        "Email",
        "Department",
        "Status",
        "Check In Time"
    ];

    const rows = filteredEmployees.map(emp => [
        emp.name,
        emp.email,
        emp.dept,
        emp.isWalkin
            ? "Walk-in"
            : emp.checkin_time
            ? "Checked In"
            : "Pending",
        emp.checkin_time || ""
    ]);

    const csv = [headers, ...rows]
        .map(row =>
            row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "guest-list.csv";
    link.click();

    URL.revokeObjectURL(url);
}