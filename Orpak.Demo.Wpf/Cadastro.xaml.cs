using Orpak.Demo.Wpf.Conector;
using Orpak.Demo.Wpf.Entidade;
using System;
using System.Collections.Generic;
using System.Windows;

namespace Orpak.Demo.Wpf
{
    /// <summary>
    /// Interaction logic for Cadastro.xaml
    /// </summary>
    public partial class Cadastro
    {
        public Cadastro()
        {
            InitializeComponent();
            CarregarComboPessoa();
            CarregarComboStatus();
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            Salvar();
        }

        private void Salvar()
        {
            ClientApi api = new ClientApi();

            var obj = new TarefaInput
            {
                Descricao = !String.IsNullOrEmpty(txtDescricao.Text) ? txtDescricao.Text : string.Empty,
                Status = cboStatus.SelectedValue != null ? int.Parse(cboStatus.SelectedValue.ToString()) : -1,
                PessoaId = cboPessoa.SelectedValue != null ? int.Parse(cboPessoa.SelectedValue.ToString()) : -1,
                HoraInicio = !String.IsNullOrEmpty(dtInicio.Text) && !String.IsNullOrEmpty(txthoraInicio.Text) &&
                             txthoraInicio.Text != "__:__"
                    ? DateTime.Parse(dtInicio.Text + " " + txthoraInicio.Text)
                    : DateTime.MinValue,
                HoraFim = !String.IsNullOrEmpty(dtFim.Text) && !String.IsNullOrEmpty(dtFim.Text) &&
                          txthoraFim.Text != "__:__"
                    ? DateTime.Parse(dtFim.Text + " " + txthoraFim.Text)
                    : DateTime.MinValue,
                HorasAlocadas = !String.IsNullOrEmpty(txthorasAlocadas.Text) ? decimal.Parse(txthorasAlocadas.Text) : -1
            };

            bool canSave = (!String.IsNullOrEmpty(obj.Descricao) && obj.Status > -1 && obj.PessoaId > -1 && obj.HoraInicio != DateTime.MinValue && obj.HoraFim != DateTime.MinValue && obj.HorasAlocadas > -1);
            if (canSave)
            {
                api.CriarTarefa(obj);
                MessageBox.Show("Tarefa criada com sucesso!", "Informação do Sistema");
                Close();
            }
            else
                MessageBox.Show("Por favor, preencha todos os campos.", "Informação do Sistema");
        }

        private void CarregarComboPessoa()
        {
            var api = new ClientApi();

            var resultado = api.ObterPessoas();

            cboPessoa.SelectedValuePath = "Key";
            cboPessoa.DisplayMemberPath = "Value";

            foreach (var item in resultado)
            {
                cboPessoa.Items.Add(new KeyValuePair<int, string>(item.Id, item.Nome));
            }

        }

        private void CarregarComboStatus()
        {
            cboStatus.SelectedValuePath = "Key";
            cboStatus.DisplayMemberPath = "Value";
            cboStatus.Items.Add(new KeyValuePair<int, string>(1, "Pendente"));
            cboStatus.Items.Add(new KeyValuePair<int, string>(2, "Em progresso"));
            cboStatus.Items.Add(new KeyValuePair<int, string>(3, "Concluída"));
        }
    }
}
