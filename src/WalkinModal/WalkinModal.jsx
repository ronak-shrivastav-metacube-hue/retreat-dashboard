import { useState } from "react";

export default function WalkinModal({
    open,
    onClose,
    onSave,
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");

    if (!open) return null;

    function handleSave() {
        if (!name.trim() || !email.trim()) {
            return;
        }

        onSave({
            name,
            email,
            department: department || "Guest",
        });

        setName("");
        setEmail("");
        setDepartment("");
    }

    return (
        <div className={`overlay ${open ? "show" : ""}`}>
            <div className="modal">

                <h3>
                    🏖️ Register a walk-in guest
                </h3>

                <label>Full Name</label>

                <input
                    type="text"
                    value={name}
                    placeholder="e.g. Priya Nair"
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Department</label>

                <input
                    type="text"
                    value={department}
                    placeholder="Engineering"
                    onChange={(e) => setDepartment(e.target.value)}
                />

                <div className="modal-actions">

                    <button
                        className="btn btn-ghost"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                    >
                        Check In Guest
                    </button>

                </div>

            </div>
        </div>
    );
}