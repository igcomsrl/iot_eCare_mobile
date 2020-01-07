metiMobile.controller("InviteFriendCtrl",
    ["$scope",
        '$window',
        'responseDispatcherService',
        '$ionicLoading',
        '$ionicPopup',
        'processInstanceService',
        'inviteFriendService',
        '$log',
        function ($scope, $window, responseDispatcherService, $ionicLoading, $ionicPopup, processInstanceService, inviteFriendService, $log) {

            //#region Model
            $scope.model = {
                email: '',
                firstname: '',
                surname: '',
                showPeso: true,
                showGlicemia: true,
                showFrequenza: true,
                showPressione: true,
                showTemperatura: true,
                showOssigeno: true,
                showCamera: true,
                lastInvites: [],
                lastInvitesKey: 'lastInvitesKey',
                inviteFriendList: [],
                isFetchBusy: false
            }

            //#endregion

            //#region Behaviors
            // $scope.setInviteFriend = function (item) {
            //     if (!item) return;

            //     //Recupero gli inviti già effettuati
            //     var inviteFriends = $window.localStorage[$scope.model.lastInvitesKey];

            //     //Se esiste, trasformo la stringa in oggetto
            //     if (inviteFriends)
            //         inviteFriends = parse.JSON(inviteFriends);

            //     //Aggiungo il nuovo invito
            //     inviteFriends.push(item);

            //     //Trasformo in oggetto e salvo gli inviti
            //     $window.localStorage[$scope.model.lastInvitesKey] = JSON.stringify(inviteFriends);
            // }

            // $scope.getInviteFriends = function () {
            //     var lastInvites = $window.localStorage[$scope.model.lastInvitesKey] || '';

            //     if (lastInvites)
            //         lastInvites = parse.JSON(lastInvites)

            //     return lastInvites;
            // }

            $scope.doInvitedFriendRefresh = function () {
                $scope.fetch();
                $scope.$apply();
            };

            $scope.create = function () {
                if (!$scope.model.email || !$scope.model.firstname || !$scope.model.surname) {
                    $ionicPopup.alert({
                        title: 'Attenzione',
                        template: 'Inserire Email, nome e cognome per poter invitare'
                    });
                    return;
                }

                //Attivo il busy indicator
                $ionicLoading.show();

                //Compongo la richiesta
                var request = {
                    'email': $scope.model.email,
                    'firstname': $scope.model.firstname,
                    'surname': $scope.model.surname,
                    'showPeso': $scope.model.showPeso,
                    'showGlicemia': $scope.model.showGlicemia,
                    'showFrequenza': $scope.model.showFrequenza,
                    'showPressione': $scope.model.showPressione,
                    'showTemperatura': $scope.model.showTemperatura,
                    'showOssigeno': $scope.model.showOssigeno,
                    'showCamera': $scope.model.showCamera,
                    'processInstanceId': processInstanceService.processInstanceModel.id
                }

                //Eseguo la richiesta
                var promise = inviteFriendService.create(request);

                //Valuto la risposta
                promise.then(function (response) {
                    $ionicPopup.alert({
                        title: 'Invito inviato!',
                        template: "L'utenza " + request.firstname + " " + request.surname + " riceverà un'email di attivazione al più presto!"
                    });
                    $scope.fetch();
                }, function (error) {
                    var errorMessages = responseDispatcherService.getErrorMessagesHtml(error.data.data);
                    $ionicPopup.alert({
                        title: "Errore durante la richiesta.",
                        template: errorMessages
                    });
                    //Loggo eventuali errori
                    $log.error(error.data);
                }).finally(function () {
                    $ionicLoading.hide();
                });

            }

            $scope.update = function (item) {
                if (!item.email || !item.firstname || !item.surname) {
                    $ionicPopup.alert({
                        title: 'Attenzione',
                        template: 'Inserire Email, nome e cognome per poter invitare'
                    });
                    return;
                }

                // //Attivo il busy indicator
                // $ionicLoading.show();

                //Compongo la richiesta
                var request = {
                    'id': item.id,
                    'email': item.email,
                    'firstname': item.firstname,
                    'surname': item.surname,
                    'showPeso': item.showPeso,
                    'showGlicemia': item.showGlicemia,
                    'showFrequenza': item.showFrequenza,
                    'showPressione': item.showPressione,
                    'showTemperatura': item.showTemperatura,
                    'showOssigeno': $scope.model.showOssigeno,
                    'showCamera': $scope.model.showCamera,
                    'processInstanceId': processInstanceService.processInstanceModel.id
                }

                //Eseguo la richiesta
                var promise = inviteFriendService.update(request);

                //Valuto la risposta
                promise.then(function (response) {
                    // $ionicPopup.alert({
                    //     title: 'Invito inviato!',
                    //     template: "L'utenza " + request.firstname + " " + request.surname + " riceverà un'email di attivazione al più presto!"
                    // });
                }, function (error) {
                    var errorMessages = responseDispatcherService.getErrorMessagesHtml(error.data.data);
                    $ionicPopup.alert({
                        title: "Errore durante la richiesta.",
                        template: errorMessages
                    });
                    //Loggo eventuali errori
                    $log.error(error.data);
                }).finally(function () {
                    //$ionicLoading.hide();
                });

            }

            $scope.fetch = function () {

                $scope.isFetchBusy = true;
            
                //Compongo la richiesta
                var request = {
                    'processInstanceId': processInstanceService.processInstanceModel.id                    
                }

                //Eseguo la richiesta
                var promise = inviteFriendService.fetch(request);

                //Valuto la risposta
                promise.then(function (response) {
                    $scope.inviteFriendList = response.data.data;
                }, function (error) {                    
                    //Loggo eventuali errori
                    $log.error(error.data);
                }).finally(function () {
                    $scope.isFetchBusy = false;
                    $scope.$broadcast('scroll.refreshComplete');
                });

            }
            //#endregion

            var constructor = function () {
                $scope.fetch();
            }

            $scope.$on('$ionicView.enter', function () {

                constructor();
            });


            $scope.$on("$destroy", function () {
            });
        }])