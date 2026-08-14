using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.DTOs;
using FluentValidation;

namespace BancoProcredit.Application.Validators
{
    public class CreateEmpleadoValidator : AbstractValidator<CreateEmpleadoDTO>
    {
        public CreateEmpleadoValidator()
        {
            RuleFor(x => x.NumeroDocumento)
                .NotEmpty().WithMessage("El número de documento es requerido")
                .Length(5, 20).WithMessage("El documento debe tener entre 5 y 20 caracteres");

            RuleFor(x => x.Nombre)
                .NotEmpty().WithMessage("El nombre es requerido")
                .MaximumLength(100).WithMessage("El nombre no puede exceder 100 caracteres");

            RuleFor(x => x.Apellido)
                .NotEmpty().WithMessage("El apellido es requerido")
                .MaximumLength(100).WithMessage("El apellido no puede exceder 100 caracteres");

            RuleFor(x => x.Edad)
                .GreaterThanOrEqualTo(18).WithMessage("La edad mínima es 18")
                .LessThanOrEqualTo(65).WithMessage("La edad máxima es 65");

            RuleFor(x => x.RemuneracionMensual)
                .GreaterThan(0).WithMessage("La remuneración debe ser mayor a 0");

            RuleFor(x => x.DepartamentoID)
                .GreaterThan(0).WithMessage("El departamento es requerido");

            RuleFor(x => x.CargoID)
                .GreaterThan(0).WithMessage("El cargo es requerido");
        }
    }
}