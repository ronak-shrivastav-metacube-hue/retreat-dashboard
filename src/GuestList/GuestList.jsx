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
    openWalkinModal,
    onRefresh,
    loading,
    tableLoading,
    checkingInId,
    onPageChange,
    onSearch,
    onOpenScanner
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

                onOpenScanner={onOpenScanner}

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
                checkingInId={checkingInId}
                tableLoading={tableLoading}
            />


        </section>

    );
}
