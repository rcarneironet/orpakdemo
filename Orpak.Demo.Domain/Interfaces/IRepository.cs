using Orpak.Demo.Domain.Models;
using Orpak.Demo.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Orpak.Demo.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : Entidade
    {
        Task<TEntity> GetById(int id);

        Task<List<TEntity>> GetAllBy(Expression<Func<TEntity, bool>> predicate);

        Task<ResultPagination<TEntity>> GetAll(Pagination paginationInput);

        Task Update(TEntity entity);

        Task Insert(TEntity entity);

        Task Delete(TEntity entity);
    }
}
