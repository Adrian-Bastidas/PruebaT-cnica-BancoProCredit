import type { Employee } from "../types/employee.types";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import { formatDate } from "../../../shared/utils/formatDate";
import { Spinner } from "../../../shared/components/Spinner";

interface Props {
  employees: Employee[];
  loading: boolean;
  onEdit?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
}

export function EmployeeTable({ employees, loading, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant bg-white shadow-card">
      {loading ? (
        <Spinner label="Cargando empleados..." />
      ) : employees.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <span className="material-symbols-outlined text-4xl text-outline">
            group_off
          </span>
          <h3 className="mt-3 font-work text-lg font-semibold text-primary">
            No hay empleados
          </h3>
          <p className="mt-1 font-work text-sm text-on-surface-variant">
            No encontramos empleados para el filtro seleccionado.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full border-collapse">
            <thead className="bg-primary text-left text-white">
              <tr>
                {[
                  "Documento",
                  "Empleado",
                  "Departamento",
                  "Cargo",
                  "Edad",
                  "Remuneración",
                  "Registro",
                  "Acciones",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 font-plex text-xs font-semibold uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.empleadoID}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-surface"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-plex text-sm font-medium text-primary">
                    {employee.numeroDocumento}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-work text-sm font-semibold text-on-surface">
                      {employee.nombre} {employee.apellido}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-work text-sm text-on-surface-variant">
                    {employee.departamento}
                  </td>
                  <td className="px-4 py-4 font-work text-sm text-on-surface-variant">
                    {employee.cargo}
                  </td>
                  <td className="px-4 py-4 font-plex text-sm text-on-surface-variant">
                    {employee.edad}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-plex text-sm font-semibold text-primary">
                    {formatCurrency(employee.remuneracionMensual)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-plex text-xs text-on-surface-variant">
                    {formatDate(employee.fechaRegistro)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(employee)}
                          className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-white transition-all hover:bg-primary/90"
                          title="Editar empleado"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(employee)}
                          className="inline-flex items-center justify-center rounded-md bg-secondary p-2 text-white transition-all hover:bg-secondary/90"
                          title="Eliminar empleado"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
