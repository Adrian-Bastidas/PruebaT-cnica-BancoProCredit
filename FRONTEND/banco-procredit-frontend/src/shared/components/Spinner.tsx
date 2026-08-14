interface Props {
  label?: string;
}

export function Spinner({ label = 'Cargando...' }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-on-surface-variant">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      <span className="font-plex text-sm">{label}</span>
    </div>
  );
}
