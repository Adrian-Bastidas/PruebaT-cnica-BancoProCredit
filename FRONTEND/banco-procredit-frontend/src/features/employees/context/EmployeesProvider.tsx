/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { employeesService } from "../services/employees.service";
import type {
  CreateEmployeeRequest,
  Department,
  Employee,
  Position,
  PaginatedResponse,
} from "../types/employee.types";
import { createEmployeeFormData } from "../constants/employeeFormData.const";
import type { EmployeeDynamicFormField } from "../constants/employeeFormData.const";

interface EmployeesContextValue {
  employees: Employee[];
  departments: Department[];
  positions: Position[];
  employeeForm: EmployeeDynamicFormField[];
  loading: boolean;
  catalogLoading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setCreateError: React.Dispatch<React.SetStateAction<string>>;
  catalogError: string;
  createError: string;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  loadEmployees: (
    departmentId?: number,
    pageNumber?: number,
    pageSize?: number,
  ) => Promise<void>;
  loadCatalogs: () => Promise<void>;
  createEmployee: (payload: CreateEmployeeRequest) => Promise<Employee | null>;
  updateEmployee: (
    id: number,
    payload: CreateEmployeeRequest,
  ) => Promise<Employee | null>;
  deleteEmployee: (id: number) => Promise<boolean>;
}

const EmployeesContext = createContext<EmployeesContextValue | null>(null);

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [catalogError, setCatalogError] = useState("");
  const [createError, setCreateError] = useState("");
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [currentDepartmentFilter, setCurrentDepartmentFilter] = useState<
    number | undefined
  >();

  const loadEmployees = useCallback(
    async (
      departmentId?: number,
      pageNumber: number = 1,
      pageSize: number = 10,
    ) => {
      setLoading(true);
      setError("");
      setCurrentDepartmentFilter(departmentId);
      try {
        const response: PaginatedResponse<Employee> =
          await employeesService.getAll(departmentId, pageNumber, pageSize);
        setEmployees(response.data);
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalRecords: response.totalRecords,
          totalPages: response.totalPages,
          hasNextPage: response.hasNextPage,
          hasPreviousPage: response.hasPreviousPage,
        });
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            (err instanceof Error ? err.message : null) ||
            "No fue posible cargar los empleados.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loadCatalogs = useCallback(async () => {
    setCatalogLoading(true);
    setCatalogError("");
    try {
      const [departmentData, positionData] = await Promise.all([
        employeesService.getDepartments(),
        employeesService.getPositions(),
      ]);
      setDepartments(departmentData);
      setPositions(positionData);
    } catch (err: any) {
      setCatalogError(
        err?.response?.data?.message ||
          (err instanceof Error ? err.message : null) ||
          "No fue posible cargar los catálogos.",
      );
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  const createEmployee = useCallback(async (payload: CreateEmployeeRequest) => {
    setCreating(true);
    setCreateError("");
    try {
      return await employeesService.create(payload);
    } catch (err: any) {
      setCreateError(
        err?.response?.data?.message ||
          (err instanceof Error ? err.message : null) ||
          "No fue posible registrar al empleado.",
      );
      return null;
    } finally {
      setCreating(false);
    }
  }, []);

  const updateEmployee = useCallback(
    async (id: number, payload: CreateEmployeeRequest) => {
      setUpdating(true);
      setCreateError("");
      try {
        return await employeesService.update(id, payload);
      } catch (err: any) {
        setCreateError(
          err?.response?.data?.message ||
            (err instanceof Error ? err.message : null) ||
            "No fue posible actualizar al empleado.",
        );
        return null;
      } finally {
        setUpdating(false);
      }
    },
    [],
  );

  const deleteEmployee = useCallback(async (id: number) => {
    setDeleting(true);
    setError("");
    try {
      await employeesService.remove(id);
      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          (err instanceof Error ? err.message : null) ||
          "No fue posible eliminar al empleado.",
      );
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  const employeeForm = useMemo(
    () =>
      createEmployeeFormData(departments, positions).sort(
        (a, b) => a.orderId - b.orderId,
      ),
    [departments, positions],
  );

  const value = useMemo(
    () => ({
      employees,
      departments,
      positions,
      employeeForm,
      loading,
      catalogLoading,
      creating,
      updating,
      deleting,
      error,
      setError,
      catalogError,
      setCreateError,
      createError,
      pagination,
      loadEmployees,
      loadCatalogs,
      createEmployee,
      updateEmployee,
      deleteEmployee,
    }),
    [
      employees,
      departments,
      positions,
      employeeForm,
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
      loadCatalogs,
      createEmployee,
      updateEmployee,
      deleteEmployee,
    ],
  );

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployeesProvider() {
  const context = useContext(EmployeesContext);
  if (!context)
    throw new Error(
      "useEmployeesProvider debe utilizarse dentro de EmployeesProvider.",
    );
  return context;
}
