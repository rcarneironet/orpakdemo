using Orpak.Demo.Application.Interfaces;
using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using System;
using System.Threading.Tasks;
using System.Linq;
using Orpak.Demo.Application.Input;
using Orpak.Demo.Shared.Queries;
using Orpak.Demo.Shared.Exceptions;
using System.Collections.Generic;

namespace Orpak.Demo.Application.Services
{
    public class PessoaAppService : IPessoaAppService
    {
        private readonly IPessoaRepository _appPessoaRepository;

        public PessoaAppService(IPessoaRepository appPessoaRepository)
        {
            _appPessoaRepository = appPessoaRepository;
        }
        public async Task<Pessoa> Adicionar(PessoaInput input)
        {
            var retorno = await _appPessoaRepository.GetAllBy(a => a.Nome == input.Nome);

            if (retorno.Count() > 0)
                throw new FieldsValidationException($"A pessoa {input.Nome} já existe.");

            var pessoa = new Pessoa(input.Nome, input.DataNascimento, input.Celular, input.Email, input.Salario, input.Horas);
            await _appPessoaRepository.Insert(pessoa);

            return pessoa;
        }

        public async Task<Pessoa> Atualizar(int id, PessoaInput input)
        {
            var obj = await ObterPessoa(id);
            obj.UpdateInfo(input.Nome, input.DataNascimento, input.Celular, input.Email, input.Salario, input.Horas);

            await _appPessoaRepository.Update(obj);

            return obj;
        }

        public async Task<ResultPagination<Pessoa>> ListarTodos(int paginaAtual, int totalPorPagina)
        {
            var resultado = await _appPessoaRepository.GetAll(new Pagination(paginaAtual, totalPorPagina));
            return resultado;
        }

        public List<Pessoa> Obter()
        {
            return _appPessoaRepository.ObterPessoas();
        }

        public async Task<Pessoa> Obter(int id)
        {
            return await ObterPessoa(id);
        }

        private async Task<Pessoa> ObterPessoa(int id)
        {
            try
            {
                var obj = await _appPessoaRepository.GetById(id);
                if (obj == null)
                    throw new NotFoundException("Pessoa não encontrada", id);

                return obj;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
