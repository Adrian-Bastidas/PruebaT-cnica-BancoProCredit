using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BancoProcredit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DepartamentosController : ControllerBase
    {
        private readonly IDepartamentoService _departamentoService;

        public DepartamentosController(IDepartamentoService departamentoService)
        {
            _departamentoService = departamentoService;
        }

        // GET: api/departamentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartamentoDTO>>> GetAll()
        {
            try
            {
                var departamentos = await _departamentoService.GetAllAsync();
                return Ok(departamentos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno", error = ex.Message });
            }
        }

        // GET: api/departamentos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartamentoDTO>> GetById(int id)
        {
            try
            {
                var departamento = await _departamentoService.GetByIdAsync(id);
                return Ok(departamento);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}