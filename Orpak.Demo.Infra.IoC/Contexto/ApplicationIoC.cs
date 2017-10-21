using Orpak.Demo.Application.Interfaces;
using Orpak.Demo.Application.Services;
using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Infra.Repository;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orpak.Demo.Infra.IoC.Contexto
{
    public class ApplicationIoC
    {
        public static void Registrar(Container container)
        {
            container.Register<IPessoaAppService, PessoaAppService>();
            container.Register<ITarefaAppService, TarefaAppService>();
        }
    }

}
