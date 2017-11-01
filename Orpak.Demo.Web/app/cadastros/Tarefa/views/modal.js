(function () {
    angular.module('orpak').controller('cadastros.views.modalTarefa',
        function ($scope, $rootScope, $mdSidenav, $mdDialog, $mdMedia, $filter, pessoaService, tarefaService, tarefaId) {
            var vm = this;

            vm.tarefa = [];
            vm.pessoas = [];
            vm.tarefaInput = {};

            vm.dataInicio = new Date();
            vm.dataFim = new Date();

            vm.fecharModal = function () {
                vm.tarefa.horaInicio = "";
                vm.tarefa.horaFim = "";
                vm.tarefa.pessoaId = "";
                vm.tarefa.status = "";
                vm.tarefa.horasAlocadas = "";
                vm.dataInicio = "";
                vm.dataFim = "";

                $mdDialog.cancel();
            };

            vm.salvar = function () {
                if (tarefaId != 0)
                    vm.alterar();
                else
                    vm.incluir();
            }

            vm.incluir = function () {
                
                vm.preencherDados();

                tarefaService.inserir(vm.tarefaInput).success(function (result) {
                    var alert = $mdDialog.alert({ title: 'Sucesso', textContent: 'Tarefa incluída com sucesso', ok: 'Fechar' });

                    $mdDialog.show(alert).finally(function () {
                        alert = undefined;
                    });

                    $rootScope.$emit("CallParentMethod", {});
                }).error(function (result) {
                    var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                    $mdDialog.show(alert).finally(function () {
                        alert = undefined;
                    });
                })
            }

            vm.alterar = function () {

                vm.preencherDados();

                tarefaService.alterar(tarefaId, vm.tarefaInput).success(function (result) {
                    var alert = $mdDialog.alert({ title: 'Sucesso', textContent: 'Status alterado com sucesso', ok: 'Fechar' });

                    $mdDialog.show(alert).finally(function () {
                        alert = undefined;
                    });

                    $rootScope.$emit("CallParentMethod", {});
                }).error(function (result) {
                    var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                    $mdDialog.show(alert).finally(function () {
                        alert = undefined;
                    });
                })
            }

            vm.preencherDados = function () {

                vm.tarefaInput.horaInicio = moment($filter('date')(vm.dataInicio, 'dd/MM/yyyy') + ' ' + vm.tarefa.horaInicio, 'DD/MM/YYYY HH:mm').toJSON();
                vm.tarefaInput.horaFim = moment($filter('date')(vm.dataFim, 'dd/MM/yyyy') + ' ' + vm.tarefa.horaFim, 'DD/MM/YYYY HH:mm').toJSON();
                vm.tarefaInput.pessoaId = vm.tarefa.pessoaId;
                vm.tarefaInput.descricao = vm.tarefa.descricao;
                vm.tarefaInput.status = vm.tarefa.status;
                vm.tarefaInput.horasAlocadas = vm.tarefa.horasAlocadas;
            }

            vm.carregarInformacao = function () {

                if (tarefaId != 0) {

                    tarefaService.obter(tarefaId).success(function (result) {
                        vm.tarefa.pessoaId = result.PessoaId;
                        vm.tarefa.descricao = result.Descricao;
                        vm.tarefa.status = result.idStatus;
                        vm.tarefa.horasAlocadas = result.HorasAlocadas;
                        vm.tarefa.horaInicio = $filter('date')(result.HoraInicio, 'HH:mm')
                        vm.tarefa.horaFim = $filter('date')(result.HoraFim, 'HH:mm')
                        vm.dataInicio = new Date(result.HoraInicio)
                        vm.dataFim = new Date(result.HoraFim)
                    }).error(function (result) {
                        var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                        $mdDialog.show(alert).finally(function () {
                            alert = undefined;
                        });
                    })
                }
            };

            vm.carregarPessoa = function () {

                pessoaService.obterTodos().success(function (result) {
                    vm.pessoas = result;
                }).error(function (result) {
                    var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                    $mdDialog.show(alert).finally(function () {
                        alert = undefined;
                    });
                })
            }

            vm.carregarPessoa();
            vm.carregarInformacao();
        }
    );
})();