using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using System.Threading.Tasks;

namespace Orpak.Demo.Application.Interfaces
{
    public interface IPessoaService
    {
        IPessoaRepository Repository { get; set; }
        Task<Pessoa> GetPessoaAsync(int id);
        Task<Pessoa> SavePessoaAsync(Pessoa pessoa);
    }
}
