(function () {
    angular.module('orpak').controller('cadastros.views.tarefa',
        function ($scope, $mdSidenav, $mdDialog, $mdMedia, $rootScope, tarefaService) {
            var vm = this;

            vm.tarefas = [];

            $rootScope.$on("CallParentMethod", function () {
                vm.carregarGrid();
            });

            vm.deletar = function (ev, id) {

                var confirm = $mdDialog.confirm()
                              .title('Confirmação')
                              .textContent('Deseja excluir o registro?')
                              .ariaLabel('Lucky day')
                              .targetEvent(ev)
                              .ok('Ok')
                              .cancel('Cancelar');

                $mdDialog.show(confirm).then(function () {
                    $scope.$parent.vm.loading = tarefaService.excluir(id).success(function (result) {
                        vm.carregarGrid();
                    }).error(function (result) {
                        var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                        $mdDialog.show(alert).finally(function () {
                            alert = undefined;
                        });
                    })
                });
              
            }
            

            vm.abrirModal = function (ev, id) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    templateUrl: 'cadastro.html',
                    controller: 'cadastros.views.modalTarefa as vm',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: useFullScreen,
                    locals: {
                        tarefaId: id
                    }
                }).then(function () {
                    vm.carregarGrid();
                });
            };

            vm.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                decapitate: false,
                largeEditDialog: false,
                boundaryLinks: false,
                limitSelect: true,
                pageSelect: true
            };

            vm.query = { order: 'Id', limit: 10, page: 1 };

            vm.carregarGrid = function () {

                //var pageNumber = ((vm.query.page - 1) * vm.query.limit);
                var pageNumber = vm.query.page;
                var pageSize = vm.query.limit;

                $scope.$parent.vm.loading = tarefaService.listar(pageNumber, pageSize).success(function (result) {
                    vm.qtdRegistros = result.Total;
                    vm.tarefas = result.Result;
                }).error(function (result) {
                    var alert = $mdDialog.alert({ title: 'Erro', textContent: response.data.Message, ok: 'Fechar' });

                    $mdDialog.show(alert).finally(function () {
                        alert = undefined;
                    });
                })
            };

            vm.paginacaoGrid = function (page, limit) {
                vm.query.page = page;
                vm.query.limit = limit;

                vm.carregarGrid();
            }

            vm.carregarGrid();
        }
    );
})();