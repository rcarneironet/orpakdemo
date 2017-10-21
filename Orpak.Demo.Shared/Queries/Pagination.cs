using Orpak.Demo.Shared.Validation;

namespace Orpak.Demo.Shared.Queries
{
    public sealed class Pagination
    {
        public Pagination(int pagina, int totalPagina)
        {
            new Valid()
                .GreaterThan("pagina", pagina, 0)
                .GreaterThan("totalPagina", totalPagina, 0)
                .Validate();

            Page = pagina;
            TotalPerPage = totalPagina;
        }
        public int Page { get; private set; }
        public int TotalPerPage { get; private set; }
        public int TotalPagination => (Page - 1) * TotalPerPage;
    }
}
