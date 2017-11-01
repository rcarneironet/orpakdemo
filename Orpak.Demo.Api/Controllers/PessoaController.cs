using Orpak.Demo.Application.Input;
using Orpak.Demo.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Orpak.Demo.Api.Controllers
{
    [RoutePrefix("api")]
    public class PessoaController : ApiController
    {
        private IPessoaAppService _appService { get; }

        public PessoaController(IPessoaAppService appService)
        {
            _appService = appService;
        }

        [Route("Pessoa")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] PessoaInput pessoa)
        {
            var obj = await _appService.Adicionar(pessoa);
            return Created($"{Request?.RequestUri}/{obj.Id}", obj);
        }

        [Route("Pessoa/{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(int id, [FromBody] PessoaInput pessoa)
        {
            var obj = await _appService.Atualizar(id, pessoa);
            return Content(HttpStatusCode.Accepted, obj);
        }

        [Route("Pessoa/{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            return Ok(await _appService.Obter(id));
        }

        [Route("Pessoa")]
        [HttpGet]
        public async Task<IHttpActionResult> Obter([FromUri] int paginaAtual, int totalPagina)
        {
            return Ok(await _appService.ListarTodos(paginaAtual, totalPagina));
        }

        [Route("Pessoa/All")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_appService.Obter());
        }
    }
}
