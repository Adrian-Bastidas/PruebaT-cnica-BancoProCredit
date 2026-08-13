using System;
using System.Collections.Generic;
using System.Text;

namespace BancoProcredit.Application.DTOs
{
    public class CreateEmpleadoDTO
    {
        public string NumeroDocumento { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Edad { get; set; }
        public decimal RemuneracionMensual { get; set; }
        public int DepartamentoID { get; set; }
        public int CargoID { get; set; }
    }
}