using Orpak.Demo.Wpf.Comum;
using Orpak.Demo.Wpf.Conector;
using Orpak.Demo.Wpf.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

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
            if (this.ExisteConexaoInternet())
            {
                this._cview = new PagingCollectionView(this.CarregarGrid(), 10);
                this.DataContext = this._cview;
            }
            else
                Application.Current.Shutdown();
        }

        private bool ExisteConexaoInternet()
        {
            if (InternetConnection.IsInternetAvailable())
                this.lblConexao.Content = "Conectado à Internet";
            else
            {
                MessageBoxResult result = MessageBox.Show("Sem conexão com a internet, podemos encerrar a conexão?", "Confirmação", MessageBoxButton.YesNo, MessageBoxImage.Question);
                if (result == MessageBoxResult.Yes)
                {
                    return false;
                }
            }
            return true;
        }

        private List<TarefaDto> CarregarGrid()
        {
            ClientApi api = new ClientApi();
            var pagina = this._cview == null ? 1 : this._cview.CurrentPage;
            return api.ObterTarefas(pagina, 100);
        }


        private void btnAdicionar_Click(object sender, RoutedEventArgs e)
        {
            Cadastro win = new Cadastro();
            win.Show();
        }
        private void OnPreviousClicked(object sender, RoutedEventArgs e)
        {
            this._cview.MoveToPreviousPage();
        }

        private void OnNextClicked(object sender, RoutedEventArgs e)
        {
            this._cview.MoveToNextPage();
        }
    }
}
