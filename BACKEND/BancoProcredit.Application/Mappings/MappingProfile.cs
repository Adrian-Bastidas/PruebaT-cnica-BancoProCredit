using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using BancoProcredit.Application.DTOs;
using BancoProcredit.Domain.Entities;

namespace BancoProcredit.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Empleado
            CreateMap<Empleado, EmpleadoDTO>()
                .ForMember(dest => dest.Departamento, opt => opt.MapFrom(src => src.Departamento.NombreDepartamento))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo.NombreCargo))
                .ReverseMap();

            CreateMap<CreateEmpleadoDTO, Empleado>();

            // Departamento
            CreateMap<Departamento, DepartamentoDTO>().ReverseMap();

            // Cargo
            CreateMap<Cargo, CargoDTO>().ReverseMap();
        }
    }
}