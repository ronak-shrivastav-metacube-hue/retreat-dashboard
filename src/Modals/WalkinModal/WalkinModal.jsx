import { useState } from "react";
import { getCustomers } from "../../services/apiService";

export default function WalkinModal({
    open,
    onClose,
    onSave,
    eventSlug,
    loading
}) {
    const [userDetail, setUserDetail] = useState("");

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [searchLoading, setSearchLoading] = useState(false);

    const [checkinLoading, setCheckinLoading] = useState(false);

    if (!open) return null;


    const handleSearch = async (e) => {

        if (e.key !== "Enter") {
            return;
        }

        const searchText = userDetail.trim();

        // Minimum 3 characters
        if (searchText.length < 3) {
            setUsers([]);
            return;
        }

        setSearchLoading(true);

        try {

            const response = await getCustomers(
                searchText,
                eventSlug
            );

            if (response.success) {

                setUsers(
                    response.data?.customers || []
                );

            } else {

                setUsers([]);

            }

        } catch (error) {

            console.error("Customer search error:", error);

            setUsers([]);

        } finally {

            setSearchLoading(false);

        }
    };


    const handleSelectUser = (user) => {

        setSelectedUser(user);

        setUserDetail(user.full_name);

        setUsers([]);
    };


    const handleSave = async () => {

        if (!selectedUser) {
            return;
        }

        setCheckinLoading(true);

        try {

            await onSave(selectedUser);

        } finally {

            setCheckinLoading(false);

        }
    };


    const handleClose = () => {

        setUserDetail("");
        setUsers([]);
        setSelectedUser(null);
        setSearchLoading(false);
        setCheckinLoading(false);

        onClose();
    };


    return (

        <div className="overlay show">

            <div className="modal walkin-modal">

                <h3>
                    🏖️ Register a walk-in guest
                </h3>


                <label>
                    Email / Name
                </label>


                <div className="walkin-search">

                    <input
                        type="text"
                        value={userDetail}
                        placeholder="name@company.com / Jone"
                        onChange={(e) => {

                            setUserDetail(e.target.value);

                            // User is typing again,
                            // so remove previous selection.
                            setSelectedUser(null);

                            if (e.target.value.trim().length < 3) {
                                setUsers([]);
                            }

                        }}
                        onKeyDown={handleSearch}
                    />

                    {searchLoading && (

                        <span className="search-spinner"></span>

                    )}

                </div>


                {/* SEARCH RESULTS */}

                {users.length > 0 && (

                    <div className="guest-search-results">

                        {users.map((user) => (

                            <button
                                type="button"
                                className="guest-search-item"
                                key={user.id}
                                onClick={() => handleSelectUser(user)}
                            >

                                {/* User Image */}

                                <div className="guest-avatar">

                                    {user.image ? (

                                        <img
                                            src={user.image}
                                            alt={user.full_name}
                                        />

                                    ) : (

                                        <span>
                                            {user.full_name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </span>

                                    )}

                                </div>


                                {/* User Information */}

                                <div className="guest-search-content">

                                    <div className="guest-search-name">

                                        {user.full_name}

                                    </div>


                                    <div className="guest-search-email">

                                        {user.email}

                                    </div>


                                    <div className="guest-search-meta">

                                        <span>
                                            {user.unique_id}
                                        </span>

                                        {user.is_remote_employee && (

                                            <span className="remote-badge">
                                                Remote
                                            </span>

                                        )}

                                    </div>

                                </div>


                                {/* Right Arrow */}

                                <div className="guest-search-arrow">
                                    →
                                </div>

                            </button>

                        ))}

                    </div>

                )}


                {/* NO RESULTS */}

                {!searchLoading &&
                    userDetail.trim().length >= 3 &&
                    users.length === 0 &&
                    !selectedUser && (

                        <div className="guest-no-results">
                            Press Enter to search for guests
                        </div>

                    )}


                <div className="modal-actions">

                    <button
                        className="btn btn-ghost"
                        onClick={handleClose}
                        disabled={checkinLoading}
                    >
                        Cancel
                    </button>


                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={!selectedUser || loading}
                    >
                        {loading ? (
                            <>
                                <span className="button-loader"></span>
                                Checking In...
                            </>
                        ) : (
                            "Check In Guest"
                        )}
                    </button>


                </div>

            </div>

        </div>
    );
}
