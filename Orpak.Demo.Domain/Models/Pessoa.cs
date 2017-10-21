using Orpak.Demo.Shared.Validation;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Orpak.Demo.Domain.Models
{
    [Table(nameof(Pessoa))]
    public class Pessoa : Entidade
    {
        public string Nome { get; private set; }
        public DateTime DataNascimento { get; private set; }
        public string Celular { get; private set; }
        public string Email { get; private set; }
        public decimal Salario { get; private set; }
        public decimal Horas { get; private set; }

        public Pessoa()
        {

        }

        public Pessoa(string nome, DateTime dataNascimento, 
                      string celular, string email, decimal salario, decimal horas)
        {
            this.UpdateInfo(nome, dataNascimento, celular, email, salario, horas);
        }

        public void UpdateInfo(string nome, DateTime dataNascimento,
                      string celular, string email, decimal salario, decimal horas)
        {
            new Valid()
                .NotNullOrEmpty(nameof(Nome), nome)
                .NotNull(nameof(DataNascimento), dataNascimento)
                .NotNullOrEmpty(nameof(Celular), celular)
                .ValidEmail(nameof(Email), email)
                .GreaterThan(nameof(Salario), salario, 0)
                .GreaterThan(nameof(Horas), horas, 0)
            .Validate();

            Nome = nome;
            DataNascimento = dataNascimento;
            Celular = celular;
            Email = email;
            Salario = salario;
            Horas = horas;
        }

    }
}
