using Orpak.Demo.Domain.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace Orpak.Demo.Infra.Repository.Context.Config
{
    public static class DefaultProperties
    {
        public static void SaveDefaultPropertiesChanges(DbChangeTracker changeTracker)
        {
            foreach (var entry in changeTracker.Entries()
                         .Where(e => e.State == EntityState.Added ||
                         e.State == EntityState.Modified))
            {
                entry.Property("LastModification").CurrentValue = DateTime.Now;
            }

            foreach (var entry in changeTracker.Entries()
                        .Where(p => p.State == EntityState.Deleted
                         && p.Entity is Entidade))
            {
                entry.Property("IsDeleted").CurrentValue = true;
                entry.State = EntityState.Modified;
            }
        }
    }
}
