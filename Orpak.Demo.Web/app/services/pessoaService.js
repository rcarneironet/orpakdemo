(function () {
    angular.module('orpak').factory('pessoaService', ['$http', 'ngAuthSettings', '$q', function (
        $http,
        ngAuthSettings
    ) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri + 'Pessoa/';

        return {
            listar: listar,
            inserir: inserir,
            obter: obter,
            alterar: alterar,
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

        function inserir(pessoa) {
            return $http.post(serviceBase, pessoa);
        }

        function alterar(id, insumo) {
            return $http.put(serviceBase + id, pessoa);
        }

        function obter(id) {
            return $http.get(serviceBase + id);
        }
    }]);
})();