using System;
using System.Collections.Generic;
using System.Text;
using BancoProcredit.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BancoProcredit.Infrastructure.Persistence.Data
{
    public class BancoProcreditContext : DbContext
    {
        public BancoProcreditContext(DbContextOptions<BancoProcreditContext> options)
            : base(options)
        {
        }

        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Cargo> Cargos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar Departamento
            modelBuilder.Entity<Departamento>()
                .HasKey(d => d.DepartamentoID);

            modelBuilder.Entity<Departamento>()
                .HasIndex(d => d.NombreDepartamento)
                .IsUnique();

            // Configurar Cargo
            modelBuilder.Entity<Cargo>()
                .HasKey(c => c.CargoID);

            modelBuilder.Entity<Cargo>()
                .HasIndex(c => c.NombreCargo)
                .IsUnique();

            // Configurar Empleado
            modelBuilder.Entity<Empleado>()
                .HasKey(e => e.EmpleadoID);

            modelBuilder.Entity<Empleado>()
                .HasIndex(e => e.NumeroDocumento)
                .IsUnique();

            // Relaciones Empleado -> Departamento
            modelBuilder.Entity<Empleado>()
                .HasOne(e => e.Departamento)
                .WithMany(d => d.Empleados)
                .HasForeignKey(e => e.DepartamentoID)
                .OnDelete(DeleteBehavior.Restrict);

            // Relaciones Empleado -> Cargo
            modelBuilder.Entity<Empleado>()
                .HasOne(e => e.Cargo)
                .WithMany(c => c.Empleados)
                .HasForeignKey(e => e.CargoID)
                .OnDelete(DeleteBehavior.Restrict);

            // Propiedades
            modelBuilder.Entity<Empleado>()
                .Property(e => e.RemuneracionMensual)
                .HasPrecision(12, 2);
        }
    }
}