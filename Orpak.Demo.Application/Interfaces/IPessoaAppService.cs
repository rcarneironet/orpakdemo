using Orpak.Demo.Application.Input;
using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Shared.Queries;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Orpak.Demo.Application.Interfaces
{
    public interface IPessoaAppService
    {
        Task<Pessoa> Obter(int id);
        List<Pessoa> Obter();

        Task<Pessoa> Adicionar(PessoaInput input);

        Task<Pessoa> Atualizar(int id, PessoaInput input);

        Task<ResultPagination<Pessoa>> ListarTodos(int paginaAtual, int totalPorPagina);
    }
}
