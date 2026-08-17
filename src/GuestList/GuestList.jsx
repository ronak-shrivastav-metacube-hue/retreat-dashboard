import Toolbar from "./Toolbar";
import BulkActions from "./BulkActions";
import GuestTable from "./GuestTable";

export default function GuestList({
    employees,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    currentPage,
    setCurrentPage,
    onCheckin,
    onremindEmail,
    emailSendingIDs,
    openWalkinModal,
    onRefresh,
    loading,
    tableLoading,
    checkingInId,
    onPageChange,
    onSearch,
    onExportCSV,
    onOpenScanner,
    onImportRSVP,
    showExportExcel,
    onOpenConfirmationBox,
    remindMailId
}) {

    return (

        <section className="view active">

            <div className="section-label">

                <span className="eyebrow">
                    Roster
                </span>

                All Employees & Guests

            </div>


            <Toolbar

                search={search}

                setSearch={setSearch}

                status={status}

                setStatus={setStatus}

                openWalkinModal={openWalkinModal}

                onRefresh={onRefresh}

                onSearch={onSearch}

                loading={loading}

                onremindEmail = {onremindEmail}

                onExportCSV = {onExportCSV}
                onOpenScanner={onOpenScanner}
                onImportRSVP={onImportRSVP}
                showExportExcel={showExportExcel}
                onOpenConfirmationBox={onOpenConfirmationBox}
                remindMailId={remindMailId}

                filteredEmployees={employees}

            />


            <BulkActions
                selectedCount={0}
            />


            <GuestTable
                employees={employees}
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={onPageChange}
                onCheckin={onCheckin}
                onremindEmail={onremindEmail}
                checkingInId={checkingInId}
                tableLoading={tableLoading}
                emailSendingIDs={emailSendingIDs}
                remindMailId={remindMailId}
            />


        </section>

    );
}
