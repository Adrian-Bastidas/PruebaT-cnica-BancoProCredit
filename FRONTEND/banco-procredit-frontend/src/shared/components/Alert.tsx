interface Props {
  message: string;
  type?: 'error' | 'success' | 'info';
}

const styles = {
  error: 'border-red-200 bg-red-50 text-red-800',
  success: 'border-green-200 bg-green-50 text-green-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
};

export function Alert({ message, type = 'error' }: Props) {
  return (
    <div className={`flex items-start gap-2 rounded border px-3 py-2.5 font-plex text-sm ${styles[type]}`} role="alert">
      <span className="material-symbols-outlined text-[18px]">{type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info'}</span>
      <span>{message}</span>
    </div>
  );
}
