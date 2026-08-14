import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useEffect } from "react";

import { Alert } from "../../../shared/components/Alert";
import { Spinner } from "../../../shared/components/Spinner";
import { DynamicFormField } from "../../../shared/components/dynamic-form/DynamicFormField";

import { useEmployeesProvider } from "../context/EmployeesProvider";
import type { CreateEmployeeRequest, Employee } from "../types/employee.types";
import type { EmployeeDynamicFormField } from "../constants/employeeFormData.const";

const defaultValues: CreateEmployeeRequest = {
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  edad: 18,
  remuneracionMensual: 0,
  departamentoID: 0,
  cargoID: 0,
};

interface EmployeeFormContentProps {
  fields: EmployeeDynamicFormField[];
  loading: boolean;
  error: string;
  isEditing: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setCreateError: React.Dispatch<React.SetStateAction<string>>;
  onCancel: () => void;
  onSubmit: (data: CreateEmployeeRequest) => Promise<void>;
}

function EmployeeFormContent({
  fields,
  loading,
  error,
  isEditing,
  setError,
  setCreateError,
  onCancel,
  onSubmit,
}: EmployeeFormContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CreateEmployeeRequest>();
  const handleCancel = () => {
    setError("");
    setCreateError("");
    onCancel?.();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <div className="mb-4">
          <Alert message={error} />
        </div>
      )}

      <div className="flex w-full flex-col items-center justify-center rounded bg-formBackgroundColor sm:px-2">
        <div className="relative w-full -translate-y-3 translate-x-2">
          <span className="rounded bg-white p-1 font-work text-sm font-medium text-primary">
            Información del empleado
          </span>
        </div>

        <div className="flex w-full flex-col pb-3">
          <div className="flex flex-col sm:flex-row sm:flex-wrap">
            {fields
              .filter((item) => item.isInitialFields)
              .map((item) => (
                <DynamicFormField<CreateEmployeeRequest>
                  key={item.nameID}
                  field={item}
                  register={register}
                  error={errors[item.nameID as keyof CreateEmployeeRequest]}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col-reverse items-center justify-center gap-3 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="secondary-button min-w-32 w-full justify-center sm:w-auto"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="primary-button min-w-32 w-full justify-center sm:w-auto"
        >
          {loading ? (
            <Spinner label="" />
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">
                {isEditing ? "edit" : "person_add"}
              </span>
              {isEditing ? "Actualizar" : "Registrar"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

interface Props {
  loading: boolean;
  error: string;
  initialData?: Employee | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setCreateError: React.Dispatch<React.SetStateAction<string>>;
  onCancel: () => void;
  onSubmit: (data: CreateEmployeeRequest) => Promise<void>;
}

export function EmployeeForm({
  loading,
  error,
  initialData,
  setError,
  onCancel,
  setCreateError,
  onSubmit,
}: Props) {
  const { employeeForm } = useEmployeesProvider();
  const isEditing = !!initialData;

  const methods = useForm<CreateEmployeeRequest>({
    defaultValues: initialData
      ? {
          numeroDocumento: initialData.numeroDocumento,
          nombre: initialData.nombre,
          apellido: initialData.apellido,
          edad: initialData.edad,
          remuneracionMensual: initialData.remuneracionMensual,
          departamentoID: initialData.departamentoId,
          cargoID: initialData.cargoID,
        }
      : defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialData) {
      methods.reset({
        numeroDocumento: initialData.numeroDocumento,
        nombre: initialData.nombre,
        apellido: initialData.apellido,
        edad: initialData.edad,
        remuneracionMensual: initialData.remuneracionMensual,
        departamentoID: initialData.departamentoId,
        cargoID: initialData.cargoID,
      });
    } else {
      methods.reset(defaultValues);
    }
  }, [initialData, methods]);

  return (
    <FormProvider {...methods}>
      <EmployeeFormContent
        fields={employeeForm}
        loading={loading}
        isEditing={isEditing}
        setError={setError}
        error={error}
        setCreateError={setCreateError}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
