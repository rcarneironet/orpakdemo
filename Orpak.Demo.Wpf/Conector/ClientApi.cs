using Newtonsoft.Json;
using Orpak.Demo.Wpf.Comum;
using Orpak.Demo.Wpf.Entidade;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Script.Serialization;

namespace Orpak.Demo.Wpf.Conector
{
    public class ClientApi
    {
        HttpClient client;

        public ClientApi()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("http://orpakdemo-api.azurewebsites.net/api/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public List<TarefaDto> ObterTarefas(int page, int total)
        {
            List<TarefaDto> lista = new List<TarefaDto>();

            HttpResponseMessage response = client.GetAsync($"Tarefa?paginaAtual={page}&totalPagina={total}").Result;
            if (response.IsSuccessStatusCode)
            {
                var retorno = response.Content.ReadAsAsync<Retorno<TarefaDto>>().Result;
                lista = retorno.Result;
            }

            return lista;
        }

        public PessoaDto ObterPessoa(int id)
        {
            var retorno = new PessoaDto();

            HttpResponseMessage response = client.GetAsync($"Pessoa/{id}").Result;
            if (response.IsSuccessStatusCode)
            {
                retorno = response.Content.ReadAsAsync<PessoaDto>().Result;
            }

            return retorno;
        }

        public List<PessoaDto> ObterPessoas()
        {
            var retorno = new List<PessoaDto>();

            HttpResponseMessage response = client.GetAsync($"Pessoa").Result;
            if (response.IsSuccessStatusCode)
            {
                retorno = response.Content.ReadAsAsync<List<PessoaDto>>().Result;
            }

            return retorno;
        }

        public void CriarTarefa(TarefaInput obj)
        {
            try
            {
                var parametros = new JavaScriptSerializer().Serialize(obj);
                HttpResponseMessage response = client.PostAsync($"Tarefa", new StringContent(parametros, Encoding.UTF8, "application/json")).Result;

                if (!response.IsSuccessStatusCode)
                    Excecao(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private void Excecao(HttpResponseMessage response)
        {
            var mensagem = JsonConvert.DeserializeObject<MensagemException>(response.Content.ReadAsStringAsync().Result);

            if (mensagem.message.ToUpper().Contains("ERROR") || mensagem.message.Contains("Internal"))
                throw new Exception(mensagem.exceptionMessage);
            else
                throw new Exception(mensagem.message);
        }
    }
}
