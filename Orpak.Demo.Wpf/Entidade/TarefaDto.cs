using System;
using System.Collections.Generic;

namespace Orpak.Demo.Wpf.Entidade
{
    public class TarefaDto
    {
        public int Id { get; set; }
        public string NomePessoa { get; set; }
        public string Descricao { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public int idStatus { get; set; }
        public string Status { get; set; }
        public decimal HorasAlocadas { get; set; }
        public decimal ValorHora { get; set; }
        public decimal Total { get; set; }
    }
    public class TarefaInput
    {
        public int PessoaId { get; set; }
        public string Descricao { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public int Status { get; set; }
        public decimal HorasAlocadas { get; set; }
    }

    public class PessoaDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Celular { get; set; }
        public string Email { get; set; }
        public decimal Salario { get; set; }
        public decimal Horas { get; set; }
    }

    public class Retorno<T>
    {
        public int Total { get; set; }
        public int Page { get; set; }
        public int TotalPage { get; set; }
        public int TotalToPage { get; set; }

        public List<T> Result { get; set; }
    }
}
