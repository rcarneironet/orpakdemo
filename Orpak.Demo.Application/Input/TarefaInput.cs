using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orpak.Demo.Application.Input
{
    public class TarefaInput
    {
        public int PessoaId { get; set; }
        public string Descricao { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public int Status { get; set; }
        public decimal HorasAlocadas { get; set; }
    }
}
