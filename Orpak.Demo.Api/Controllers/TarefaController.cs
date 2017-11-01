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
    public class TarefaController : ApiController
    {
        private ITarefaAppService _appService { get; }

        public TarefaController(ITarefaAppService appService)
        {
            _appService = appService;
        }

        [Route("Tarefa")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] TarefaInput tarefa)
        {
            var obj = await _appService.Adicionar(tarefa);
            return Created($"{Request?.RequestUri}/{obj.Id}", obj);
        }

        [Route("Tarefa/{id}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(int id, [FromBody] TarefaInput tarefa)
        {
            var obj = await _appService.Atualizar(id, tarefa);
            return Content(HttpStatusCode.Accepted, obj);
        }

        [Route("Tarefa/{id}/Status/{idStatus}")]
        [HttpPut]
        public async Task<IHttpActionResult> Put(int id, int idStatus)
        {
            var obj = await _appService.AtualizarStatus(id, idStatus);
            return Content(HttpStatusCode.Accepted, obj);
        }

        [Route("Tarefa/{id}")]
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            return Ok(_appService.Obter(id));
        }

        [Route("Tarefa/{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _appService.Excluir(id);
            return Ok();
        }

        [Route("Tarefa")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(int paginaAtual, int totalPagina)
        {
            return Ok(await _appService.ListarTodos(paginaAtual, totalPagina));
        }
    }
}
