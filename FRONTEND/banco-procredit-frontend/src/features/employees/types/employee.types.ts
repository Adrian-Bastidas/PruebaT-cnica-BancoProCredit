export interface Employee {
  empleadoID: number;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  edad: number;
  remuneracionMensual: number;
  departamentoId: number;
  departamento: string;
  cargoID: number;
  cargo: string;
  fechaRegistro: string;
  activo: boolean;
}

export interface CreateEmployeeRequest {
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  edad: number;
  remuneracionMensual: number;
  departamentoID: number;
  cargoID: number;
}

export interface Department {
  departamentoID: number;
  nombreDepartamento: string;
}

export interface Position {
  cargoID: number;
  nombreCargo: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
