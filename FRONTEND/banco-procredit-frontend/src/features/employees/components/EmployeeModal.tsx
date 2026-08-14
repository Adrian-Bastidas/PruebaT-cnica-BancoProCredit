import { Modal } from "../../../shared/components/Modal";
import { EmployeeForm } from "./EmployeeForm";
import type { CreateEmployeeRequest, Employee } from "../types/employee.types";

interface Props {
  open: boolean;
  loading: boolean;
  error: string;
  editingEmployee?: Employee | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setCreateError: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onSubmit: (data: CreateEmployeeRequest) => Promise<void>;
}

export function EmployeeModal({
  open,
  loading,
  error,
  editingEmployee,
  setError,
  setCreateError,
  onClose,
  onSubmit,
}: Props) {
  const handleCancel = () => {
    setError("");
    setCreateError("");
    onClose?.();
  };

  const isEditing = !!editingEmployee;
  const title = isEditing ? "Editar empleado" : "Registrar nuevo empleado";

  return (
    <Modal open={open} title={title} onClose={handleCancel}>
      <EmployeeForm
        initialData={editingEmployee}
        loading={loading}
        error={error}
        setCreateError={setCreateError}
        setError={setError}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
