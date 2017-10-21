namespace Orpak.Demo.Infra.Repository.Migrations
{
    using Orpak.Demo.Domain.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Orpak.Demo.Infra.Repository.Context.OrpakContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(Orpak.Demo.Infra.Repository.Context.OrpakContext context)
        {
            IList<Pessoa> pessoas = new List<Pessoa>();
            pessoas.Add(new Pessoa("Ray Carneiro", DateTime.UtcNow, "(11) 99900-0099", "rcarneironet@gmail.co", 15000, 160));
            pessoas.Add(new Pessoa("Wellington Jackson", DateTime.UtcNow, "(11) 99001-1234", "wellington.jacksong@msn.com", 15000, 160));
            foreach (Pessoa p in pessoas)
                context.Pessoas.Add(p);
            base.Seed(context);
        }
    }
}
