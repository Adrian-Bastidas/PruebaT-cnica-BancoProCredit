import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: string;
}

export function Input({ label, error, icon, className = '', ...props }: Props) {
  return (
    <div>
      <label className="field-label" htmlFor={props.id}>{label}</label>
      <div className="relative">
        {icon && <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">{icon}</span>}
        <input {...props} className={`field-input ${icon ? 'pl-10' : ''} ${className}`} />
      </div>
      {error && <p className="mt-1 font-plex text-xs text-red-700">{error}</p>}
    </div>
  );
}
