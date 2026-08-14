import type { SelectHTMLAttributes } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export function Select({ label, options, error, ...props }: Props) {
  return (
    <div>
      <label className="field-label" htmlFor={props.id}>{label}</label>
      <select {...props} className="field-input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 font-plex text-xs text-red-700">{error}</p>}
    </div>
  );
}
