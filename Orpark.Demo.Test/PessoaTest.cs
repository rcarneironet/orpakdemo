using Microsoft.VisualStudio.TestTools.UnitTesting;
using Orpak.Demo.Application.Interfaces;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Infra.IoC;
using System.Transactions;

namespace Orpark.Demo.Test
{
    [TestClass]
    public class PessoaTest
    {
        [TestMethod]
        public void Get()
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (SimpleInjector.Lifestyles.AsyncScopedLifestyle.BeginScope(SimpleInjectorContainer.GetInstance.GetContainer()))
                {
                    var container = SimpleInjectorContainer.GetInstance.GetContainer();
                    var service = container.GetInstance<IPessoaAppService>();
                    var model = service.Obter(1);

                    Assert.IsTrue(model.Result != null);
                }
                scope.Dispose();
            }

        }

        [TestMethod]
        public void GetAll()
        {

        }
    }
}
