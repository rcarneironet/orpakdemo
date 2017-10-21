using Orpak.Demo.Shared.Validation;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Orpak.Demo.Domain.Models
{
    [Table(nameof(Tarefa))]
    public class Tarefa : Entidade
    {
        public int PessoaId { get; private set; }
        public string Descricao { get; private set; }
        public DateTime HoraInicio { get; private set; }
        public DateTime HoraFim { get; private set; }
        public int Status { get; private set; }
        public decimal HorasAlocadas { get; private set; }
        public decimal ValorHora { get; private set; }
        public decimal Total { get; private set; }

        public Tarefa()
        {

        }

        public Tarefa(string descricao, DateTime horaInicio, DateTime horaFim, 
                     int status, decimal horasAlocadas, int pessoaId)
        {
            this.UpdateInfo(descricao, horaInicio, horaFim, status, horasAlocadas, pessoaId);
        }

        public void UpdateInfo(string descricao, DateTime horaInicio, DateTime horaFim,
                     int status, decimal horasAlocadas, int pessoaId)
        {
            new Valid()
                .NotNullOrEmpty(nameof(Descricao), descricao)
                .NotNull(nameof(HoraInicio), horaInicio)
                .NotNull(nameof(HoraFim), horaFim)
                .ValidDate(nameof(HoraInicio), horaInicio, nameof(HoraFim), horaFim)
                .GreaterThan(nameof(Status), status, 0)
                .GreaterThan(nameof(PessoaId), pessoaId, 0)
                .GreaterThan(nameof(HorasAlocadas), horasAlocadas, 0)
            .Validate();

            Descricao = descricao;
            HoraInicio = horaInicio;
            HoraFim = horaFim;
            Status = status;
            HorasAlocadas = horasAlocadas;
            PessoaId = pessoaId;
        }

        public void CalcularHoras(Pessoa pessoa)
        {
            new Valid()
                .NotNull("Pessoa", pessoa)
                .NotNull(nameof(PessoaId), pessoa.Id)
            .Validate();

            ValorHora = (pessoa.Salario / pessoa.Horas);
            Total = HorasAlocadas * ValorHora; 
        }

        public void AlterarStatus(int status)
        {
            new Valid()
                .GreaterThan(nameof(Status), status, 0)
            .Validate();

            Status = status;
        }
    }
}
