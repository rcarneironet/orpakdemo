using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orpak.Demo.Domain.DTO
{
    public class TarefaDto
    {
        public int Id { get; set; }
        public int PessoaId { get; set; }
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
}
