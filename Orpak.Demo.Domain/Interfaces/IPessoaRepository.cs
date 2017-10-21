using Orpak.Demo.Domain.Models;
using System.Collections.Generic;

namespace Orpak.Demo.Domain.Interfaces
{
    public interface IPessoaRepository : IRepository<Pessoa>
    {
        List<Pessoa> ObterPessoas();
    }
}
