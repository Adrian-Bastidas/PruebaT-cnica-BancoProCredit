import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { Logo } from "../../../shared/components/Logo";
import { useAuth } from "../context/AuthProvider";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/employees" replace />;
  }

  const handleLoginSuccess = () => {
    const from = (location.state as { from?: string } | null)?.from;
    navigate(from ?? "/employees", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface text-on-surface">
      <main className="flex w-full max-w-[420px] flex-1 flex-col justify-center px-5 py-10 md:px-0">
        <div className=" flex justify-center">
          <Logo />
        </div>

        <section className="w-full rounded-lg border border-outline-variant bg-white p-6 shadow-card md:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-work text-2xl font-semibold text-primary">
              Acceso Administrativo
            </h1>
            <p className="mt-2 font-work text-sm text-on-surface-variant">
              Ingrese sus credenciales para continuar.
            </p>
          </div>
          <LoginForm onSuccess={handleLoginSuccess} />
        </section>

        <div className="mt-4 flex items-center justify-center gap-2 text-on-surface-variant opacity-70">
          <span className="material-symbols-outlined text-base">
            lock_person
          </span>
          <span className="font-work text-xs">Conexión cifrada y segura</span>
        </div>
      </main>

      <footer className="w-full border-t border-outline-variant bg-surface-low px-5 py-4 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
          <div className="font-plex text-xs font-bold text-primary">
            © 2026 Banco ProCredit. All Rights Reserved.
          </div>
          <div className="flex gap-5 font-work text-xs text-on-surface-variant">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
            <button>Internal Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
