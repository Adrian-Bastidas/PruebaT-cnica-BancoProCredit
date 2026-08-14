interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="font-work text-lg font-semibold text-primary">
          {title}
        </h2>
        <p className="mt-2 font-work text-sm text-on-surface-variant">
          {message}
        </p>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-outline-variant bg-white px-4 py-2 font-plex text-sm font-medium text-primary transition-all hover:bg-surface disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 font-plex text-sm font-medium text-white transition-all hover:bg-secondary/90 disabled:opacity-50"
          >
            {loading && (
              <span className="material-symbols-outlined animate-spin text-[20px]">
                loading
              </span>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
