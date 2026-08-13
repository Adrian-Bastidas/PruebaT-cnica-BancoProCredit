using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BancoProcredit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmpleadosController : ControllerBase
    {
        private readonly IEmpleadoService _empleadoService;

        public EmpleadosController(IEmpleadoService empleadoService)
        {
            _empleadoService = empleadoService;
        }

        // GET: api/empleados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmpleadoDTO>>> GetAll()
        {
            try
            {
                var empleados = await _empleadoService.GetAllAsync();
                return Ok(empleados);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno", error = ex.Message });
            }
        }

        // GET: api/empleados/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EmpleadoDTO>> GetById(int id)
        {
            try
            {
                var empleado = await _empleadoService.GetByIdAsync(id);
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // GET: api/empleados/departamento/{departamentoId}
        [HttpGet("departamento/{departamentoId}")]
        public async Task<ActionResult<IEnumerable<EmpleadoDTO>>> GetByDepartamento(int departamentoId)
        {
            try
            {
                var empleados = await _empleadoService.GetByDepartamentoAsync(departamentoId);
                return Ok(empleados);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST: api/empleados
        [HttpPost]
        public async Task<ActionResult<EmpleadoDTO>> Create([FromBody] CreateEmpleadoDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var empleado = await _empleadoService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = empleado.EmpleadoID }, empleado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/empleados/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateEmpleadoDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var resultado = await _empleadoService.UpdateAsync(id, dto);
                if (!resultado)
                    return NotFound(new { message = "Empleado no encontrado" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/empleados/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var resultado = await _empleadoService.DeleteAsync(id);
                if (!resultado)
                    return NotFound(new { message = "Empleado no encontrado" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}