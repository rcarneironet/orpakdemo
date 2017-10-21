using Orpak.Demo.Wpf.Conector;
using Orpak.Demo.Wpf.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Orpak.Demo.Wpf
{
    /// <summary>
    /// Interaction logic for Cadastro.xaml
    /// </summary>
    public partial class Cadastro : Window
    {
        public Cadastro()
        {
            InitializeComponent();
            this.CarregarComboPessoa();
            this.CarregarComboStatus();
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            Salvar();
        }

        private void Salvar()
        {
            ClientApi api = new ClientApi();

            var obj = new TarefaInput();
            obj.Descricao = this.txtDescricao.Text;
            obj.Status = int.Parse(this.cboStatus.SelectedValue.ToString());
            obj.PessoaId = int.Parse(this.cboPessoa.SelectedValue.ToString());
            obj.HoraInicio = DateTime.Parse(dtInicio.Text + " " + txthoraInicio.Text);
            obj.HoraFim = DateTime.Parse(dtFim.Text + " " + txthoraFim.Text);
            obj.HorasAlocadas = decimal.Parse(txthorasAlocadas.Text);

            api.CriarTarefa(obj);
            this.Close();
        }

        private void CarregarComboPessoa()
        {
            ClientApi api = new ClientApi();

            var resultado = api.ObterPessoas();

            this.cboPessoa.SelectedValuePath = "Key";
            this.cboPessoa.DisplayMemberPath = "Value";

            foreach (var item in resultado)
            {
                this.cboPessoa.Items.Add(new KeyValuePair<int, string>(item.Id, item.Nome));
            }

        }

        private void CarregarComboStatus()
        {
            this.cboStatus.SelectedValuePath = "Key";
            this.cboStatus.DisplayMemberPath = "Value";
            this.cboStatus.Items.Add(new KeyValuePair<int, string>(1, "Pendente"));
            this.cboStatus.Items.Add(new KeyValuePair<int, string>(2, "Em progresso"));
            this.cboStatus.Items.Add(new KeyValuePair<int, string>(3, "Concluída"));
        }
    }
}
