(function () {
    angular.module('orpak').controller('cadastros.views.pessoa',
        function ($scope, $mdSidenav, $mdDialog, $mdMedia, $rootScope, pessoaService) {
            var vm = this;

            vm.pessoas = [];

            $rootScope.$on("CallParentMethod", function () {
                vm.carregarGrid();
            });

           
            vm.abrirModal = function (ev, id) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    templateUrl: 'cadastro.html',
                    controller: 'cadastros.views.modalPessoa as vm',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    fullscreen: useFullScreen,
                    locals: {
                        pessoaId: id
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

            vm.query = { order: 'Nome', limit: 10, page: 1 };

            vm.carregarGrid = function () {

                var pageNumber = ((vm.query.page - 1) * vm.query.limit);
                var pageSize = vm.query.limit;

                $scope.$parent.vm.loading =  pessoaService.listar(pageNumber, pageSize).success(function (result) {
                    vm.qtdRegistros = result.Total;
                    vm.depoimentos = result.Resultados;
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

            //vm.carregarGrid();
        }
    );
})();