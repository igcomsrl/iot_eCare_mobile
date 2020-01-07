metiMobile.controller("AndamentoCtrl",
    ['$scope',
        'geolocationService',
        'processInstanceService',
        '$ionicLoading',
        'inviteFriendService',
        '$log',
        '$rootScope',
        function ($scope, geolocationService, processInstanceService, $ionicLoading, inviteFriendService, $log, $rootScope) {

            //#region Model
            $scope.showRefresh = false;
            $scope.inviteFriendModel = null;
            //#endregion

            //#region Behaviors
            //#endregion

            var constructor = function () {

                $ionicLoading.show();
                
                $scope.processInstanceModel = processInstanceService.processInstanceModel;

                if(!$scope.processInstanceModel){
                    $ionicLoading.hide();
                    $scope.showRefresh = true;
                    return;
                }
                    
                var request = {
                    "processInstanceId": $scope.processInstanceModel.id
                }

                if ($rootScope.isInvited) {
                    inviteFriendService.getByProcessInstance(request).then(function (success) {
                        $scope.inviteFriendModel = success.data

                        if(!$scope.inviteFriendModel){
                            $log.error("Non sono riuscito a caricare il profilo dell'utente invitato")
                            return;
                        }

                        $scope.getPatientDashboardUrl = geolocationService.getPatientDashboardUrlFiltered($scope.processInstanceModel.id,
                            $scope.inviteFriendModel.showPeso,
                            $scope.inviteFriendModel.showTemperatura, 
                            $scope.inviteFriendModel.showGlicemia, 
                            $scope.inviteFriendModel.showFrequenza, 
                            $scope.inviteFriendModel.showPressione, 
                            $scope.inviteFriendModel.showOssigeno,
                            $scope.inviteFriendModel.showMovement);

                    }, function (error) {
                        $log.error(JSON.stringify(error));
                    }).finally(function () {
                        $ionicLoading.hide();
                        $scope.showRefresh = true;
                    });
                }
                else {
                    $scope.getPatientDashboardUrl = geolocationService.getPatientDashboardUrl($scope.processInstanceModel.id);
                    $ionicLoading.hide();
                    $scope.showRefresh = true;
                }
            }

            $rootScope.$on('processInstanceModel-updated', function(){
                constructor();
            });

            $scope.reloadDashboard = function () {
                document.getElementById('iframeDashboard').src += '';
            }

            window.hide = function () {
                $ionicLoading.hide();
                $scope.showRefresh = true;
            }

            constructor();

            $scope.$on("$destroy", function () {
            });
        }])