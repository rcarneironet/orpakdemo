using Orpak.Demo.Domain.DTO;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Shared.Queries;
using System.Threading.Tasks;

namespace Orpak.Demo.Domain.Interfaces
{
    public interface ITarefaRepository : IRepository<Tarefa>
    {
        Task<ResultPagination<TarefaDto>> ObterListaTarefas(Pagination paginacao);
        TarefaDto ObterTarefa(int id);
    }
}
