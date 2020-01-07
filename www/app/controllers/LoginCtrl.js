metiMobile.controller("LoginCtrl",
    ["$scope",
        "accountService",
        "zeusAuthService",
        "$state",
        "$rootScope",
        "$log",
        "serverRouteMap",
        "responseDispatcherService",
        "configurationService",
        '$ionicModal',
        '$ionicPopup',
        'processInstanceService',
        '$ionicLoading',
        function ($scope, accountService, zeusAuthService, $state, $rootScope, $log, serverRouteMap, responseDispatcherService, configurationService, $ionicModal, $ionicPopup, processInstanceService, $ionicLoading) {

            //#region Model
            $scope.model = {
                username: '',
                password: '',
                loginErrorMessage: null,
                isBusy: false,
                isLoginReady: false,
            }

            //#endregion

            $ionicModal.fromTemplateUrl('app/templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.loginModal = modal;
            });

            $scope.closeLogin = function () {
                $scope.loginModal.hide();
            };

            //#region Behaviors

            //Funzione che esegue il login
            $scope.login = function () {

                if (!$scope.model.username || !$scope.model.password) {
                    $ionicPopup.alert({
                        title: 'Attenzione',
                        template: 'Inserire Username e Password'
                    });
                    return;
                }

                //Attivo il busy indicator
                $ionicLoading.show();

                setTimeout(function () {
                    $ionicLoading.hide();
                }, 10000)

                //Eseguo la richiesta di login
                var promise = zeusAuthService.login($scope.model.username, $scope.model.password, serverRouteMap.routeMap.zeus.login);

                //Valuto la risposta
                promise.then(function (response) {

                    configurationService.enableZeusWatchs();

                    //Richiedo il profilo utente al server
                    var profileRequest = accountService.getProfile();

                    //Valuto la risposta
                    profileRequest.then(function (response) {

                        //Imposto il profilo utente
                        accountService.setProfile();
                        $scope.closeLogin();

                    }, function (error) {
                        $ionicPopup.alert({
                            title: 'Errore durante il recupero del profilo',
                          });
                        //Loggo eventuali errori
                        $log.error(error.data);
                    }).finally(function () {
                        $ionicLoading.hide();
                    });

                }, function (error) {
                    $scope.model.isBusy = false;
                    if (!error) return;

                    //Valuto un eventuale messaggio di errore di login.
                    //var status = JSON.parse(error.data.error_description).loginStatus;
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Username o password invalidi',
                      });
                    //zeusAuthService.generateStatusErrorMessage(status, toastr, false);
                });
            }

            //Funzione che esegue il reset della password
            $scope.resetPassword = function () {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Reset password',
                    template: 'Una nuova password sarà inviata al tuo indirizzo di posta elettronica. Sei sicuro?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        // //Attivo il busy indicator
                        // $scope.model.isBusy = true;

                        // //Eseguo la richiesta di login
                        // var promise = zeusAuthService.resetPassword($scope.model.username, serverRouteMap.routeMap.zeus.resetPassword);

                        // //Valuto la risposta
                        // promise.then(function (response) {

                        //     $scope.showloginForm();
                        //     $scope.model.password = "";
                        //     $ionicPopup.alert({
                        //         title: 'Attenzione',
                        //         template: "Operazione riuscita. La nuova password è stata inviata nella casella di posta dell'account: " + $scope.model.username
                        //     });
                        // }, function (error) {
                        //     //Valuto un eventuale messaggio di errore di login.
                        //     responseDispatcherService.printErrorMessages(error.data, toastr);
                        // }).finally(function () {
                        //     $scope.model.isBusy = false;
                        // });
                        console.log('seisicuro');
                    } else {
                        console.log('You are not sure');
                    }
                });
            };



            //#endregion

            var constructor = function () {
            }

            constructor();

            $scope.$on("$destroy", function () {
            });
        }])