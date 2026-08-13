using System;
using System.Collections.Generic;
using System.Text;

namespace BancoProcredit.Application.DTOs
{
    public class EmpleadoDTO
    {
        public int EmpleadoID { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
        public decimal RemuneracionMensual { get; set; }
        public int DepartamentoID { get; set; }
        public string Departamento { get; set; }
        public int CargoID { get; set; }
        public string Cargo { get; set; }
        public DateTime FechaRegistro { get; set; }
        public bool Activo { get; set; }

        public string NombreCompleto => $"{Nombre} {Apellido}";
    }
}
