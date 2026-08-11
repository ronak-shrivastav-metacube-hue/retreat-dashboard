import { useEffect, useState } from "react";

import { storage } from "./utils/storage";
import {
  getGuestDetailsList,
  quickCheckIn,
  addGuest,
  resendGuestCheckInEmail,
  exportGuestsCSV
} from "./services/apiService";

import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import GuestList from "./GuestList/GuestList";
import WalkinModal from "./WalkinModal/WalkinModal";
import Toast from "./Toast/Toast";

function App() {

  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("guests");
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingInId, setCheckingInId] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // -----------------------------------------
  // API CONFIGURATION
  // -----------------------------------------

  const EVENT_SLUG = "annual-retreat-26";

  useEffect(() => {

    storage.set(
      "BASE_URL",
      "http://localhost:8000/api"
    );

    storage.set(
      "TOKEN",
      "Bearer 157485|GZqt2SJLs5bdylkklYHe3GamIujroac8fP3jIPux68639db5"
    );

    storage.set(
      "EVENT_SLUG",
      EVENT_SLUG
    );

  }, []);


  // -----------------------------------------
  // GET GUEST LIST
  // -----------------------------------------
  const getGuestList = async (
    page = currentPage,
    searchValue = search,
    statusValue = status
  ) => {

    // Show table loader for pagination/filter/search/refresh
    setTableLoading(true);

    try {

      const response = await getGuestDetailsList({
        slug: EVENT_SLUG,
        page: page,
        perPage: 10,
        search: searchValue,
        status: statusValue
      });

      if (response.success) {

        const guests = (response.data || []).map((guest) => ({
          id: guest.id,

          user_id: guest.user_id,

          name: [
            guest.user?.first_name,
            guest.user?.last_name
          ]
            .filter(Boolean)
            .join(" "),

          email: guest.user?.email || "",

          checkin_time: guest.check_in_time,

          isWalkin: false,

          event_id: guest.event_id,

          rsvp_spouse: guest.rsvp_spouse,

          rsvp_kids_count: guest.rsvp_kids_count,

          check_in_spouse: guest.check_in_spouse,

          check_in_kids_count: guest.check_in_kids_count
        }));

        setEmployees(guests);

        setPagination(
          response.meta || {
            current_page: page,
            per_page: 10,
            total: 0,
            last_page: 1,
            from: 0,
            to: 0
          }
        );

      } else {

        showToast(
          response.message ||
          "Unable to load guests"
        );

        setEmployees([]);

      }

    } catch (error) {

      console.error("Guest list error:", error);

      if (error.response?.status !== 401) {

        showToast(
          error.response?.data?.message ||
          "Something went wrong"
        );

      }

    } finally {

      setTableLoading(false);

    }
  };

  // Load guest list
  useEffect(() => {
    getGuestList();
  }, []);

  const handlePageChange = (page) => {

    setCurrentPage(page);

    getGuestList(
      page,
      search,
      status,
      true
    );

  };


  const handleSearch = () => {

    setCurrentPage(1);

    getGuestList(
      1,
      search,
      status
    );

  };

  const handleStatusChange = (value) => {

    setStatus(value);

    setCurrentPage(1);

    getGuestList(
      1,
      search,
      value
    );

  };


  // -----------------------------------------
  // TOAST HELPER
  // -----------------------------------------

  const showToast = (message) => {

    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);

  };


  // -----------------------------------------
  // REGISTER WALK-IN GUEST
  // -----------------------------------------

  const handleWalkin = async (selectedUser) => {

    if (!selectedUser) {
      return;
    }

    setLoading(true);

    try {

      const payload = {

        event_slug: EVENT_SLUG,

        user_id: selectedUser.id

      };

      console.log("Walk-in payload:", payload);

      const response = await addGuest(payload);

      if (response.success) {

        showToast(
          `Guest ${selectedUser.email} checked in successfully`
        );

        // Close modal
        setShowWalkinModal(false);

        // Refresh guest list
        await getGuestList();

      } else {

        showToast(
          response.message ||
          "Unable to check in guest"
        );

      }

    } catch (error) {

      console.error(
        "Walk-in registration error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while checking in guest"
      );

    } finally {

      setLoading(false);

    }

  };


  // -----------------------------------------
  // QUICK CHECK-IN
  // -----------------------------------------

  const handleCheckin = async (employee, undo = false) => {

    setCheckingInId(employee.id);

    try {

      const response = await quickCheckIn(employee, undo);

      if (response.success) {

        showToast(
          response.message ||
          "Guest checked in successfully"
        );

        await getGuestList();

      } else {

        showToast(
          response.message ||
          "Unable to check in guest"
        );

      }

    } catch (error) {

      console.error(
        "Quick check-in error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while checking in guest"
      );

    } finally {

      setCheckingInId(null);

    }

  };

  // -----------------------------------------
  // Send Remind Mail
  // -----------------------------------------

  const remindEmail = async (employee = null) => {

    const payload = {
      event_slug: EVENT_SLUG,
      ...(employee != null && { user_id: employee.user_id })
    };
    try {

      const response = await resendGuestCheckInEmail(payload);

      if (response.success) {

        showToast(
          response.message ||
          "Guest checked in successfully"
        );

        await getGuestList();

      } else {

        showToast(
          response.message ||
          "Unable to check in guest"
        );

      }

    } catch (error) {

      console.error(
        "Quick check-in error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while checking in guest"
      );

    } finally {

      setCheckingInId(null);

    }

  };

  // -----------------------------------------
  // Send Remind Mail
  // -----------------------------------------

  const exportCSV = async () => {

    const payload = {
      slug: EVENT_SLUG,
      // page: page,
      // perPage: 10,
      search: search,
      status: status
    };
    try {

      const response = await exportGuestsCSV(payload);

      if (response.success) {

        showToast(
          response.message ||
          "Export sent to mail successfully"
        );

        await getGuestList();

      } else {

        showToast(
          response.message ||
          "Unable to sent export mail"
        );

      }

    } catch (error) {

      console.error(
        "Export error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while exporting in guest"
      );

    }
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />


      <main>

        {activeTab === "dashboard" ? (

          <Dashboard
            employees={employees}
          />

        ) : (

          <GuestList
            employees={employees}

            pagination={pagination}

            search={search}
            setSearch={setSearch}

            status={status}
            setStatus={handleStatusChange}

            currentPage={currentPage}
            setCurrentPage={setCurrentPage}

            onPageChange={handlePageChange}

            onSearch={handleSearch}

            onCheckin={handleCheckin}

            onremindEmail={remindEmail}

            onExportCSV={exportCSV}

            openWalkinModal={() =>
              setShowWalkinModal(true)
            }

            onRefresh={() =>
              getGuestList(
                currentPage,
                search,
                status
              )
            }

            loading={loading}
            tableLoading={tableLoading}

            checkingInId={checkingInId}
          />
        )}

      </main>


      <WalkinModal

        open={showWalkinModal}

        onClose={() =>
          setShowWalkinModal(false)
        }

        onSave={handleWalkin}

        eventSlug={EVENT_SLUG}

        loading={loading}

      />

      <Toast

        message={toast}

        onClose={() =>
          setToast("")
        }

      />

      {loading && (

        <div className="loading-overlay">
          Loading...
        </div>

      )}

    </>
  );
}

export default App;
