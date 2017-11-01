using Orpak.Demo.Wpf.Comum;
using Orpak.Demo.Wpf.Conector;
using Orpak.Demo.Wpf.Entidade;
using System.Collections.Generic;
using System.Windows;

namespace Orpak.Demo.Wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly PagingCollectionView _cview;
        public MainWindow()
        {
            InitializeComponent();
            VerificarConexao();

            _cview = new PagingCollectionView(CarregarGrid(), 10);

            DataContext = _cview;
        }

        private void VerificarConexao()
        {
            if (InternetConnection.IsInternetAvailable())
                lblConexao.Content = "Conectado à Internet";
        }

        private List<TarefaDto> CarregarGrid()
        {
            ClientApi api = new ClientApi();
            var pagina = _cview == null ? 1 : _cview.CurrentPage;
            return api.ObterTarefas(pagina, 100);
        }


        private void btnAdicionar_Click(object sender, RoutedEventArgs e)
        {
            Cadastro win = new Cadastro();
            win.Show();
        }
        private void OnPreviousClicked(object sender, RoutedEventArgs e)
        {
            _cview.MoveToPreviousPage();
        }

        private void OnNextClicked(object sender, RoutedEventArgs e)
        {
            _cview.MoveToNextPage();
        }
    }
}
