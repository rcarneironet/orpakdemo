
import rotas from './app.rotas';
import constants from './app.constants';
import layout from './app.layout';

function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(require.context('../assets/plugins/md-data-table', true, /\.js$/));

var appModule = angular.module("orpak", [
    'ui.router',
    'ngMaterial',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'cgBusy',
    'oc.lazyLoad',
    'ngTouch',
    'md.data.table',
    'fixed.table.header'
]);


requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./services', true, /\.js$/));
requireAll(require.context('./comum', true, /\.js$/));
requireAll(require.context('./cadastros', true, /\.js$/));

constants.config(appModule);
appModule.config(rotas);
layout.config(appModule);