import { useEffect } from "react";

export default function Toast({ message }) {

    return (
        <div id="toast" className={message ? "show" : ""}>
            <span className="dot"></span>

            {message}

        </div>
    );
}