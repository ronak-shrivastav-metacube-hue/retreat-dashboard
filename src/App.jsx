import { useEffect, useState } from "react";

import { storage } from "./utils/storage";
import {
  getGuestDetailsList,
  quickCheckIn,
  addGuest,
  resendGuestCheckInEmail,
  exportGuestsCSV,
  checkInByQrCode,
  importRSVP,
  getCountDashboard
} from "./services/apiService";

import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import GuestList from "./GuestList/GuestList";
import WalkinModal from "./Modals/WalkinModal/WalkinModal";
import Toast from "./Toast/Toast";

import QRScanner from "./Modals/QRScanner/QRScanner";
import ImportRSVPModal from "./Modals/ImportRSVPModal/ImportRSVPModal";
import ExportExcelModal from "./Modals/ExportExcelModal/ExportExcelModal";
import ConfirmModal from "./Modals/ConfirmModal/ConfirmModal";

function App() {

  const [employees, setEmployees] = useState([]);
  const [dashBoardCount, setDashBoardCount] = useState([]);
  const [activeTab, setActiveTab] = useState("guests");
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingInId, setCheckingInId] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showImportRSVP, setShowImportRSVP] = useState(false);

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
  const [showExportExcel, setShowExportExcel] = useState(false);
  const [showBulkReminderConfirm, setShowBulkReminderConfirm] = useState(false);

  // -----------------------------------------
  // API CONFIGURATION
  // -----------------------------------------

  // const EVENT_SLUG = "annual-retreat-26";
  const EVENT_SLUG = storage.get("event_slug") || "annual-retreat-26";
  const EVENT_DESC = storage.get("event_desc") || "One Family, One Day. Endless Memories"

  useEffect(() => {

    storage.set(
      "BASE_URL",
      "https://metacafe-uat-api.mcapps.in/api"
      // "http://localhost:8000/api"
    );

    // storage.set(
    //   "token",
    //   "Bearer 106854|zouj4wGbBF1Iuftn0LehJgNpHV88VaPSHKXJxUfha5c009e6"
    // );

    // storage.set(
    //   "EVENT_SLUG",
    //   EVENT_SLUG
    // );

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

      if (error.response?.status !== 401) {

        showToast(
          error.response?.data?.message ||
          "Something went wrong"
        );
      }

      window.location.href = '/';

    } finally {

      setTableLoading(false);

    }
  };


  // -----------------------------------------
  // DashBoard Count
  // -----------------------------------------

  const getDashboardCount = async () => {

    setLoading(true);

    try {

      const payload = {

        slug: EVENT_SLUG,

      };

      const response = await getCountDashboard(payload);

      if (response.success) {
        setDashBoardCount(response.data);
      }

    } catch (error) {

      showToast(error.response?.data?.message || "Something went wrong while checking in guest");

    } finally {

      setLoading(false);

    }

  };

  // Load guest list
  useEffect(() => {
    getDashboardCount();
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

      const response = await addGuest(payload);

      if (response.success) {

        showToast(`Guest ${selectedUser.email} checked in successfully`);

        // Close modal
        setShowWalkinModal(false);

        // Refresh guest list
        await getGuestList();

      } else {

        showToast(response.message || "Unable to check in guest");

      }

    } catch (error) {

      showToast(error.response?.data?.message || "Something went wrong while checking in guest");

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

        showToast(response.message || "Guest checked in successfully");

        await getGuestList();

      } else {
        showToast(response.message || "Unable to check in guest");
      }

    } catch (error) {
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
  // Send Export Mail
  // -----------------------------------------

  const exportCSV = async (exportType) => {

    const payload = {
      slug: EVENT_SLUG,
    };

    if (exportType === "filters") {
      payload.search = search;
      payload.status = status;
    }

    setLoading(true);

    try {

      const response = await exportGuestsCSV(payload);

      if (response.success) {

        showToast(
          response.message ||
          "Export sent to mail successfully"
        );

        setShowExportExcel(false);

        await getGuestList();

      } else {

        showToast(
          response.message ||
          "Unable to send export mail"
        );

      }

    } catch (error) {

      console.error(
        "Export error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while exporting guests"
      );

    } finally {

      setLoading(false);

    }
  };

  // SCANNING
  const handleScanSuccess = async (scannedString) => {
    try {

      const response = await checkInByQrCode(scannedString);
      if (response.success) {
        showToast(response.message);
        // Refresh guest list
        await getGuestList();
      } else {
        showToast(response?.message || "Something went wrong while checking in guest");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "QR Check-in Error:");
    } finally {
      setShowQRScanner(false)
    }
  };

  // -----------------------------------------
  // IMPORT RSVP
  // -----------------------------------------

  const openImportRSVPModal = () => {
    setShowImportRSVP(true);
  };


  const handleImportRSVP = async (file) => {

    if (!file) {
      showToast("Please select an Excel file");
      return null;
    }

    setLoading(true);

    try {

      const response = await importRSVP(
        file,
        EVENT_SLUG
      );

      if (response.success) {

        showToast(
          response.message || "RSVP imported successfully"
        );

        await getGuestList();

        return response;

      }

      showToast(
        response.message || "Unable to import RSVP"
      );

      return response;

    } catch (error) {

      console.error(
        "RSVP import error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while importing RSVP"
      );

      return null;

    } finally {

      setLoading(false);

    }
  };

  // -------------------
  // Load bulk conformation pop up modal
  // -----------------------
  const sendBulkReminder = async () => {

    setLoading(true);

    try {

      const payload = {
        event_slug: EVENT_SLUG
      };

      const response = await resendGuestCheckInEmail(payload);

      if (response.success) {

        showToast(
          response.message ||
          "Bulk reminder sent successfully"
        );

      } else {

        showToast(
          response.message ||
          "Unable to send bulk reminder"
        );

      }

    } catch (error) {

      console.error(
        "Bulk reminder error:",
        error
      );

      showToast(
        error.response?.data?.message ||
        "Something went wrong while sending bulk reminder"
      );

    } finally {

      setLoading(false);

      setShowBulkReminderConfirm(false);
    }
  };

  return (
    <>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main>
        {activeTab === "dashboard" ? (
          <Dashboard
            dashBoardCount={dashBoardCount}
            onRefresh={() =>
              getDashboardCount()}
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

            onExportCSV={() => setShowExportExcel(true)}

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
            onOpenScanner={() => setShowQRScanner(true)}
            onImportRSVP={openImportRSVPModal}
            onOpenConfirmationBox={() => setShowBulkReminderConfirm(true)}
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

      <QRScanner
        open={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScanSuccess={handleScanSuccess}
      />

      <ImportRSVPModal
        open={showImportRSVP}
        onClose={() => setShowImportRSVP(false)}
        eventSlug={EVENT_SLUG}
        onImport={handleImportRSVP}
        onSuccess={async () => {
          await getGuestList();
        }}
      />

      <ExportExcelModal
        open={showExportExcel}
        onClose={() => setShowExportExcel(false)}
        onExport={exportCSV}
        loading={loading}
      />

      <ConfirmModal
        open={showBulkReminderConfirm}
        onClose={() => setShowBulkReminderConfirm(false)}
        onConfirm={sendBulkReminder}
        title="Send Bulk Reminder"
        message="Do you really want to send a bulk reminder to all participants?"
        confirmText="Yes, Send Reminder"
        cancelText="Cancel"
        loading={loading}
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
