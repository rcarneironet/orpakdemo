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
    [RoutePrefix("api/Pessoa")]
    public class PessoaController : ApiController
    {
        private IPessoaAppService _appService { get; }

        public PessoaController(IPessoaAppService appService)
        {
            _appService = appService;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] PessoaInput pessoa)
        {
            var obj = await _appService.Adicionar(pessoa);
            return Created($"{Request?.RequestUri}/{obj.Id}", obj);
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(int id, [FromBody] PessoaInput pessoa)
        {
            var obj = await _appService.Atualizar(id, pessoa);
            return Content(HttpStatusCode.Accepted, obj);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int id)
        {
            return Ok(await _appService.Obter(id));
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(int paginaAtual, int totalPagina)
        {
            return Ok(await _appService.ListarTodos(paginaAtual, totalPagina));
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_appService.Obter());
        }
    }
}
