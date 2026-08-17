import axios from "axios";
import { storage } from "../utils/storage";

const TOKEN = "Bearer "+ storage.get("token");
// const TOKEN =  storage.get("token"); // for local testing without Bearer prefix
const BASE_URL = storage.get("BASE_URL") || "https://metacafe-uat-api.mcapps.in/api";
// const BASE_URL = storage.get("BASE_URL") || "http://localhost:8000/api";
// Get guest list
export const getCountDashboard = async ({
    slug
}) => {


    const response = await axios.get(
        `${BASE_URL}/event/get-count/${slug}`,
        {

            headers: {
                Authorization: TOKEN
            }
        }
    );

    return response.data;
};
// Get guest list
export const getGuestDetailsList = async ({
    slug,
    page = 1,
    perPage = 10,
    search = "",
    status = ""
}) => {


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

    const params = {};

    if (search) {
        params.search = search;
    }

    if (status) {
        params.status = status;
    }
    
    const response = await axios.get(
        `${BASE_URL}/event/export-guest-list/${slug}`,
        {
            params: params,

            headers: {
                Authorization: TOKEN
            }
        }
    );

    return response.data;
};


// Quick check-in
export const quickCheckIn = async (guest, undo = false) => {


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
        console.log(error)
        throw error;
        
    }
};
// Send Reminder Mail
export const resendGuestCheckInEmail = async (payload) => {
    
    
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
        
        console.log(error)
        throw error;
        
    }
};

// Get user
export const getCustomers = async (searchText, eventSlug) => {
    
    
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
        console.log(error)
        
        throw error;
        
    }
};

// Register walk-in guest
export const addGuest = async (payload) => {
    
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
        console.log(error)
        throw error;
    }
};

// QR Code check-in
export const checkInByQrCode = async (qrString) => {
    
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
        
        console.log(error)
        throw error;
        
    }
};

export const importRSVP = async (file, eventSlug) => {
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

