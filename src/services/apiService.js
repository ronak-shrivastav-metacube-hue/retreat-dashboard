import axios from "axios";
import { storage } from "../utils/storage";

const TOKEN = "Bearer "+ storage.get("token");
// Get guest list
export const getGuestDetailsList = async ({
    slug,
    page = 1,
    perPage = 10,
    search = "",
    status = ""
}) => {

    const BASE_URL = storage.get("BASE_URL");

    const response = await axios.get(
        `${BASE_URL}/event/new/guest-list/${slug}`,
        {
            params: {
                page,
                per_page: perPage,
                search,
                status
            },

            headers: {
                Authorization: TOKEN
            }
        }
    );

    return response.data;
};

// Export guest list
export const exportGuestsCSV = async ({
    slug,
    // page = 1,
    // perPage = 10,
    search = "",
    status = ""
}) => {

    const BASE_URL = storage.get("BASE_URL");

    const response = await axios.get(
        `${BASE_URL}/event/export-guest-list/${slug}`,
        {
            params: {
                // page,
                // per_page: perPage,
                search,
                status
            },

            headers: {
                Authorization: TOKEN
            }
        }
    );

    return response.data;
};


// Quick check-in
export const quickCheckIn = async (guest, undo = false) => {

    const BASE_URL = storage.get("BASE_URL");

    try {

        const response = await axios.post(
            `${BASE_URL}/event/quick-check-in`,
            {
                user_id: guest.user_id,
                event_id: guest.event_id,
                id: guest.id,
                undo_operation: undo
            },
            {
                headers: {
                    Authorization: TOKEN
                }
            }
        );

        return response.data;

    } catch (error) {

        throw error;

    }
};
// Send Reminder Mail
export const resendGuestCheckInEmail = async (payload) => {

    const BASE_URL = storage.get("BASE_URL");

    try {

        const response = await axios.post(
            `${BASE_URL}/event/send-specific-user-invitation`,
            payload,
            {
                headers: {
                    Authorization: TOKEN
                }
            }
        );

        return response.data;

    } catch (error) {

        throw error;

    }
};

// Get user
export const getCustomers = async (searchText, eventSlug) => {

    const BASE_URL = storage.get("BASE_URL");

    try {

        const response = await axios.get(
            `${BASE_URL}/user/list`,
            {
                params: {
                    page: 1,
                    slug: eventSlug,
                    q: searchText.trim(),
                    non_selected_only: true,
                    include_helpers: true
                },
                headers: {
                    Authorization: TOKEN
                }
            }
        );

        return response.data;

    } catch (error) {

        throw error;

    }
};

// Register walk-in guest
export const addGuest = async (payload) => {
    const BASE_URL = storage.get("BASE_URL");

    try {
        const response = await axios.post(
            `${BASE_URL}/event/register-walk-in`,
            payload,
            {
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data;

    } catch (error) {
        throw error;
    }
};

// QR Code check-in
export const checkInByQrCode = async (qrString) => {

    const BASE_URL = storage.get("BASE_URL");

    try {

        const response = await axios.post(
            `${BASE_URL}/event/check-in/${encodeURIComponent(qrString)}`,
            {},
            {
                headers: {
                    Authorization: TOKEN
                }
            }
        );

        return response.data;

    } catch (error) {

        throw error;

    }
};

export const importRSVP = async (file, eventSlug) => {
    const BASE_URL = storage.get("BASE_URL");
    try {
        const formData = new FormData();

        formData.append("rsvpExcel", file);
        formData.append("event_slug", eventSlug);

        const response = await axios.post(
            `${BASE_URL}/event/import/rsvp`,
            formData,
            {
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    } catch (error) {

        console.error("Import RSVP API error:", error);

        throw error;
    }
};

