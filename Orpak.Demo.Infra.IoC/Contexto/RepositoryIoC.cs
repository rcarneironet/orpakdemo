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
    public class RepositoryIoC
    {
        public static void Registrar(Container container)
        {
            container.Register<IPessoaRepository, PessoaRepository>(Lifestyle.Scoped);
            container.Register<ITarefaRepository, TarefaRepository>(Lifestyle.Scoped);
        }
    }
}
