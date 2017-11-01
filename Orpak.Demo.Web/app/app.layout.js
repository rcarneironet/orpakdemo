function layout(appModule) {

    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    appModule.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' 
        });
    }]);

    appModule.config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };
    });

    appModule.controller('comum.views.inicio', ['$scope', '$rootScope', '$state', '$mdMedia', '$mdDialog', '$location', '$mdSidenav',
            function ($scope, $rootScope, $state, $mdMedia, $mdDialog, $location, $mdSidenav) {
                var vm = this;

                vm.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };

                vm.menuPrincipal = [{ nome: 'Tarefas', icon: 'settings', url: 'tarefas' }];
                vm.selectedMode = 'md-fab md-fab-bottom-right md-fling';

                vm.abrir = function (url) {
                    $state.go(url);
                }

                vm.delay = 0;
                vm.minDuration = 0;
                vm.message = 'Aguarde...';
                vm.backdrop = true;
                vm.loading = null;
                vm.resultado = null;

                vm.abrirModal = function (ev) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                    if ($location.path() == "/pessoas") {
                        $mdDialog.show({
                            templateUrl: 'cadastro.html',
                            controller: 'cadastros.views.modalPessoa as vm',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            fullscreen: useFullScreen,
                            locals: {
                                pessoaId: 0
                            }
                        }).then(function () {
                            $rootScope.$emit("CallParentMethod", {});
                        });
                    }
                    else if ($location.path() == "/tarefas") {
                        $mdDialog.show({
                            templateUrl: 'cadastro.html',
                            controller: 'cadastros.views.modalTarefa as vm',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            fullscreen: useFullScreen,
                            locals: {
                                tarefaId: 0
                            }
                        }).then(function () {
                            $rootScope.$emit("CallParentMethod", {});
                        });
                    }
                };
            }
    ]);

    appModule.controller('comum.views.header', ['$scope', '$mdSidenav', '$mdDialog','$mdMedia', 
        function ($scope, $mdSidenav, $mdDialog, $mdMedia) {
            var vm = this;
            vm.toggleSidenav = function (menu) {
                $mdSidenav(menu).toggle();
            }

            vm.menuSetup = {
                menus: [{
                    nome: 'Usuários', icon: 'message', width: '4',
                    submenus: [{ nome: 'Cadastro Usuários', link: '' }]
                }]
            }
    }]);
};


var configuration = {
    config: layout
};

export default configuration;