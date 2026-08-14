using System;
using System.Collections.Generic;
using System.Text;

namespace BancoProcredit.Domain.Entities
{
    public class Departamento
    {
        public int DepartamentoID { get; set; }
        public string NombreDepartamento { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Activo { get; set; }

        // Navigation property
        public ICollection<Empleado> Empleados { get; set; }

        public Departamento()
        {
            FechaCreacion = DateTime.Now;
            Activo = true;
            Empleados = new List<Empleado>();
        }
    }
}