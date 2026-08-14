import type { DynamicFormField } from "../../../shared/types/dynamicForm/dynamicForm.types";
import type { Department, Position } from "../types/employee.types";

export type EmployeeFormFieldName =
  | "numeroDocumento"
  | "nombre"
  | "apellido"
  | "edad"
  | "remuneracionMensual"
  | "departamentoID"
  | "cargoID";

export type EmployeeDynamicFormField = DynamicFormField<EmployeeFormFieldName>;

export const createEmployeeFormData = (
  departments: Department[],
  positions: Position[],
): EmployeeDynamicFormField[] => [
  {
    nameID: "numeroDocumento",
    type: "text",
    maxLength: 20,
    required: true,
    isNumber: true,
    isAllChapter: true,
    isNotSpace: true,
    orderId: 0,
    isInitialFields: true,
    label: "Número de documento",
    placeholder: "1234567890",
  },
  {
    nameID: "nombre",
    type: "text",
    maxLength: 100,
    required: true,
    isAllChapter: true,
    isNotSpace: false,
    orderId: 1,
    isInitialFields: true,
    label: "Nombre",
    placeholder: "Juan",
  },
  {
    nameID: "apellido",
    type: "text",
    maxLength: 100,
    required: true,
    isAllChapter: true,
    isNotSpace: false,
    orderId: 2,
    isInitialFields: true,
    label: "Apellido",
    placeholder: "García",
  },
  {
    nameID: "edad",
    type: "number",
    maxLength: 3,
    required: true,
    isNumber: true,
    isAllChapter: true,
    isNotSpace: true,
    orderId: 3,
    isInitialFields: true,
    label: "Edad",
    min: 18,
    max: 65,
    placeholder: "30",
  },
  {
    nameID: "remuneracionMensual",
    type: "number",
    required: true,
    isNumber: true,
    isAllChapter: true,
    isNotSpace: true,
    orderId: 4,
    isInitialFields: true,
    label: "Remuneración mensual",
    min: 0,
    step: "0.01",
    placeholder: "2500.00",
  },
  {
    nameID: "departamentoID",
    type: "select",
    required: true,
    isAllChapter: true,
    isNotSpace: true,
    orderId: 5,
    isInitialFields: true,
    label: "Departamento",
    options: departments.map((item) => ({
      value: item.departamentoID,
      label: item.nombreDepartamento,
    })),
  },
  {
    nameID: "cargoID",
    type: "select",
    required: true,
    isAllChapter: true,
    isNotSpace: true,
    orderId: 6,
    isInitialFields: true,
    label: "Cargo",
    options: positions.map((item) => ({
      value: item.cargoID,
      label: item.nombreCargo,
    })),
  },
];
