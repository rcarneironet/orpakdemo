rotas.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function rotas($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('inicio', {
        url: '/',
        templateUrl: 'app/comum/views/home.html'
    });

    $stateProvider.state('pessoas', {
        url: '/pessoas',
        templateUrl: 'app/cadastros/pessoa/views/index.html'
    });

    $stateProvider.state('tarefas', {
        url: '/tarefas',
        templateUrl: 'app/cadastros/tarefa/views/index.html'
    });
};
