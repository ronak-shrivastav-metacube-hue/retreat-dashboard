import "./ConfirmModal.css";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Please confirm this action.",
  confirmText = "Yes",
  cancelText = "Cancel",
  loading = false,
  variant = "primary",
  children = null
}) {
  if (!open) {
    return null;
  }

  const handleConfirm = () => {
    if (loading) {
      return;
    }

    onConfirm();
  };

  return (
    <div className="confirm-modal-overlay">

      <div className="confirm-modal">

        {/* Header */}
        <div className="confirm-modal-header">

          <h3>{title}</h3>

          <button
            type="button"
            className="confirm-modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Body */}
        <div className="confirm-modal-body">

          <p>{message}</p>

          {children}

        </div>

        {/* Footer */}
        <div className="confirm-modal-footer">

          <button
            type="button"
            className="confirm-modal-cancel"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`confirm-modal-confirm ${variant}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}