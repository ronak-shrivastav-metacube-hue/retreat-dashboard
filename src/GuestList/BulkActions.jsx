export default function BulkActions({

    selectedCount,

}) {

    if (selectedCount === 0) {

        return null;

    }

    return (

        <div className="bulk-bar show">

            <span>

                {selectedCount} selected

            </span>

            <div className="spacer"></div>

            <button className="btn btn-secondary btn-sm">

                Send Reminder

            </button>

            <button className="btn btn-ghost btn-sm">

                Remind All Pending

            </button>

        </div>

    );

}