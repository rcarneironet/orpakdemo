using Orpak.Demo.Application.Interfaces;
using Orpak.Demo.Application.Services;
using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Infra.Repository;
using SimpleInjector;

namespace Orpak.Demo.Infra.IoC
{
    public class SimpleInjectorContainer
    {
        private static Container _container;
        public static SimpleInjectorContainer GetInstance { get; } = new SimpleInjectorContainer();

        public SimpleInjectorContainer()
        {
            _container = new Container();
            _container.Options.DefaultScopedLifestyle = new SimpleInjector.Lifestyles.AsyncScopedLifestyle();

            _container.Register<IPessoaRepository, PessoaRepository>(Lifestyle.Scoped);
            _container.Register<IPessoaAppService, PessoaAppService>(Lifestyle.Scoped);

        }
        public Container GetContainer() => _container;
    }
}
