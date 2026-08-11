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
    openWalkinModal,
    onRefresh,
    loading,
    tableLoading,
    checkingInId,
    onPageChange,
    onSearch,
<<<<<<< HEAD
    onExportCSV
=======
    onOpenScanner
>>>>>>> bbeceab4b73274c629f919f5879fb43ad8659f5a
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

<<<<<<< HEAD
                onremindEmail = {onremindEmail}

                onExportCSV = {onExportCSV}
=======
                onOpenScanner={onOpenScanner}
>>>>>>> bbeceab4b73274c629f919f5879fb43ad8659f5a

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
            />


        </section>

    );
}
