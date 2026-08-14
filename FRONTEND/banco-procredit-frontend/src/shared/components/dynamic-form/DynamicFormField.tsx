import type {
  FieldError,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import type { DynamicFormField as DynamicFormFieldConfig } from "../../types/dynamicForm/dynamicForm.types";

interface Props<T extends FieldValues> {
  field: DynamicFormFieldConfig;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export function DynamicFormField<T extends FieldValues>({
  field,
  register,
  error,
}: Props<T>) {
  const name = field.nameID as FieldPath<T>;

  const validation: RegisterOptions<T> = {
    required: field.required ? `${field.label} es obligatorio.` : undefined,

    maxLength: field.maxLength
      ? {
          value: field.maxLength,
          message: `Máximo ${field.maxLength} caracteres.`,
        }
      : undefined,

    min:
      field.min !== undefined
        ? {
            value: field.min,
            message: `El valor mínimo es ${field.min}.`,
          }
        : undefined,

    max:
      field.max !== undefined
        ? {
            value: field.max,
            message: `El valor máximo es ${field.max}.`,
          }
        : undefined,

    valueAsNumber: field.type === "number",
  };

  const registration = register(name, validation);

  const inputClass = `w-full rounded border ${
    error ? "border-error" : "border-outline-variant"
  } bg-white px-3 py-2.5 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim ${
    field.className ?? ""
  }`;

  const commonProps = {
    id: field.nameID,
    placeholder: field.placeholder,
    maxLength: field.maxLength,
    required: field.required,
    className: inputClass,
    ...registration,
  };

  const input =
    field.type === "select" ? (
      <select {...commonProps} defaultValue="">
        <option value="" disabled>
          Seleccione una opción
        </option>

        {field.options?.map((option) => (
          <option key={`${field.nameID}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        {...commonProps}
        type={field.type}
        min={field.min}
        max={field.max}
        step={field.step}
        inputMode={field.isNumber ? "numeric" : undefined}
      />
    );

  return (
    <div className="w-full p-2 sm:w-1/2">
      <label
        htmlFor={field.nameID}
        className="mb-1.5 block font-plex text-sm font-medium text-on-surface"
      >
        {field.label}

        {field.required && <span className="ml-1 text-secondary">*</span>}
      </label>

      {input}

      {error?.message && (
        <p className="mt-1 font-plex text-xs text-error">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}
