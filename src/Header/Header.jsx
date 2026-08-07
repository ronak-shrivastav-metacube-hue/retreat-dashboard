import useClock from "../hooks/useClock";

export default function Header({ activeTab, setActiveTab }) {
    const now = useClock();
    return (

        <header className="top">
            <svg className="scene" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
                {/* sun */}

                <circle cx="1230" cy="34" r="30" fill="#F2A93B" opacity="0.35" />
                <circle cx="1230" cy="34" r="18" fill="#F2A93B" opacity="0.5" />
                {/* water slide tube (right side) */}
                <path d="M1330 -10 C1260 30, 1310 70, 1250 100 C1200 124, 1230 150, 1180 175" stroke="#90E0EF" stroke-width="16" fill="none" opacity="0.28" strokeLinecap="round" />
                <path d="M1330 -10 C1260 30, 1310 70, 1250 100 C1200 124, 1230 150, 1180 175" stroke="#CAF0F8" stroke-width="4" fill="none" opacity="0.4" strokeLinecap="round" />
                {/* slide support struts */}
                <line x1="1250" y1="100" x2="1250" y2="176" stroke="#90E0EF" stroke-width="5" opacity="0.22" />
                <line x1="1180" y1="175" x2="1180" y2="200" stroke="#90E0EF" stroke-width="5" opacity="0.22" />
                {/* palm leaves (left) */}
                <path d="M40 200 C40 150, 30 120, 10 95" stroke="#48CAE4" stroke-width="5" fill="none" opacity="0.3" strokeLinecap="round" />
                <path d="M10 95 C-15 85, -30 65, -35 45" stroke="#48CAE4" stroke-width="4" fill="none" opacity="0.28" strokeLinecap="round" />
                <path d="M10 95 C15 75, 15 55, 5 35" stroke="#48CAE4" stroke-width="4" fill="none" opacity="0.28" strokeLinecap="round" />
                <path d="M10 95 C35 82, 55 68, 65 50" stroke="#48CAE4" stroke-width="4" fill="none" opacity="0.28" strokeLinecap="round" />
                {/* pool water bands at bottom */}
                <path d="M0 170 Q60 150 120 170 T240 170 T360 170 T480 170 T600 170 T720 170 T840 170 T960 170 T1080 170 T1200 170 T1320 170 T1440 170 V200 H0 Z" fill="#0096C7" opacity="0.35" />
                <path d="M0 185 Q70 168 140 185 T280 185 T420 185 T560 185 T700 185 T840 185 T980 185 T1120 185 T1260 185 T1400 185 V200 H0 Z" fill="#00B4D8" opacity="0.3" />
            </svg>
            <div className="top-row">
                <div className="brand">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                        <circle cx="21" cy="21" r="21" fill="#48CAE4" fill-opacity="0.2" />
                        <path d="M6 24c3-4 6-4 9 0s6 4 9 0 6-4 9 0" stroke="#48CAE4" stroke-width="2.4" strokeLinecap="round" />
                        <path d="M6 30c3-4 6-4 9 0s6 4 9 0 6-4 9 0" stroke="#00B4D8" stroke-width="2.4" strokeLinecap="round" opacity="0.9" />
                        <circle cx="21" cy="13" r="4.2" fill="#F2A93B" />
                    </svg>
                    <div>
                        <h1>Splash Bash 2026</h1>
                        <p>Ananth Aravali Resort & Water Park · Event Desk</p>
                    </div>
                </div>
                <div className="clock-box">
                    <div className="time mono" >
                         {now.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })}
                    </div>
                    <div className="date">
                        {now.toLocaleDateString([], {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                    </div>
                </div>
            </div>
            <nav className="tabs">
                <button
                    className={activeTab === "dashboard" ? "active" : ""}
                    onClick={() => setActiveTab("dashboard")}
                >
                    Dashboard
                </button>
                <button
                    className={activeTab === "guests" ? "active" : ""}
                    onClick={() => setActiveTab("guests")}
                >
                    Guest List
                </button>
            </nav>
        </header>

    )

}