interface PaginationProps {
  pageNumber: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export function Pagination({
  pageNumber,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="font-plex text-sm text-on-surface-variant">
        Página <span className="font-semibold text-primary">{pageNumber}</span> de{" "}
        <span className="font-semibold text-primary">{totalPages}</span>
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={!hasPreviousPage}
          className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 font-plex text-sm font-medium text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-surface"
        >
          <span className="material-symbols-outlined text-[20px]">
            chevron_left
          </span>
          Anterior
        </button>

        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={!hasNextPage}
          className="flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 font-plex text-sm font-medium text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-surface"
        >
          Siguiente
          <span className="material-symbols-outlined text-[20px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
