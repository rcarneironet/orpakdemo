webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_rotas__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_constants__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_layout__ = __webpack_require__(6);
﻿




function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(__webpack_require__(7));

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


requireAll(__webpack_require__(10));
requireAll(__webpack_require__(11));
requireAll(__webpack_require__(14));
requireAll(__webpack_require__(16));

__WEBPACK_IMPORTED_MODULE_1__app_constants__["a" /* default */].config(appModule);
appModule.config(__WEBPACK_IMPORTED_MODULE_0__app_rotas__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_2__app_layout__["a" /* default */].config(appModule);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rotas;
﻿rotas.$inject = ['$stateProvider', '$urlRouterProvider'];

function rotas($stateProvider, $urlRouterProvider) {

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


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿var constants = [];

var serviceBase = 'http://orpakdemo-api.azurewebsites.net/api/';


constants.push({
    key: 'ngAuthSettings', value: {
        apiServiceBaseUri: serviceBase
    }
});

var configuration = {
    config: function (appModule) {
        constants.forEach(function (constant) {
            appModule.constant(constant.key, constant.value);
        });
    }
};
/* harmony default export */ __webpack_exports__["a"] = (configuration);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿function layout(appModule) {

    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    appModule.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' 
        });
    }]);

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
                            controller: 'cadastros.views.modalAmbiente as vm',
                            parent: angular.element(document.body),
                            targetEvent: ev,
                            fullscreen: useFullScreen,
                            locals: {
                                ambienteId: 0
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

/* harmony default export */ __webpack_exports__["a"] = (configuration);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./js/fixed-table-header.js": 8,
	"./js/md-data-table.js": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 7;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
 * Angular Fixed Table Header
 * https://github.com/daniel-nagy/fixed-table-header
 * @license MIT
 * v0.2.1
 */
(function (window, angular, undefined) {
'use strict';

angular.module('fixed.table.header', []).directive('fixHead', fixHead);

function fixHead($compile, $window) {
  
  function compile(tElement) {
    var table = {
      clone: tElement.parent().clone().empty(),
      original: tElement.parent()
    };
    
    var header = {
      clone: tElement.clone(),
      original: tElement
    };
    
    // prevent recursive compilation
    header.clone.removeAttr('fix-head').removeAttr('ng-if');
    
    table.clone.css({display: 'block', overflow: 'hidden'}).addClass('clone');
    header.clone.css('display', 'block');
    header.original.css('visibility', 'hidden');
    
    return function postLink(scope) {
      var scrollContainer = table.original.parent();
      
      // insert the element so when it is compiled it will link
      // with the correct scope and controllers
      header.original.after(header.clone);
      
      $compile(table.clone)(scope);
      $compile(header.clone)(scope);
      
      scrollContainer.parent()[0].insertBefore(table.clone.append(header.clone)[0], scrollContainer[0]);
      
      scrollContainer.on('scroll', function () {
        // use CSS transforms to move the cloned header when the table is scrolled horizontally
        header.clone.css('transform', 'translate3d(' + -(scrollContainer.prop('scrollLeft')) + 'px, 0, 0)');
      });
      
      function cells() {
        return header.clone.find('th').length;
      }
      
      function getCells(node) {
        return Array.prototype.map.call(node.find('th'), function (cell) {
          return jQLite(cell);
        });
      }
      
      function height() {
        return header.original.prop('clientHeight');
      }
      
      function jQLite(node) {
        return angular.element(node);
      }
      
      function marginTop(height) {
        table.original.css('marginTop', '-' + height + 'px');
      }
      
      function updateCells() {
        var cells = {
          clone: getCells(header.clone),
          original: getCells(header.original)
        };
        
        cells.clone.forEach(function (clone, index) {
          if(clone.data('isClone')) {
            return;
          }
          
          // prevent duplicating watch listeners
          clone.data('isClone', true);
          
          var cell = cells.original[index];
          var style = $window.getComputedStyle(cell[0]);
          
          var getWidth = function () {
            return style.width;
          };
          
          var setWidth = function () {
            marginTop(height());
            clone.css({minWidth: style.width, maxWidth: style.width});
          };
          
          var listener = scope.$watch(getWidth, setWidth);
          
          $window.addEventListener('resize', setWidth);
          
          clone.on('$destroy', function () {
            listener();
            $window.removeEventListener('resize', setWidth);
          });
          
          cell.on('$destroy', function () {
            clone.remove();
          });
        });
      }
      
      scope.$watch(cells, updateCells);
      
      header.original.on('$destroy', function () {
        header.clone.remove();
      });
    };
  }
  
  return {
    compile: compile
  };
}

fixHead.$inject = ['$compile', '$window'];

})(window, angular);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
 * Angular Material Data Table
 * https://github.com/daniel-nagy/md-data-table
 * @license MIT
 * v0.10.9
 */
(function (window, angular, undefined) {
'use strict';

angular.module('md.table.templates', ['md-table-pagination.html', 'md-table-progress.html', 'arrow-up.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);

angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-pagination.html',
    '<div class="page-select" ng-if="$pagination.showPageSelect()">\n' +
    '  <div class="">{{$pagination.label.page}}</div>\n' +
    '\n' +
    '  <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">\n' +
    '    <md-content>\n' +
    '      <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>\n' +
    '    </md-content>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="limit-select" ng-if="$pagination.limitOptions">\n' +
    '  <div class="">{{$pagination.label.rowsPerPage}}</div>\n' +
    '\n' +
    '  <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">\n' +
    '    <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="buttons">\n' +
    '  <div class="">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">\n' +
    '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">\n' +
    '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">\n' +
    '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">\n' +
    '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '</div>');
}]);

angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-progress.html',
    '<tr>\n' +
    '  <th colspan="{{columnCount()}}">\n' +
    '    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n' +
    '  </th>\n' +
    '</tr>');
}]);

angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('arrow-up.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
}]);

angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-before.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
}]);

angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-first.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
}]);

angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-last.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
}]);

angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-next.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
}]);


angular.module('md.data.table', ['md.table.templates']);

angular.module('md.data.table').directive('mdBody', mdBody);

function mdBody() {

  function compile(tElement) {
    tElement.addClass('md-body');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdCell', mdCell);

function mdCell() {
  
  function compile(tElement) {
    var select = tElement.find('md-select');
    
    if(select.length) {
      select.addClass('md-table-select').attr('md-container-class', 'md-table-select');
    }
    
    tElement.addClass('md-cell');
    
    return postLink;
  }
  
  // empty controller to be bind properties to in postLink function
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, ctrls) {
    var select = element.find('md-select');
    var cellCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();
    
    if(attrs.ngClick) {
      element.addClass('md-clickable');
    }
    
    if(select.length) {
      select.on('click', function (event) {
        event.stopPropagation();
      });
      
      element.addClass('md-clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }
    
    cellCtrl.getTable = tableCtrl.getElement;
    
    function getColumn() {
      return tableCtrl.$$columns[getIndex()];
    }
    
    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }
    
    scope.$watch(getColumn, function (column) {
      if(!column) {
        return;
      }
      
      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    });
  }
  
  return {
    controller: Controller,
    compile: compile,
    require: ['mdCell', '^^mdTable'],
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdColumn', mdColumn);

function mdColumn($compile, $mdUtil) {

  function compile(tElement) {
    tElement.addClass('md-column');
    return postLink;
  }

  function postLink(scope, element, attrs, ctrls) {
    var headCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();

    function attachSortIcon() {
      var sortIcon = angular.element('<md-icon md-svg-icon="arrow-up.svg">');

      $compile(sortIcon.addClass('md-sort-icon').attr('ng-class', 'getDirection()'))(scope);

      if(element.hasClass('md-numeric')) {
        element.prepend(sortIcon);
      } else {
        element.append(sortIcon);
      }
    }

    function detachSortIcon() {
      Array.prototype.some.call(element.find('md-icon'), function (icon) {
        return icon.classList.contains('md-sort-icon') && element[0].removeChild(icon);
      });
    }

    function disableSorting() {
      detachSortIcon();
      element.removeClass('md-sort').off('click', setOrder);
    }

    function enableSorting() {
      attachSortIcon();
      element.addClass('md-sort').on('click', setOrder);
    }

    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }

    function isActive() {
      return scope.orderBy && (headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy);
    }

    function isNumeric() {
      return attrs.mdNumeric === '' || scope.numeric;
    }

    function setOrder() {
      scope.$applyAsync(function () {
        if(isActive()) {
          headCtrl.order = scope.getDirection() === 'md-asc' ? '-' + scope.orderBy : scope.orderBy;
        } else {
          headCtrl.order = scope.getDirection() === 'md-asc' ? scope.orderBy : '-' + scope.orderBy;
        }

        if(angular.isFunction(headCtrl.onReorder)) {
          $mdUtil.nextTick(function () {
            headCtrl.onReorder(headCtrl.order);
          });
        }
      });
    }

    function updateColumn(index, column) {
      tableCtrl.$$columns[index] = column;

      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    }

    scope.getDirection = function () {
      if(isActive()) {
        return headCtrl.order.charAt(0) === '-' ? 'md-desc' : 'md-asc';
      }

      return attrs.mdDesc === '' || scope.$eval(attrs.mdDesc) ? 'md-desc' : 'md-asc';
    };

    scope.$watch(isActive, function (active) {
      if(active) {
        element.addClass('md-active');
      } else {
        element.removeClass('md-active');
      }
    });

    scope.$watch(getIndex, function (index) {
      updateColumn(index, {'numeric': isNumeric()});
    });

    scope.$watch(isNumeric, function (numeric) {
      updateColumn(getIndex(), {'numeric': numeric});
    });

    scope.$watch('orderBy', function (orderBy) {
      if(orderBy) {
        if(!element.hasClass('md-sort')) {
          enableSorting();
        }
      } else if(element.hasClass('md-sort')) {
        disableSorting();
      }
    });
  }

  return {
    compile: compile,
    require: ['^^mdHead', '^^mdTable'],
    restrict: 'A',
    scope: {
      numeric: '=?mdNumeric',
      orderBy: '@?mdOrderBy'
    }
  };
}

mdColumn.$inject = ['$compile', '$mdUtil'];

angular.module('md.data.table')
  .decorator('$controller', controllerDecorator)
  .factory('$mdEditDialog', mdEditDialog);

/*
 * A decorator for ng.$controller to optionally bind properties to the
 * controller before invoking the constructor. Stolen from the ngMock.
 *
 * https://docs.angularjs.org/api/ngMock/service/$controller
 */
function controllerDecorator($delegate) {
  return function(expression, locals, later, ident) {
    if(later && typeof later === 'object') {
      var create = $delegate(expression, locals, true, ident);
      angular.extend(create.instance, later);
      return create();
    }
    return $delegate(expression, locals, later, ident);
  };
}

controllerDecorator.$inject = ['$delegate'];
  
function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
  /* jshint validthis: true */
  
  var ESCAPE = 27;
  
  var busy = false;
  var body = angular.element($document.prop('body'));
  
  /*
   * bindToController
   * controller
   * controllerAs
   * locals
   * resolve
   * scope
   * targetEvent
   * template
   * templateUrl
   */
  var defaultOptions = {
    clickOutsideToClose: true,
    disableScroll: true,
    escToClose: true,
    focusOnOpen: true
  };
  
  function build(template, options) {
    var scope = $rootScope.$new();
    var element = $compile(template)(scope);
    var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');
    var controller;
    
    if(options.controller) {
      controller = getController(options, scope, {$element: element, $scope: scope});
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.disableScroll) {
      disableScroll(element);
    }
    
    body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));
    
    positionDialog(element, options.target);
    
    if(options.focusOnOpen) {
      focusOnOpen(element);
    }
    
    if(options.clickOutsideToClose) {
      backdrop.on('click', function () {
        element.remove();
      });
    }
    
    if(options.escToClose) {
      escToClose(element);
    }
    
    element.on('$destroy', function () {
      busy = false;
      backdrop.remove();
    });
    
    return controller;
  }
  
  function disableScroll(element) {
    var restoreScroll = $mdUtil.disableScrollAround(element, body);
    
    element.on('$destroy', function () {
      restoreScroll();
    });
  }
  
  function getController(options, scope, inject) {
    if(!options.controller) {
      return;
    }
    
    if(options.resolve) {
      angular.extend(inject, options.resolve);
    }
    
    if(options.locals) {
      angular.extend(inject, options.locals);
    }
    
    if(options.controllerAs) {
      scope[options.controllerAs] = {};
      
      if(options.bindToController) {
        angular.extend(scope[options.controllerAs], options.scope);
      } else {
        angular.extend(scope, options.scope);
      }
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.bindToController) {
      return $controller(options.controller, inject, scope[options.controllerAs]);
    } else {
      return $controller(options.controller, inject);
    }
  }
  
  function getTemplate(options) {
    return $q(function (resolve, reject) {
      var template = options.template;
      
      function illegalType(type) {
        reject('Unexpected template value. Expected a string; received a ' + type + '.');
      }
      
      if(template) {
        return angular.isString(template) ? resolve(template) : illegalType(typeof template);
      }
      
      if(options.templateUrl) {
        template = $templateCache.get(options.templateUrl);
        
        if(template) {
          return resolve(template);
        }
        
        var success = function (template) {
          return resolve(template);
        };
        
        var error = function () {
          return reject('Error retrieving template from URL.');
        };
        
        return $templateRequest(options.templateUrl).then(success, error);
      }
      
      reject('Template not provided.');
    });
  }
  
  function logError(error) {
    busy = false;
    console.error(error);
  }
  
  function escToClose(element) {
    var keyup = function (event) {
      if(event.keyCode === ESCAPE) {
        element.remove();
      }
    };
    
    body.on('keyup', keyup);
    
    element.on('$destroy', function () {
      body.off('keyup', keyup);
    });
  }

  function focusOnOpen(element) {
    $mdUtil.nextTick(function () {
      var autofocus = $mdUtil.findFocusTarget(element);
      
      if(autofocus) {
        autofocus.focus();
      }
    }, false);
  }

  function positionDialog(element, target) {
    var table = angular.element(target).controller('mdCell').getTable();
    
    var getHeight = function () {
      return element.prop('clientHeight');
    };
    
    var getSize = function () {
      return {
        width: getWidth(),
        height: getHeight()
      };
    };
    
    var getTableBounds = function () {
      var parent = table.parent();
      
      if(parent.prop('tagName') === 'MD-TABLE-CONTAINER') {
        return parent[0].getBoundingClientRect();
      } else {
        return table[0].getBoundingClientRect();
      }
    };
    
    var getWidth = function () {
      return element.prop('clientWidth');
    };
    
    var reposition = function () {
      var size = getSize();
      var cellBounds = target.getBoundingClientRect();
      var tableBounds = getTableBounds();
      
      if(size.width > tableBounds.right - cellBounds.left) {
        element.css('left', tableBounds.right - size.width + 'px');
      } else {
        element.css('left', cellBounds.left + 'px');
      }
      
      if(size.height > tableBounds.bottom - cellBounds.top) {
        element.css('top', tableBounds.bottom - size.height + 'px');
      } else {
        element.css('top', cellBounds.top + 1 + 'px');
      }
      
      element.css('minWidth', cellBounds.width + 'px');
    };
    
    var watchWidth = $rootScope.$watch(getWidth, reposition);
    var watchHeight = $rootScope.$watch(getHeight, reposition);
    
    $window.addEventListener('resize', reposition);
    
    element.on('$destroy', function () {
      watchWidth();
      watchHeight();
      
      $window.removeEventListener('resize', reposition);
    });
  }
  
  function preset(size, options) {
    
    function getAttrs() {
      var attrs = 'type="' + (options.type || 'text') + '"';
      
      for(var attr in options.validators) {
        attrs += ' ' + attr + '="' + options.validators[attr] + '"';
      }
      
      return attrs;
    }
    
    return {
      controller: ['$element', '$q', 'save', '$scope', function ($element, $q, save, $scope) {
        function update() {
          if($scope.editDialog.$invalid) {
            return $q.reject();
          }
          
          if(angular.isFunction(save)) {
            return $q.when(save($scope.editDialog.input));
          }
          
          return $q.resolve();
        }
        
        this.dismiss = function () {
          $element.remove();
        };
        
        this.getInput = function () {
          return $scope.editDialog.input;
        };
        
        $scope.dismiss = this.dismiss;
        
        $scope.submit = function () {
          update().then(function () {
            $scope.dismiss();
          });
        };
      }],
      locals: {
        save: options.save
      },
      scope: {
        cancel: options.cancel || 'Cancel',
        messages: options.messages,
        model: options.modelValue,
        ok: options.ok || 'Save',
        placeholder: options.placeholder,
        title: options.title,
        size: size
      },
      template:
        '<md-edit-dialog>' +
          '<div layout="column" class="md-content">' +
            '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +
            '<form name="editDialog" layout="column" ng-submit="submit(model)">' +
              '<md-input-container md-no-float>' +
                '<input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
                '<div ng-messages="editDialog.input.$error">' +
                  '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +
                '</div>' +
              '</md-input-container>' +
            '</form>' +
          '</div>' +
          '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +
            '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +
            '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +
          '</div>' +
        '</md-edit-dialog>'
    };
  }
  
  this.show = function (options) {
    if(busy) {
      return $q.reject();
    }
    
    busy = true;
    options = angular.extend({}, defaultOptions, options);
    
    if(!options.targetEvent) {
      return logError('options.targetEvent is required to align the dialog with the table cell.');
    }
    
    if(!options.targetEvent.currentTarget.classList.contains('md-cell')) {
      return logError('The event target must be a table cell.');
    }
    
    if(options.bindToController && !options.controllerAs) {
      return logError('You must define options.controllerAs when options.bindToController is true.');
    }
    
    options.target = options.targetEvent.currentTarget;
    
    var promise = getTemplate(options);
    var promises = [promise];
    
    for(var prop in options.resolve) {
      promise = options.resolve[prop];
      promises.push($q.when(angular.isFunction(promise) ? promise() : promise));
    }
    
    promise = $q.all(promises);
    
    promise['catch'](logError);
    
    return promise.then(function (results) {
      var template = results.shift();
      
      for(var prop in options.resolve) {
        options.resolve[prop] = results.shift();
      }
      
      return build(template, options);
    });
  };
  
  this.small = function (options) {
    return this.show(angular.extend({}, options, preset('small', options)));
  }.bind(this);
  
  this.large = function (options) {
    return this.show(angular.extend({}, options, preset('large', options)));
  }.bind(this);
  
  return this;
}

mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];


angular.module('md.data.table').directive('mdFoot', mdFoot);

function mdFoot() {

  function compile(tElement) {
    tElement.addClass('md-foot');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdHead', mdHead);

function mdHead($compile) {

  function compile(tElement) {
    tElement.addClass('md-head');
    return postLink;
  }
  
  // empty controller to be bind scope properties to
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    // because scope.$watch is unpredictable
    var oldValue = new Array(2);
    
    function addCheckboxColumn() {
      element.children().prepend('<th class="md-column md-checkbox-column">');
    }
    
    function attatchCheckbox() {
      element.prop('lastElementChild').firstElementChild.appendChild($compile(createCheckBox())(scope)[0]);
    }
    
    function createCheckBox() {
      return angular.element('<md-checkbox>').attr({
        'aria-label': 'Select All',
        'ng-click': 'toggleAll()',
        'ng-checked': 'allSelected()',
        'ng-disabled': '!getSelectableRows().length'
      });
    }
    
    function detachCheckbox() {
      var cell = element.prop('lastElementChild').firstElementChild;
      
      if(cell.classList.contains('md-checkbox-column')) {
        angular.element(cell).empty();
      }
    }
    
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function mdSelectCtrl(row) {
      return angular.element(row).controller('mdSelect');
    }
    
    function removeCheckboxColumn() {
      Array.prototype.some.call(element.find('th'), function (cell) {
        return cell.classList.contains('md-checkbox-column') && cell.remove();
      });
    }
    
    scope.allSelected = function () {
      var rows = scope.getSelectableRows();
      
      return rows.length && rows.every(function (row) {
        return row.isSelected();
      });
    };
    
    scope.getSelectableRows = function () {
      return tableCtrl.getBodyRows().map(mdSelectCtrl).filter(function (ctrl) {
        return ctrl && !ctrl.disabled;
      });
    };
    
    scope.selectAll = function () {
        tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };
    
    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };
    
    scope.unSelectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };
    
    scope.$watchGroup([enableRowSelection, tableCtrl.enableMultiSelect], function (newValue) {
      if(newValue[0] !== oldValue[0]) {
        if(newValue[0]) {
          addCheckboxColumn();
          
          if(newValue[1]) {
            attatchCheckbox();
          }
        } else {
          removeCheckboxColumn();
        }
      } else if(newValue[0] && newValue[1] !== oldValue[1]) {
        if(newValue[1]) {
          attatchCheckbox();
        } else {
          detachCheckbox();
        }
      }
      
      angular.copy(newValue, oldValue);
    });
  }
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdHead',
    require: '^^mdTable',
    restrict: 'A',
    scope: {
      order: '=?mdOrder',
      onReorder: '=?mdOnReorder'
    }
  };
}

