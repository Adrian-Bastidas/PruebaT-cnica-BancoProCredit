import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeFilters } from "../components/EmployeeFilters";
import { EmployeeModal } from "../components/EmployeeModal";
import { EmployeeTable } from "../components/EmployeeTable";
import { useEmployeesProvider } from "../context/EmployeesProvider";
import { useAuth } from "../../auth/context/AuthProvider";
import { Alert } from "../../../shared/components/Alert";
import { Spinner } from "../../../shared/components/Spinner";
import { Header } from "../../../shared/components/Header";
import type { Employee } from "../types/employee.types";
import { Pagination } from "../components/Pagination";
import { ConfirmDialog } from "../components/ConfirmDialog";

const PAGE_SIZE = 10;

export function EmployeesPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    employees,
    departments,
    loading,
    catalogLoading,
    creating,
    updating,
    deleting,
    error,
    setError,
    setCreateError,
    catalogError,
    createError,
    pagination,
    loadEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    loadCatalogs,
  } = useEmployeesProvider();

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  useEffect(() => {
    void loadEmployees(undefined, 1, PAGE_SIZE);
    void loadCatalogs();
  }, [loadEmployees, loadCatalogs]);

  const stats = useMemo(
    () => ({
      total: pagination.totalRecords,
      payroll: employees.reduce(
        (sum, employee) => sum + employee.remuneracionMensual,
        0,
      ),
    }),
    [employees, pagination.totalRecords],
  );

  const handleDepartmentChange = async (value: string) => {
    setDepartmentFilter(value);
    await loadEmployees(value ? Number(value) : undefined, 1, PAGE_SIZE);
  };

  const handleCreate = async (data: Parameters<typeof createEmployee>[0]) => {
    if (editingEmployee) {
      console.log(editingEmployee);
      const updated = await updateEmployee(editingEmployee.empleadoID, data);
      if (!updated) return;
    } else {
      const created = await createEmployee(data);
      if (!created) return;
    }

    setModalOpen(false);
    setEditingEmployee(null);
    await loadEmployees(
      departmentFilter ? Number(departmentFilter) : undefined,
      1,
      PAGE_SIZE,
    );
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;

    const success = await deleteEmployee(employeeToDelete.empleadoID);
    if (success) {
      setConfirmDeleteOpen(false);
      setEmployeeToDelete(null);
      await loadEmployees(
        departmentFilter ? Number(departmentFilter) : undefined,
        pagination.pageNumber,
        PAGE_SIZE,
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    void loadEmployees(
      departmentFilter ? Number(departmentFilter) : undefined,
      newPage,
      PAGE_SIZE,
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header user={user} onLogout={handleLogout} />

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-plex text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Administración
            </p>
            <h1 className="mt-1 font-work text-3xl font-semibold tracking-tight text-primary">
              Gestión de empleados
            </h1>
            <p className="mt-2 max-w-2xl font-work text-sm text-on-surface-variant">
              Consulta y registra la información del personal de Banco
              ProCredit.
            </p>
          </div>
          <button className="primary-button" onClick={() => setModalOpen(true)}>
            <span className="material-symbols-outlined text-[19px]">
              person_add
            </span>
            Nuevo empleado
          </button>
        </div>

        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-outline-variant bg-white p-5 shadow-card">
            <p className="font-plex text-xs font-medium uppercase tracking-wide text-on-surface-variant">
              Total de empleados
            </p>
            <p className="mt-1 font-work text-2xl font-semibold text-primary">
              {stats.total}
            </p>
          </div>
          <div className="rounded-lg border border-outline-variant bg-white p-5 shadow-card">
            <p className="font-plex text-xs font-medium uppercase tracking-wide text-on-surface-variant">
              Nómina total
            </p>
            <p className="mt-1 font-work text-2xl font-semibold text-primary">
              {new Intl.NumberFormat("es-EC", {
                style: "currency",
                currency: "USD",
              }).format(stats.payroll)}
            </p>
          </div>
        </div>

        {catalogError && (
          <div className="mb-4">
            <Alert message={catalogError} />
          </div>
        )}
        {error && (
          <div className="mb-4">
            <Alert message={error} />
          </div>
        )}

        {catalogLoading ? (
          <Spinner label="Preparando catálogos..." />
        ) : (
          <>
            <div className="mb-5">
              <EmployeeFilters
                departments={departments}
                value={departmentFilter}
                onChange={handleDepartmentChange}
              />
            </div>
            <EmployeeTable
              employees={employees}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Pagination
              pageNumber={pagination.pageNumber}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <EmployeeModal
        open={modalOpen}
        editingEmployee={editingEmployee}
        loading={creating || updating}
        error={createError}
        setCreateError={setCreateError}
        setError={setError}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Eliminar empleado"
        message={`¿Estás seguro de que deseas eliminar a ${employeeToDelete?.nombre} ${employeeToDelete?.apellido}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDeleteOpen(false);
          setEmployeeToDelete(null);
        }}
      />

      <footer className="border-t border-outline-variant bg-white px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 font-plex text-xs text-on-surface-variant sm:flex-row lg:px-3">
          <span>© 2026 Banco ProCredit. All Rights Reserved.</span>
          <span>Gestión interna de empleados</span>
        </div>
      </footer>
    </div>
  );
}
