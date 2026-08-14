import { useState } from 'react';
import { Input } from '../../../shared/components/Input';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PasswordInput({ value, onChange, error }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id="password"
        label="Contraseña"
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="••••••••"
        icon="lock"
        error={error}
        autoComplete="current-password"
      />
      <button
        type="button"
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        onClick={() => setVisible((current) => !current)}
        className="absolute right-3 top-[34px] text-outline transition hover:text-primary"
      >
        <span className="material-symbols-outlined">{visible ? 'visibility_off' : 'visibility'}</span>
      </button>
    </div>
  );
}
