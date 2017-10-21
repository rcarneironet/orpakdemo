using Orpak.Demo.Application.Interfaces;
using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using System;
using System.Threading.Tasks;

namespace Orpak.Demo.Application.Services
{
    public class PessoaService : IPessoaService
    {

        public IPessoaRepository Repository { get; set; }

        public PessoaService(IPessoaRepository repository)
        {
            Repository = repository;
        }

        public Task<Pessoa> GetPessoaAsync(int id)
        {
            return Repository.GetById(id);
        }

        public Task<Pessoa> SavePessoaAsync(Pessoa pessoa)
        {
            throw new NotImplementedException();
        }
    }
}
