import { Logo } from "./Logo";

interface User {
  name?: string;
}

interface HeaderProps {
  user?: User | null;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-outline-variant bg-white">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between">
        <div className="flex items-center justify-center">
          <Logo size="lg" />
        </div>

        <div className="flex items-center gap-3 px-5 py-4 lg:px-8">
          <div className="hidden text-right sm:block">
            <p className="font-plex text-xs text-on-surface-variant">
              Sesión activa
            </p>

            <p className="font-work text-sm font-semibold text-primary">
              {user?.name ?? "Administrador"}
            </p>
          </div>

          <button type="button" className="secondary-button" onClick={onLogout}>
            <span className="material-symbols-outlined text-[18px]">
              logout
            </span>
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
