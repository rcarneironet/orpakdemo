using Orpak.Demo.Domain.Models;
using Orpak.Demo.Infra.Repository.Context.Config;
using System.Data.Entity;
using System.Threading;
using System.Threading.Tasks;

namespace Orpak.Demo.Infra.Repository.Context
{
    public class OrpakContext : DbContext
    {
        public OrpakContext(): base("OrparkDemo")
        {

        }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }

        public override int SaveChanges()
        {
            DefaultProperties.SaveDefaultPropertiesChanges(ChangeTracker);
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            DefaultProperties.SaveDefaultPropertiesChanges(ChangeTracker);
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
