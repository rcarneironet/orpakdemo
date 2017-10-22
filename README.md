# orpakdemo
Demo for Orpak

Para instalar o projeto, é necessário seguir os passos a seguir:

0) Baixar fonte e ter o VS Studio Community 17 instalado :)

1) Abrir CMD do Windows, ir na pasta do projeto Web, efetuar os comandos abaixo:
  
		-> "npm install" (etapa para obter referências do node_modules)
		-> npm install gulp-cli -g (etapa para instalar o gulp)

2) Analisar se os arquivos abaixo estão apontando para o serviço no Azure (se deseja instalar local, alterar para seu ambiente:

    -> Orpak.Demo.Web/app/app.constants.js (variável "serviceBase")
    -> Orpak.Demo.Wpf/conector/ClientApi.cs (variável client.BaseAddress(
    -> Orpak.Demo.Api/Web.config (connection string "OrpakDemo", analisar dados da connection string)

3) Se desejar criar uma base local, criar com nome "OrpakDemo", abrir projeto Orpak.Demo.Database e abrir arquivo "SqlSchemaCompare1.scmp", informar as credenciais e rodar o schema compare. Os objetos da base serão criados.

4) Se desejar rodar o projeto local, abrir CMD, navegar até o projeto Web e digitar:
    -> gulp browser-sync para rodar locamente
    
O projeto web está na URL:
http://orpakdemo.azurewebsites.net

O projeto de API está na URL:
http://orpakdemo-api.azurewebsites.net/

O projeto segue um approach de Domain-Driven-Design, com forte aderência aos princípios SOLID, buscando baixo acoplamento e responsabilidade única.

Repositório criado como base para demo da empresa Orpak, desenvolvimento por Ray Carneiro.

