using Orpak.Demo.Application.Input;
using Orpak.Demo.Domain.DTO;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orpak.Demo.Application.Interfaces
{
    public interface ITarefaAppService
    {
        TarefaDto Obter(int id);

        Task<Tarefa> Adicionar(TarefaInput input);

        Task<Tarefa> Atualizar(int id, TarefaInput input);
        Task<Tarefa> AtualizarStatus(int id, int idStatus);

        Task Excluir(int id);

        Task<ResultPagination<TarefaDto>> ListarTodos(int paginaAtual, int totalPorPagina);
    }
}
