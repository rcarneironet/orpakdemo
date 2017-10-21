(function () {
    angular.module('orpak').controller('cadastros.views.modalTarefa',
        function ($scope, $rootScope, $mdSidenav, $mdDialog, $mdMedia, tarefaService, tarefaId) {
            var vm = this;

            vm.tarefa = [];
            vm.nomePessoa = "";
            vm.status = "";
            vm.descricao = "";

            vm.fecharModal = function () {
                vm.nomePessoa = "";
                vm.status = "";
                vm.descricao = "";
                $mdDialog.cancel();
            };

            vm.alterar = function () {
                tarefaService.alterarStatus(tarefaId, vm.status).success(function (result) {
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

            vm.carregarInformacao = function () {

                if (tarefaId != 0) {

                    tarefaService.obter(tarefaId).success(function (result) {
                        vm.nomePessoa = result.NomePessoa;
                        vm.descricao = result.Descricao;
                        vm.status = result.idStatus;
                    }).error(function (result) {
                        var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                        $mdDialog.show(alert).finally(function () {
                            alert = undefined;
                        });
                    })
                }
            };

            vm.carregarInformacao();
        }
    );
})();