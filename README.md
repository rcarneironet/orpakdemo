# orpakdemo
Demo for Orpak

Para instalar o projeto, é necessário seguir os passos a seguir:

1) Abrir CMD do Windows, ir na pasta do projeto web, efetuar os comandos:
  
		-> "npm install" (etapa para obter referências do node_modules)
		-> npm install gulp-cli -g (etapa para instalar o gulp)

2) Analisar se os arquivos abaixo estão apontando para o azure:
    -> Orpak.Demo.Web/app/app.constants.js (variável "serviceBase")
    -> Orpak.Demo.Wpf/conector/ClientApi.cs (variável client.BaseAddress(
    -> Orpak.Demo.Api/Web.config (connection string "OrpakDemo", analisar dados da connection string)

3) Se desejar criar uma base local, Criar com nome "OrpakDemo", abrir projeto Orpak.Demo.Database e abrir arquivo "SqlSchemaCompare1.scmp", informar as credenciais e rodar o schema compare

4) Se desejar rodar o projeto local, digitar o comando no CMD:
    -> gulp browser-sync para rodar locamente
    
O projeto web está na URL:

http://orpakdemo.azurewebsites.net

O projeto de API está na URL:

http://orpakdemo-api.azurewebsites.net/

A instalação do WPF pode ser feita localmente.
