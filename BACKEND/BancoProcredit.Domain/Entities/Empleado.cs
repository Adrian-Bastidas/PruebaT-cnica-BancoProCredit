using System;
using System.Collections.Generic;
using System.Text;

namespace BancoProcredit.Domain.Entities
{
    public class Empleado
    {
        public int EmpleadoID { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
        public decimal RemuneracionMensual { get; set; }
        public int DepartamentoID { get; set; }
        public int CargoID { get; set; }
        public DateTime FechaRegistro { get; set; }
        public bool Activo { get; set; }

        // Navigation properties
        public Departamento Departamento { get; set; }
        public Cargo Cargo { get; set; }

        public Empleado()
        {
            FechaRegistro = DateTime.Now;
            Activo = true;
        }
    }
}