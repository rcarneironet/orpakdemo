using System.Threading.Tasks;
using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Shared.Queries;
using System.Linq;
using System.Data.Entity;
using Orpak.Demo.Domain.DTO;
using Orpak.Demo.Domain.Enum;

namespace Orpak.Demo.Infra.Repository
{
    public class TarefaRepository : Repository<Tarefa>, ITarefaRepository
    {
        public async Task<ResultPagination<TarefaDto>> ObterListaTarefas(Pagination paginacao)
        {
            var count = DbSet.Where(a => !a.IsDeleted).Count();

            var query = from a in DbSet.AsNoTracking()
                          join b in Db.Pessoas on a.PessoaId equals b.Id
                          where a.IsDeleted == false
                          select new TarefaDto
                          {
                              Id = a.Id,
                              Descricao = a.Descricao,
                              HoraFim = a.HoraFim,
                              HoraInicio = a.HoraInicio,
                              HorasAlocadas = a.HorasAlocadas,
                              NomePessoa = b.Nome,
                              Status = ((StatusTarefa)a.Status).ToString(),
                              ValorHora = a.ValorHora,
                              Total = a.Total
                          };

            var results = await query
                .OrderBy(a => a.Id)
                .Skip(paginacao.TotalPagination)
                .Take(paginacao.TotalPerPage)
                .ToListAsync();

            return new ResultPagination<TarefaDto>(
                resultados: results,
                total: count,
                pagina: paginacao.Page,
                totalPagina: paginacao.TotalPerPage);
        }

        public TarefaDto ObterTarefa(int id)
        {
            var query = from a in DbSet.AsNoTracking()
                        join b in Db.Pessoas on a.PessoaId equals b.Id
                        where a.IsDeleted == false
                        && a.Id == id
                        select new TarefaDto
                        {
                            Id = a.Id,
                            PessoaId = b.Id,
                            Descricao = a.Descricao,
                            HoraFim = a.HoraFim,
                            HoraInicio = a.HoraInicio,
                            HorasAlocadas = a.HorasAlocadas,
                            NomePessoa = b.Nome,
                            Status = ((StatusTarefa)a.Status).ToString(),
                            idStatus = a.Status,
                            ValorHora = a.ValorHora,
                            Total = a.Total
                        };

            return query.FirstOrDefault();
        }
    }
}
