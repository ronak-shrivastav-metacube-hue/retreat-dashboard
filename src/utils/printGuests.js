export function printList(filteredEmployees = []) {
    // Make sure we always have an array
    if (!Array.isArray(filteredEmployees)) {
        console.error("printList expected an array but received:", filteredEmployees);
        return;
    }

    // Prevent HTML from breaking when database values contain &, <, >, etc.
    const escapeHtml = (value) => {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const rows = filteredEmployees
        .map((emp) => {
            const name = escapeHtml(emp?.name);
            const email = escapeHtml(emp?.email);
            const checkinTime = escapeHtml(emp?.checkin_time);

            let status = "Pending";

            if (emp?.isWalkin) {
                status = "Walk-in";
            } else if (emp?.checkin_time) {
                status = "Checked In";
            }

            return `
                <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${status}</td>
                    <td>${checkinTime}</td>
                </tr>
            `;
        })
        .join("");

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">

            <title>Guest List</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #000;
                }

                h2 {
                    margin-bottom: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background: #eee;
                }

                @media print {
                    body {
                        padding: 10px;
                    }
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
                    ${rows}
                </tbody>
            </table>

        </body>
        </html>
    `;

    // Open print window
    const printWindow = window.open("", "_blank", "width=1000,height=700");

    // Browser can block popup
    if (!printWindow) {
        alert("Please allow pop-ups in your browser to print the guest list.");
        return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    // Wait until the document has loaded before printing
    printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
    };
}