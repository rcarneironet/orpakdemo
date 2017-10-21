using Orpak.Demo.Domain.Interfaces;
using Orpak.Demo.Domain.Models;
using Orpak.Demo.Infra.Repository.Context;
using Orpak.Demo.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Orpak.Demo.Infra.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity>, IDisposable 
        where TEntity : Entidade
    {
        protected DbSet<TEntity> DbSet;
        protected OrpakContext Db;

        protected Repository()
        {
            Db = new OrpakContext();
            DbSet = Db.Set<TEntity>();
        }

        public Task<TEntity> GetById(int id)
        {
            return DbSet.FirstOrDefaultAsync(c => c.Id == id);
        }
        public Task<List<TEntity>> GetAllBy(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Where(predicate).ToListAsync();
        }

        public async Task<ResultPagination<TEntity>> GetAll(Pagination paginacao)
        {
            var count = DbSet.Where(a => a.IsDeleted == false).Count();

            var results = await DbSet.AsNoTracking()
                .OrderBy(a => a.Id)
                .Skip(paginacao.TotalPagination)
                .Take(paginacao.TotalPerPage)
                .ToListAsync();

            return new ResultPagination<TEntity>(
                resultados: results,
                total: count,
                pagina: paginacao.Page,
                totalPagina: paginacao.TotalPerPage);
        }

        public Task Insert(TEntity entity)
        {
            DbSet.Add(entity);
            return Db.SaveChangesAsync();
        }

        public Task Update(TEntity entity)
        {
            Db.Entry(entity).State = EntityState.Modified;
            return Db.SaveChangesAsync();
        }

        public Task Delete(TEntity entity)
        {
            Db.Entry(entity).State = EntityState.Modified;
            entity.IsDeleted = true;

            return Db.SaveChangesAsync();
        }

        public void Dispose()
        {
            Db.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
