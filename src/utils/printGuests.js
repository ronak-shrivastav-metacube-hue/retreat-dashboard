export function printList(filteredEmployees) {

    const html = `
        <html>
        <head>
            <title>Guest List</title>

            <style>
                body{
                    font-family:Arial;
                    padding:30px;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                }

                th,td{
                    border:1px solid #ccc;
                    padding:8px;
                    text-align:left;
                }

                th{
                    background:#eee;
                }
            </style>

        </head>

        <body>

        <h2>Filtered Guest List</h2>

        <table>

            <thead>

                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Check In</th>
                </tr>

            </thead>

            <tbody>

                 ${filteredEmployees.map(emp => `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.isWalkin
            ? "Walk-in"
            : emp.checkin_time
                ? "Checked In"
                : "Pending"
        }</td>
                <td>${emp.checkin_time || ""}</td>
            </tr>
        `).join("")}

            </tbody>

        </table>

        </body>

        </html>
    `;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(html);

    printWindow.document.close();

    printWindow.print();
}