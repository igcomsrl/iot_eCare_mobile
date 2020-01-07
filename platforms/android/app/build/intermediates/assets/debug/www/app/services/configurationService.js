metiMobile.factory("configurationService",
    ["$q", "$rootScope", "$state", "zeusAuthService", "$ionicPopup", '$cordovaDialogs', '$state',
        function ($q, $rootScope, $state, zeusAuthService, $ionicPopup, $cordovaDialogs, $state) {
            var factory = {};


            factory.configureEssentials = function () {
                $rootScope.isAppReady = false;
                $rootScope.validationMessages =
                    {
                        'required': "Campo obbligatorio.",
                        'fieldsStarRequired': "I campi marcati con * sono obbligatori.",
                        'maxLength': "Numero massimo di caratteri: ",
                        'formErrors': 'Validazione fallita. Verifica che i campi segnati in rosso siano validi.',
                        'emailFormatInvalid': 'Formato email non valido.',
                        'saveSuccess': 'Salvataggio eseguito con successo.',
                        'deleteSuccess': 'Eliminazione avvenuta con successo.',
                        'commonError': 'Errore, operazione fallita.'
                    }
                $rootScope.logout = function () {
                    $cordovaDialogs.confirm('Sei sicuro di voler eseguire il logout?', 'Logout', ['Si', 'No'])
                        .then(function (buttonIndex) {
                            // no button = 0, 'OK' = 1, 'Cancel' = 2
                            var btnIndex = buttonIndex;
                            if (btnIndex == 1) {

                                zeusAuthService.logout();
                                $rootScope.isAuth = false;
                                $state.go("login");
                            }
                        });
                }

                $rootScope.isMacFakeEnabled = true;
                $rootScope.autoAlertTimeout = 30000; //Se dopo X secondi l paziente non risponde ad un messaggio di aiuto, scatta l'allarme automaticamente
                $rootScope.noderedAuthUser = "ubuntu";
                $rootScope.noderedAuthPassword = "G10m1R0m3";
                $rootScope.isInvited = false; //indica se l'utente è stato inviato da un paziente
                $rootScope.operativeCenterPhoneNumber = "3518900990" //NUmero di trimarchi
                $rootScope.getPatientDashboardUrl ="http://212.189.207.224:3000/d/XFWJlkuiz/test-sempre-vicini";
                $rootScope.getPatientDashboardUrlFiltered ="http://212.189.207.224:3000/dashboard/script/scripted.js";
            }

            factory.enableZeusWatchs = function () {
                $rootScope.$on("zeus-login-success", function (event, loginInfo) {
                    $rootScope.isAuth = true;
                    //Idle.watch();
                });

                $rootScope.$on("zeus-logout", function (data) {
                    //$state.go("login");
                    //Idle.unwatch();
                    $rootScope.username = '';
                    $rootScope.isAuth = false;
                });

                $rootScope.$on("zeus-refreshtoken-success", function (data) {
                });

                $rootScope.$on("zeus-login-required", function (data) {
                    $ionicPopup.alert({
                        title: 'Login richiesto',
                        template: 'Effettuare il login tramite il menu di sinistra'
                    });
                });

                $rootScope.$on("zeus-claims-missing", function (data, args) {

                    if ($state.current.url === "" || $state.current.url === "^") {
                        $state.go("home");
                        //$state.go("login");
                    }
                    toastr.info(args.errorMessage);
                });
                $rootScope.refreshTokenClick = zeusAuthService.refreshToken;
            }

            factory.initConfiguration = function (request) {
                var deferred = $q.defer();

                deferred.resolve();
                return deferred.promise;
            }


            return factory;
        }]);