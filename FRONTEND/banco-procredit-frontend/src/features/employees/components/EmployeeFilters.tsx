import type { Department } from "../types/employee.types";

interface Props {
  departments: Department[];
  value: string;
  onChange: (value: string) => void;
}

export function EmployeeFilters({ departments, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-outline-variant bg-white p-4 shadow-card sm:flex-row sm:items-end sm:justify-between">
      <div className="w-full max-w-sm">
        <label className="field-label" htmlFor="department-filter">
          Filtrar por departamento
        </label>
        <select
          id="department-filter"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          className="field-input"
        >
          <option value="">Todos los departamentos</option>
          {departments.map((department) => (
            <option
              key={department.departamentoID}
              value={String(department.departamentoID)}
            >
              {department.nombreDepartamento}
            </option>
          ))}
        </select>
      </div>
      <div className="font-plex text-xs text-on-surface-variant">
        La búsqueda se prepara para consultar el departamento en el API.
      </div>
    </div>
  );
}
