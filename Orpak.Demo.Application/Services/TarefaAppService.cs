using Orpak.Demo.Application.Interfaces;
using Orpak.Demo.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Orpak.Demo.Application.Input;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Shared.Queries;
using Orpak.Demo.Shared.Exceptions;
using Orpak.Demo.Domain.DTO;

namespace Orpak.Demo.Application.Services
{
    public class TarefaAppService : ITarefaAppService
    {
        private readonly ITarefaRepository _appTarefaRepository;
        private readonly IPessoaRepository _appPessoaRepository;

        public TarefaAppService(IPessoaRepository appPessoaRepository,
                                ITarefaRepository appTarefaRepository)
        {
            _appPessoaRepository = appPessoaRepository;
            _appTarefaRepository = appTarefaRepository;
        }

        public TarefaDto Obter(int id)
        {
            return _appTarefaRepository.ObterTarefa(id);
        }

        public async Task<Tarefa> Adicionar(TarefaInput input)
        {
            var pessoa = await ObterPessoa(input.PessoaId);
            var tarefa = new Tarefa(input.Descricao, input.HoraInicio, input.HoraFim, input.Status, input.HorasAlocadas, pessoa.Id);

            tarefa.CalcularHoras(pessoa);
            await _appTarefaRepository.Insert(tarefa);

            return tarefa;
        }

        public async Task<Tarefa> Atualizar(int id, TarefaInput input)
        {
            var tarefa = await ObterTarefa(id);
            var pessoa = await ObterPessoa(input.PessoaId);
            tarefa.UpdateInfo(input.Descricao, input.HoraInicio, input.HoraFim, input.Status, input.HorasAlocadas, pessoa.Id);

            tarefa.CalcularHoras(pessoa);
            await _appTarefaRepository.Update(tarefa);

            return tarefa;
        }

        public async Task Excluir(int id)
        {
            await _appTarefaRepository.Delete(await ObterTarefa(id));
        }

        public async Task<ResultPagination<TarefaDto>> ListarTodos(int paginaAtual, int totalPorPagina)
        {
            var resultado = await _appTarefaRepository.ObterListaTarefas(new Pagination(paginaAtual, totalPorPagina));
            return resultado;
        }

        private async Task<Tarefa> ObterTarefa(int id)
        {
            var obj = await _appTarefaRepository.GetById(id);
            if (obj == null)
                throw new NotFoundException("Tarefa não encontrada", id);

            return obj;
        }

        private async Task<Pessoa> ObterPessoa(int id)
        {
            var obj = await _appPessoaRepository.GetById(id);
            if (obj == null)
                throw new NotFoundException("Pessoa não encontrada", id);

            return obj;
        }

        public async Task<Tarefa> AtualizarStatus(int id, int idStatus)
        {
            var obj = await ObterTarefa(id);
            obj.AlterarStatus(idStatus);

            await _appTarefaRepository.Update(obj);

            return obj;
        }
    }
}
