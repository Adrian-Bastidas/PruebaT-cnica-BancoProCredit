using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Application.Mappings;
using BancoProcredit.Application.Services;
using BancoProcredit.Application.Validators;
using BancoProcredit.Domain.Interfaces;
using BancoProcredit.Infrastructure.Persistence.Data;
using BancoProcredit.Infrastructure.Persistence.Repositories;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BancoProcredit.Infrastructure.Configuration
{
    public static class ServiceConfiguration
    {
        public static IServiceCollection AddInfrastructureServices(
            this IServiceCollection services,
            string connectionString)
        {
            // Registrar DbContext
            services.AddDbContext<BancoProcreditContext>(options =>
                options.UseSqlServer(connectionString)
            );

            // Registrar Repositories
            services.AddScoped<IEmpleadoRepository, EmpleadoRepository>();
            services.AddScoped<IDepartamentoRepository, DepartamentoRepository>();
            services.AddScoped<ICargoRepository, CargoRepository>();

            // Registrar Services
            services.AddScoped<IEmpleadoService, EmpleadoService>();
            services.AddScoped<IDepartamentoService, DepartamentoService>();
            services.AddScoped<ICargoService, CargoService>();

            // Registrar AutoMapper
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            // Registrar Validators
            services.AddValidatorsFromAssemblyContaining<CreateEmpleadoValidator>();

            return services;
        }
    }
}