using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Orpak.Demo.Api.App_Start;
using SimpleInjector.Extensions.ExecutionContextScoping;

[assembly: OwinStartup(typeof(Orpak.Demo.Api.Startup))]

namespace Orpak.Demo.Api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = SimpleInjectorInitializer.Initialize();
            app.Use(async (context, next) =>
            {
                using (var scope = container.BeginExecutionContextScope())
                {
                    await next.Invoke();
                }
            });
        }
    }
}
