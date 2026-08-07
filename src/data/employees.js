export function generateEmployees() {
    const firstNames = ["Aarav", "Isha", "Rohan", "Kavya", "Vikram", "Neha", "Aditya", "Sanya", "Karan", "Meera", "Arjun", "Divya", "Sameer", "Priya", "Rahul", "Tanya", "Nikhil", "Ritu", "Yash", "Simran", "Manav", "Ananya", "Dev", "Pooja", "Ashish", "Zoya", "Harsh", "Lavanya", "Rohit", "Sneha"];
    const lastNames = ["Sharma", "Verma", "Iyer", "Nair", "Gupta", "Malhotra", "Reddy", "Kapoor", "Chatterjee", "Bhat", "Joshi", "Rao", "Menon", "Singh", "Desai"];
    const depts = ["Engineering", "Design", "Sales", "Marketing", "HR", "Finance", "Support", "Product"];
    
    // Helper functions assumed to be available or defined within scope
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pad = (n) => String(n).padStart(2, '0');

    let employees = [];
    const used = new Set();
    
    for (let i = 1; i <= 42; i++) {
        let fn = rand(firstNames), ln = rand(lastNames), full = fn + " " + ln;
        while (used.has(full)) { 
            fn = rand(firstNames); 
            ln = rand(lastNames); 
            full = fn + " " + ln; 
        }
        used.add(full);
        
        const dept = rand(depts);
        const invitedDay = 10 + Math.floor(Math.random() * 10);
        const invited_on = `2026-07-${pad(invitedDay)}`;
        const isCheckedIn = Math.random() < 0.55;
        let checkin_time = null;
        
        if (isCheckedIn) {
            const h = 8 + Math.floor(Math.random() * 9);
            const m = Math.floor(Math.random() * 60);
            checkin_time = `2026-08-06 ${pad(h)}:${pad(m)}`;
        }
        
        employees.push({
            id: i, 
            name: full,
            email: (fn + "." + ln).toLowerCase() + "@company.com",
            dept, 
            invited_on, 
            checkin_time, 
            isWalkin: false
        });
    }

    // A few walk-in guests (no invitation)
    ["Rakesh Ambani", "Fatima Sheikh", "Oliver Kane"].forEach((n, idx) => {
        employees.push({
            id: 100 + idx, 
            name: n, 
            email: n.toLowerCase().replace(/ /g, '.') + "@guest.com",
            dept: "Guest", 
            invited_on: null,
            checkin_time: `2026-08-06 ${pad(9 + idx)}:15`, 
            isWalkin: true
        });
    });

    return employees;
}