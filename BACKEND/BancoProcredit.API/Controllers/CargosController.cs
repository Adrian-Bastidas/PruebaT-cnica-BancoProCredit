using BancoProcredit.Application.DTOs;
using BancoProcredit.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BancoProcredit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CargosController : ControllerBase
    {
        private readonly ICargoService _cargoService;

        public CargosController(ICargoService cargoService)
        {
            _cargoService = cargoService;
        }

        // GET: api/cargos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CargoDTO>>> GetAll()
        {
            try
            {
                var cargos = await _cargoService.GetAllAsync();
                return Ok(cargos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno", error = ex.Message });
            }
        }

        // GET: api/cargos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CargoDTO>> GetById(int id)
        {
            try
            {
                var cargo = await _cargoService.GetByIdAsync(id);
                return Ok(cargo);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}