mdHead.$inject = ['$compile'];

angular.module('md.data.table').directive('mdRow', mdRow);

function mdRow() {

  function compile(tElement) {
    tElement.addClass('md-row');
    return postLink;
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function isBodyRow() {
      return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
    }
    
    function isChild(node) {
      return element[0].contains(node[0]);
    }
    
    if(isBodyRow()) {
      var cell = angular.element('<td class="md-cell">');
      
      scope.$watch(enableRowSelection, function (enable) {
        // if a row is not selectable, prepend an empty cell to it
        if(enable && !attrs.mdSelect) {
          if(!isChild(cell)) {
            element.prepend(cell);
          }
          return;
        }
        
        if(isChild(cell)) {
          cell.remove();
        }
      });
    }
  }

  return {
    compile: compile,
    require: '^^mdTable',
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdSelect', mdSelect);

function mdSelect($compile, $parse) {

  // empty controller to bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, ctrls) {
    var self = ctrls.shift();
    var tableCtrl = ctrls.shift();
    var getId = $parse(attrs.mdSelectId);

    self.id = getId(self.model);

    if(tableCtrl.$$rowSelect && self.id) {
      if(tableCtrl.$$hash.has(self.id)) {
        var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));

        // if the item is no longer selected remove it
        if(index === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        // if the item is not a reference to the current model update the reference
        else if(!tableCtrl.$$hash.equals(self.id, self.model)) {
          tableCtrl.$$hash.update(self.id, self.model);
          tableCtrl.selected.splice(index, 1, self.model);
        }

      } else {

        // check if the item has been selected
        tableCtrl.selected.some(function (item, index) {
          if(getId(item) === self.id) {
            tableCtrl.$$hash.update(self.id, self.model);
            tableCtrl.selected.splice(index, 1, self.model);

            return true;
          }
        });
      }
    }

    self.isSelected = function () {
      if(!tableCtrl.$$rowSelect) {
        return false;
      }

      if(self.id) {
        return tableCtrl.$$hash.has(self.id);
      }

      return tableCtrl.selected.indexOf(self.model) !== -1;
    };

    self.select = function () {
      if(self.disabled) {
        return;
      }

      if(tableCtrl.enableMultiSelect()) {
        tableCtrl.selected.push(self.model);
      } else {
        tableCtrl.selected.splice(0, tableCtrl.selected.length, self.model);
      }

      if(angular.isFunction(self.onSelect)) {
        self.onSelect(self.model);
      }
    };

    self.deselect = function () {
      if(self.disabled) {
        return;
      }

      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);

      if(angular.isFunction(self.onDeselect)) {
        self.onDeselect(self.model);
      }
    };

    self.toggle = function (event) {
      if(event && event.stopPropagation) {
        event.stopPropagation();
      }

      return self.isSelected() ? self.deselect() : self.select();
    };

    function autoSelect() {
      return attrs.mdAutoSelect === '' || self.autoSelect;
    }

    function createCheckbox() {
      var checkbox = angular.element('<md-checkbox>').attr({
        'aria-label': 'Select Row',
        'ng-click': '$mdSelect.toggle($event)',
        'ng-checked': '$mdSelect.isSelected()',
        'ng-disabled': '$mdSelect.disabled'
      });

      return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));
    }

    function disableSelection() {
      Array.prototype.some.call(element.children(), function (child) {
        return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);
      });

      if(autoSelect()) {
        element.off('click', toggle);
      }
    }

    function enableSelection() {
      element.prepend(createCheckbox());

      if(autoSelect()) {
        element.on('click', toggle);
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function onSelectChange(selected) {
      if(!self.id) {
        return;
      }

      if(tableCtrl.$$hash.has(self.id)) {
        // check if the item has been deselected
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        return;
      }

      // check if the item has been selected
      if(selected.indexOf(self.model) !== -1) {
        tableCtrl.$$hash.update(self.id, self.model);
      }
    }

    function toggle(event) {
      scope.$applyAsync(function () {
        self.toggle(event);
      });
    }

    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        enableSelection();
      } else {
        disableSelection();
      }
    });

    scope.$watch(autoSelect, function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }

      if(tableCtrl.$$rowSelect && newValue) {
        element.on('click', toggle);
      } else {
        element.off('click', toggle);
      }
    });

    scope.$watch(self.isSelected, function (isSelected) {
      return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');
    });

    scope.$watch(tableCtrl.enableMultiSelect, function (multiple) {
      if(tableCtrl.$$rowSelect && !multiple) {
        // remove all but the first selected item
        tableCtrl.selected.splice(1);
      }
    });

    tableCtrl.registerModelChangeListener(onSelectChange);

    element.on('$destroy', function () {
      tableCtrl.removeModelChangeListener(onSelectChange);
    });
  }

  return {
    bindToController: true,
    controller: Controller,
    controllerAs: '$mdSelect',
    link: postLink,
    require: ['mdSelect', '^^mdTable'],
    restrict: 'A',
    scope: {
      model: '=mdSelect',
      disabled: '=ngDisabled',
      onSelect: '=?mdOnSelect',
      onDeselect: '=?mdOnDeselect',
      autoSelect: '=mdAutoSelect'
    }
  };
}

