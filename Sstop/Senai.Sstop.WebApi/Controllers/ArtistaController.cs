using Microsoft.AspNetCore.Mvc;
using Senai.Sstop.WebApi.Domains;
using Senai.Sstop.WebApi.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Sstop.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ArtistaController :ControllerBase
    {
        ArtistaRepository ArtistaRepository = new ArtistaRepository();

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(ArtistaRepository.Listar());
        }

        [HttpPost]
        public IActionResult Cadastrar(ArtistaDomain artista)
        {
            try
            {
                ArtistaRepository.Cadastrar(artista);
                return Ok();
            }

           catch(Exception ex)
            {
                return BadRequest(new { mensagem = "Ae família, moio!" + ex.Message });
            }
        }
    }
}
