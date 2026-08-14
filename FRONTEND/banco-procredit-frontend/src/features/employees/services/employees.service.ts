import { api } from "../../../shared/services/api";
import type {
  CreateEmployeeRequest,
  Department,
  Employee,
  Position,
  PaginatedResponse,
} from "../types/employee.types";

export const employeesService = {
  async getAll(
    departmentId?: number,
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedResponse<Employee>> {
    const endpoint = departmentId
      ? `/empleados/departamento/${departmentId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      : `/empleados?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    const { data } = await api.get<PaginatedResponse<Employee>>(endpoint);
    return data;
  },

  async getById(id: number): Promise<Employee> {
    const { data } = await api.get<Employee>(`/empleados/${id}`);
    return data;
  },

  async create(payload: CreateEmployeeRequest): Promise<Employee> {
    const { data } = await api.post<Employee>("/empleados", payload);
    return data;
  },

  async update(id: number, payload: CreateEmployeeRequest): Promise<Employee> {
    const { data } = await api.put<Employee>(`/empleados/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/empleados/${id}`);
  },

  async getDepartments(): Promise<Department[]> {
    const { data } = await api.get<Department[]>("/departamentos");
    return data;
  },

  async getDepartmentById(id: number): Promise<Department> {
    const { data } = await api.get<Department>(`/departamentos/${id}`);
    return data;
  },

  async getPositions(): Promise<Position[]> {
    const { data } = await api.get<Position[]>("/cargos");
    return data;
  },

  async getPositionById(id: number): Promise<Position> {
    const { data } = await api.get<Position>(`/cargos/${id}`);
    return data;
  },
};
