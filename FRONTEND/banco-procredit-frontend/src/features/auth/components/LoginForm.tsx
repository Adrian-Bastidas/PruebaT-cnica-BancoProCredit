import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "../../../shared/components/Alert";
import { Input } from "../../../shared/components/Input";
import { useAuth } from "../context/AuthProvider";
import type { LoginRequest } from "../types/auth.types";
import { PasswordInput } from "./PasswordInput";
import { cookieUtils } from "../../../shared/utils/cookieUtils";

const schema = z.object({
  Email: z.string().min(1, "Ingrese su usuario."),
  password: z.string().min(1, "Ingrese su contraseña."),
});

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, loading, error } = useAuth();
  const [remember, setRemember] = useState(
    cookieUtils.get("procredit_remember_user") === "true",
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      Email: cookieUtils.get("procredit_remembered_Email") ?? "",
      password: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: LoginRequest) => {
    setRemember(remember);
    if (remember)
      cookieUtils.set("procredit_remembered_Email", data.Email, {
        maxAge: 60 * 60 * 24 * 30,
      });
    // 30 días
    else cookieUtils.remove("procredit_remembered_Email");
    cookieUtils.set("procredit_remember_user", String(remember), {
      maxAge: 60 * 60 * 24 * 30,
    }); // 30 días
    const authenticated = await login(data, remember);

    if (authenticated) {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {error && <Alert message={error} />}
      <Input
        id="Email"
        label="Usuario"
        type="text"
        placeholder="usuario"
        icon="mail"
        autoComplete="Email"
        error={errors.Email?.message}
        {...register("Email")}
      />
      <PasswordInput
        value={password}
        onChange={(value) =>
          setValue("password", value, { shouldValidate: true })
        }
        error={errors.password?.message}
      />
      <div className="flex items-center justify-between gap-3 pt-1">
        <label className="flex cursor-pointer items-center gap-2 font-plex text-sm text-on-surface-variant">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-primary"
          />
          Recordar usuario
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="primary-button w-full py-3"
      >
        {loading ? "Ingresando..." : "Iniciar Sesión"}
        {!loading && (
          <span className="material-symbols-outlined text-[18px]">login</span>
        )}
      </button>
    </form>
  );
}