mdSelect.$inject = ['$compile', '$parse'];

angular.module('md.data.table').directive('mdTable', mdTable);

function Hash() {
  var keys = {};
  
  this.equals = function (key, item) {
    return keys[key] === item;
  };

  this.get = function (key) {
    return keys[key];
  };
  
  this.has = function (key) {
    return keys.hasOwnProperty(key);
  };

  this.purge = function (key) {
    delete keys[key];
  };
  
  this.update = function (key, item) {
    keys[key] = item;
  };
}

function mdTable() {
  
  function compile(tElement, tAttrs) {
    tElement.addClass('md-table');
    
    if(tAttrs.hasOwnProperty('mdProgress')) {
      var body = tElement.find('tbody')[0];
      var progress = angular.element('<thead class="md-table-progress">');
      
      if(body) {
        tElement[0].insertBefore(progress[0], body);
      }
    }
  }
  
  function Controller($attrs, $element, $q, $scope) {
    var self = this;
    var queue = [];
    var watchListener;
    var modelChangeListeners = [];
    
    self.$$hash = new Hash();
    self.$$columns = {};
    
    function enableRowSelection() {
      self.$$rowSelect = true;
      
      watchListener = $scope.$watchCollection('$mdTable.selected', function (selected) {
        modelChangeListeners.forEach(function (listener) {
          listener(selected);
        });
      });
      
      $element.addClass('md-row-select');
    }
    
    function disableRowSelection() {
      self.$$rowSelect = false;
      
      if(angular.isFunction(watchListener)) {
        watchListener();
      }
      
      $element.removeClass('md-row-select');
    }
    
    function resolvePromises() {
      if(!queue.length) {
        return $scope.$applyAsync();
      }
      
      queue[0]['finally'](function () {
        queue.shift();
        resolvePromises();
      });
    }
    
    function rowSelect() {
      return $attrs.mdRowSelect === '' || self.rowSelect;
    }
    
    function validateModel() {
      if(!self.selected) {
        return console.error('Row selection: ngModel is not defined.');
      }
      
      if(!angular.isArray(self.selected)) {
        return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');
      }
      
      return true;
    }
    
    self.columnCount = function () {
      return self.getRows($element[0]).reduce(function (count, row) {
        return row.cells.length > count ? row.cells.length : count;
      }, 0);
    };
    
    self.getRows = function (element) {
      return Array.prototype.filter.call(element.rows, function (row) {
        return !row.classList.contains('ng-leave');
      });
    };
    
    self.getBodyRows = function () {
      return Array.prototype.reduce.call($element.prop('tBodies'), function (result, tbody) {
        return result.concat(self.getRows(tbody));
      }, []);
    };
    
    self.getElement = function () {
      return $element;
    };
    
    self.getHeaderRows = function () {
      return self.getRows($element.prop('tHead'));
    };
    
    self.enableMultiSelect = function () {
      return $attrs.multiple === '' || $scope.$eval($attrs.multiple);
    };
    
    self.waitingOnPromise = function () {
      return !!queue.length;
    };
    
    self.queuePromise = function (promise) {
      if(!promise) {
        return;
      }
      
      if(queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
        resolvePromises();
      }
    };
    
    self.registerModelChangeListener = function (listener) {
      modelChangeListeners.push(listener);
    };
    
    self.removeModelChangeListener = function (listener) {
      var index = modelChangeListeners.indexOf(listener);
      
      if(index !== -1) {
        modelChangeListeners.splice(index, 1);
      }
    };
    
    if($attrs.hasOwnProperty('mdProgress')) {
      $scope.$watch('$mdTable.progress', self.queuePromise);
    }
    
    $scope.$watch(rowSelect, function (enable) {
      if(enable && !!validateModel()) {
        enableRowSelection();
      } else {
        disableRowSelection();
      }
    });
  }
  
  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdTable',
    restrict: 'A',
    scope: {
      progress: '=?mdProgress',
      selected: '=ngModel',
      rowSelect: '=mdRowSelect'
    }
  };
}

angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);

function mdTablePagination() {

  function compile(tElement) {
    tElement.addClass('md-table-pagination');
  }

  function Controller($attrs, $mdUtil, $scope) {
    var self = this;
    var defaultLabel = {
      page: 'Page:',
      rowsPerPage: 'Rows per page:',
      of: 'of'
    };

    self.label = angular.copy(defaultLabel);

    function isPositive(number) {
      return parseInt(number, 10) > 0;
    }

    self.eval = function (expression) {
      return $scope.$eval(expression);
    };

    self.first = function () {
      self.page = 1;
      self.onPaginationChange();
    };

    self.hasNext = function () {
      return self.page * self.limit < self.total;
    };

    self.hasPrevious = function () {
      return self.page > 1;
    };

    self.last = function () {
      self.page = self.pages();
      self.onPaginationChange();
    };

    self.max = function () {
      return self.hasNext() ? self.page * self.limit : self.total;
    };

    self.min = function () {
      return isPositive(self.total) ? self.page * self.limit - self.limit + 1 : 0;
    };

    self.next = function () {
      self.page++;
      self.onPaginationChange();
    };

    self.onPaginationChange = function () {
      if(angular.isFunction(self.onPaginate)) {
        $mdUtil.nextTick(function () {
          self.onPaginate(self.page, self.limit);
        });
      }
    };

    self.pages = function () {
      return isPositive(self.total) ? Math.ceil(self.total / (isPositive(self.limit) ? self.limit : 1)) : 1;
    };

    self.previous = function () {
      self.page--;
      self.onPaginationChange();
    };

    self.showBoundaryLinks = function () {
      return $attrs.mdBoundaryLinks === '' || self.boundaryLinks;
    };

    self.showPageSelect = function () {
      return $attrs.mdPageSelect === '' || self.pageSelect;
    };

    $scope.$watch('$pagination.limit', function (newValue, oldValue) {
      if(isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
        return;
      }

      // find closest page from previous min
      self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isPositive(newValue) ? newValue : 1));
      self.onPaginationChange();
    });

    $attrs.$observe('mdLabel', function (label) {
      angular.extend(self.label, defaultLabel, $scope.$eval(label));
    });

    $scope.$watch('$pagination.total', function (newValue, oldValue) {
      if(isNaN(newValue) || newValue === oldValue) {
        return;
      }

      if(self.page > self.pages()) {
        self.last();
      }
    });
  }

  Controller.$inject = ['$attrs', '$mdUtil', '$scope'];

  return {
    bindToController: {
      boundaryLinks: '=?mdBoundaryLinks',
      disabled: '=ngDisabled',
      limit: '=mdLimit',
      page: '=mdPage',
      pageSelect: '=?mdPageSelect',
      onPaginate: '=?mdOnPaginate',
      limitOptions: '=?mdLimitOptions',
      total: '@mdTotal'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$pagination',
    restrict: 'E',
    scope: {},
    templateUrl: 'md-table-pagination.html'
  };
}

angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);

function mdTableProgress() {

  function postLink(scope, element, attrs, tableCtrl) {
    scope.columnCount = tableCtrl.columnCount;
    scope.deferred = tableCtrl.waitingOnPromise;
  }

  return {
    link: postLink,
    require: '^^mdTable',
    restrict: 'C',
    scope: {},
    templateUrl: 'md-table-progress.html'
  };
}

angular.module('md.data.table').directive('virtualPageSelect', virtualPageSelect);

function virtualPageSelect() {

  function Controller($element, $scope) {
    var self = this;
    var content = $element.find('md-content');

    self.pages = [];

    function getMin(pages, total) {
      return Math.min(pages, isFinite(total) && isPositive(total) ? total : 1);
    }

    function isPositive(number) {
      return number > 0;
    }

    function setPages(max) {
      if(self.pages.length > max) {
        return self.pages.splice(max);
      }

      for(var i = self.pages.length; i < max; i++) {
        self.pages.push(i + 1);
      }
    }

    content.on('scroll', function () {
      if((content.prop('clientHeight') + content.prop('scrollTop')) >= content.prop('scrollHeight')) {
        $scope.$applyAsync(function () {
          setPages(getMin(self.pages.length + 10, self.total));
        });
      }
    });

    $scope.$watch('$pageSelect.total', function (total) {
      setPages(getMin(Math.max(self.pages.length, 10), total));
    });

    $scope.$watch('$pagination.page', function (page) {
      for(var i = self.pages.length; i < page; i++) {
        self.pages.push(i + 1);
      }
    });
  }

  Controller.$inject = ['$element', '$scope'];

  return {
    bindToController: {
      total: '@'
    },
    controller: Controller,
    controllerAs: '$pageSelect'
  };
}

})(window, angular);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pessoaService.js": 12,
	"./tarefaService.js": 13
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

﻿(function () {
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

/***/ }),
/* 13 */
/***/ (function(module, exports) {

﻿(function () {
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./views/home.js": 15
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 14;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

﻿(function () {
    angular.module('orpak').controller('comum.views.home', ['$scope',
    function ($scope) {
        var vm = this;

    }]);
})();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Pessoa/views/index.js": 17,
	"./Pessoa/views/modal.js": 18,
	"./Tarefa/views/index.js": 19,
	"./Tarefa/views/modal.js": 20
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 16;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

﻿(function () {
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

/***/ }),
/* 18 */
/***/ (function(module, exports) {

﻿(function () {
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

/***/ }),
/* 19 */
/***/ (function(module, exports) {

﻿(function () {
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

/***/ }),
/* 20 */
/***/ (function(module, exports) {

﻿(function () {
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

/***/ })
],[3]);
//# sourceMappingURL=app.bundle.js.map