(function () {
    angular.module('orpak').factory('tarefaService', ['$http', 'ngAuthSettings', '$q', function (
        $http,
        ngAuthSettings
    ) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri + 'Tarefa/';

        return {
            listar: listar,
            inserir: inserir,
            obter: obter,
            alterar: alterar,
            alterarStatus : alterarStatus,
            excluir: excluir,
        };

        function listar(paginaAtual, totalPorPagina) {
            return $http({
                method: 'GET',
                url: serviceBase,
                params: {
                    paginaAtual: paginaAtual,
                    totalPagina: totalPorPagina
                }
            });
        }

        function inserir(tarefa) {
            return $http.post(serviceBase, tarefa);
        }

        function alterar(id, tarefa) {
            return $http.put(serviceBase + id, tarefa);
        }

        function alterarStatus(id, idStatus) {
            return $http.put(serviceBase + id + '/Status/' + idStatus);
        }

        function obter(id) {
            return $http.get(serviceBase + id);
        }

        function excluir(id) {
            return $http.delete(serviceBase + id);
        }
    }]);
})();