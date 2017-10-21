using System;
using System.Collections.Generic;

namespace Orpak.Demo.Shared.Queries
{
    public sealed class ResultPagination<T> where T : class
    {
        public int Total { get; private set; }
        public int Page { get; private set; }
        public int TotalPage { get; private set; }
        public int TotalToPage { get; private set; }

        public IList<T> Result { get; private set; }

        public ResultPagination(IList<T> resultados, int total, int pagina, int totalPagina)
        {
            Result = resultados;
            Page = pagina;
            Total = total;
            TotalToPage = totalPagina;
            TotalPage = (int)Math.Ceiling((double)Total / TotalToPage);
        }
    }
}
