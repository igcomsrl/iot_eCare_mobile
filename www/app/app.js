var metiMobile = angular.module('metiMobile', ['ionic', 'igcom-framework', 'igcom-zeus', 'ngCordova'])

  .run(['$ionicPlatform',
    'zeusAuthService',
    'configurationService',
    'accountService',
    '$rootScope',
    '$state',
    'metiClientId',
    'processInstanceService',
    'serverRouteMap',
    'inviteFriendService',
    function ($ionicPlatform, zeusAuthService, configurationService, accountService, $rootScope, $state, metiClientId, processInstanceService, serverRouteMap, inviteFriendService) {
      $ionicPlatform.ready(function () {

        if (window.cordova && window.Keyboard) {
          window.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        //Autostart app
        cordova.plugins.autoStart.enable();

        zeusAuthService.init(metiClientId, serverRouteMap.routeMap.zeus.login);

        configurationService.configureEssentials();

        //Configurazione applicativa di base
        configurationService.initConfiguration().then(function (success) {
          //Abilito i listeners di zeus
          configurationService.enableZeusWatchs();

          //Imposto il profilo utente
          accountService.setProfile();

        }, function (error) {
          zeusAuthService.logout();
          $state.go("login");
        }).finally(function () {
          $rootScope.isAppReady = true;
        });
      });
    }])

  //Produzione
  .value('apiEndPoint', "http://37.148.227.52/semprevicini/")
  .value('zeusEndpoint', "http://37.148.227.52/semprevicini/")
  .value('noderedEndpoint', "http://212.189.207.224:1880/")

  //Test
  // .value('apiEndPoint', "http://192.168.33.174/meti.app/")
  // .value('zeusEndpoint', "http://192.168.33.174/meti.app/")
  // .value('noderedEndpoint', "http://212.189.207.224:1881/")

  .value('metiClientId', "metiApp")

  .config(function ($stateProvider, $urlRouterProvider) {
    var requireLogin = true;
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/templates/menu.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/home.html'
          }
        },
      })
      .state('app.andamento', {
        url: '/andamento',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/andamento.html',
            controller: 'AndamentoCtrl'
          }
        },
        data: {
          requireLogin: true,
        }
      })
      .state('app.bugiardino', {
        url: '/bugiardino',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/bugiardino.html',
            controller: 'BugiardinoCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.profilo', {
        url: '/profilo',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/profilo.html',
            controller: 'ProfiloCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.rilevazione', {
        url: '/rilevazione',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/rilevazione.html',
            controller: 'RilevazioneCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.videochiamata', {
        url: '/videochiamata',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/videochiamata.html',
            controller: 'VideochiamataCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/help.html',
            controller: 'HelpCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.settings', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/settings.html',
            controller: 'SettingsCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.inviteFriendHub', {
        url: '/inviteFriendHub',
        abstract: true,
        views: {
          'menuContent': {
            templateUrl: 'app/templates/inviteFriendHub.html',
            controller: 'InviteFriendCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.inviteFriendHub.create', {
        url: '/inviteFriend-create',
        views: {
          'inviteFriend-create': {
            templateUrl: 'app/templates/inviteFriend-create.html'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.inviteFriendHub.index', {
        url: '/inviteFriend-index',
        views: {
          'inviteFriend-index': {
            templateUrl: 'app/templates/inviteFriend-index.html'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.device', {
        url: '/device',
        views: {
          'menuContent': {
            templateUrl: 'app/templates/device.html',
            controller: 'DispositivoCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })

      .state('app.deviceHub', {
        url: '/deviceHub',
        abstract: true,
        views: {
          'menuContent': {
            templateUrl: 'app/templates/deviceHub.html',
            controller: 'DispositivoCtrl'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.deviceHub.device', {
        url: '/devices',
        views: {
          'device': {
            templateUrl: 'app/templates/device.html'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.deviceHub.scan', {
        url: '/scans',
        views: {
          'scan': {
            templateUrl: 'app/templates/scan.html'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      .state('app.deviceHub.paried', {
        url: '/paried',
        views: {
          'paried': {
            templateUrl: 'app/templates/paried.html'
          }
        },
        data: {
          requireLogin: requireLogin,
        }
      })
      ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
