using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using System.Collections.Generic;

using System.Linq;

namespace Orpak.Demo.Infra.Repository
{
    public class PessoaRepository : Repository<Pessoa>, IPessoaRepository
    {
        public List<Pessoa> ObterPessoas()
        {
            return DbSet.AsNoTracking().ToList(); 
        }
    }
}
