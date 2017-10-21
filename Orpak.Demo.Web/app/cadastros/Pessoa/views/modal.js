(function () {
    angular.module('orpak').controller('cadastros.views.modalPessoa',
        function ($scope, $mdSidenav, $mdDialog, $mdMedia, pessoaService, pessoaId) {
            var vm = this;

            vm.pessoa = [];
            vm.nome = "";

            vm.fecharModal = function () {
                vm.nome = "";
                $mdDialog.cancel();
            };

            vm.carregarInformacao = function () {

                if (pessoaId != 0) {

                    $scope.$parent.vm.loading = pessoaService.obter(pessoaId).success(function (result) {
                        vm.nome = response.Nome;
                    }).error(function (result) {
                        var alert = $mdDialog.alert({ title: 'Erro', textContent: response.Message, ok: 'Fechar' });

                        $mdDialog.show(alert).finally(function () {
                            alert = undefined;
                        });
                    })
                }
            };

            //vm.carregarInformacao();
        }
    );
})();